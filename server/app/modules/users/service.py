from uuid import UUID

from secrets import compare_digest

from fastapi import HTTPException

from app.core.config import settings
from app.core.email import send_email
from app.core.otp import generate_otp, hash_otp
from app.core.redis import redis_client
from app.core.security import create_access_token, decode_token, hash_password, verify_password
from app.modules.auth.service import validate_password_policy
from app.modules.users.repository import UserRepository
from app.modules.users.schema import (
    UpdateEmailRequest,
    UpdatePasswordRequest,
    RequestEmailOtpResponse,
    UserProfileUpdate,
    VerifyEmailOtpRequest,
    VerifyEmailOtpResponse,
)


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def update_profile(self, user_id: UUID, payload: UserProfileUpdate):
        user = self.repo.get_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        user.first_name = payload.first_name
        user.last_name = payload.last_name

        return self.repo.update(user)

    async def request_email_change_otp(self, user_id: UUID) -> RequestEmailOtpResponse:
        user = self.repo.get_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        otp_key = f"email_change_otp:{user_id}"
        attempts_key = f"email_change_otp_attempts:{user_id}"
        cooldown_key = f"email_change_otp_cooldown:{user_id}"

        ttl = redis_client.ttl(cooldown_key)
        if ttl and ttl > 0:
            raise HTTPException(
                status_code=429,
                detail=f"Debes esperar {ttl} segundos para solicitar otro codigo",
            )

        otp = generate_otp()
        otp_hashed = hash_otp(otp)
        otp_ttl_seconds = settings.OTP_EXPIRES_MIN * 60

        html_content = (
            f"<h2>Codigo de verificacion</h2>"
            f"<p>Tu codigo OTP es: <strong>{otp}</strong></p>"
            f"<p>Este codigo expira en {settings.OTP_EXPIRES_MIN} minutos.</p>"
        )

        try:
            await send_email(
                to_email=user.email,
                subject="Codigo OTP para cambio de correo",
                html_content=html_content,
            )
        except Exception:
            raise HTTPException(
                status_code=500, detail="No se pudo enviar el codigo OTP"
            )

        redis_client.set(otp_key, otp_hashed, ex=otp_ttl_seconds)
        redis_client.set(attempts_key, "0", ex=otp_ttl_seconds)
        redis_client.set(cooldown_key, "1", ex=settings.OTP_RESEND_COOLDOWN_SEC)

        return RequestEmailOtpResponse(
            message="Se envio un codigo OTP a tu correo actual",
            expires_in_seconds=otp_ttl_seconds,
        )

    def verify_email_change_otp(
        self, user_id: UUID, payload: VerifyEmailOtpRequest
    ) -> VerifyEmailOtpResponse:
        user = self.repo.get_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        otp_key = f"email_change_otp:{user_id}"
        attempts_key = f"email_change_otp_attempts:{user_id}"
        cooldown_key = f"email_change_otp_cooldown:{user_id}"

        stored_otp_hash = redis_client.get(otp_key)
        if not stored_otp_hash:
            raise HTTPException(
                status_code=400,
                detail="El codigo OTP expiro o no fue solicitado",
            )

        attempts = int(redis_client.get(attempts_key) or "0")
        if attempts >= settings.OTP_MAX_ATTEMPTS:
            raise HTTPException(
                status_code=429,
                detail="Se alcanzo el limite de intentos para el codigo OTP",
            )

        provided_otp_hash = hash_otp(payload.otp.strip())
        if not compare_digest(stored_otp_hash, provided_otp_hash):
            attempts += 1
            remaining_ttl = redis_client.ttl(otp_key)

            if remaining_ttl and remaining_ttl > 0:
                redis_client.set(attempts_key, str(attempts), ex=remaining_ttl)
            else:
                redis_client.set(attempts_key, str(attempts))

            if attempts >= settings.OTP_MAX_ATTEMPTS:
                raise HTTPException(
                    status_code=429,
                    detail="Se alcanzo el limite de intentos para el codigo OTP",
                )

            raise HTTPException(status_code=400, detail="Codigo OTP invalido")

        redis_client.delete(otp_key, attempts_key, cooldown_key)

        token_ttl_seconds = settings.OTP_EXPIRES_MIN * 60
        email_change_token = create_access_token(
            {
                "sub": str(user_id),
                "purpose": "change_email",
            },
            minutes=settings.OTP_EXPIRES_MIN,
        )

        return VerifyEmailOtpResponse(
            message="Codigo OTP verificado correctamente",
            email_change_token=email_change_token,
            expires_in_seconds=token_ttl_seconds,
        )

    def update_email(self, user_id: UUID, payload: UpdateEmailRequest):
        user = self.repo.get_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        try:
            token_payload = decode_token(payload.email_change_token)
            token_user_id = UUID(token_payload.get("sub", ""))
            token_purpose = token_payload.get("purpose")
        except Exception:
            raise HTTPException(status_code=401, detail="Token de verificacion invalido")

        if token_purpose != "change_email" or token_user_id != user_id:
            raise HTTPException(status_code=403, detail="Token de verificacion invalido")

        new_email = str(payload.new_email).strip().lower()
        if new_email == user.email.lower():
            raise HTTPException(
                status_code=400,
                detail="El nuevo correo no puede ser igual al correo actual",
            )

        existing_user = self.repo.get_by_email(new_email)
        if existing_user and existing_user.id != user.id:
            raise HTTPException(status_code=409, detail="El correo ya esta en uso")

        user.email = new_email
        return self.repo.update(user)

    def update_password(self, user_id: UUID, payload: UpdatePasswordRequest) -> None:
        user = self.repo.get_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        if payload.new_password != payload.confirm_new_password:
            raise HTTPException(
                status_code=400,
                detail="La confirmacion de contraseña no coincide",
            )

        if not verify_password(payload.current_password[:72], user.hashed_password):
            raise HTTPException(status_code=401, detail="Contrasena actual incorrecta")

        if payload.current_password == payload.new_password:
            raise HTTPException(
                status_code=400,
                detail="La nueva contraseña debe ser diferente a la actual",
            )

        validate_password_policy(payload.new_password)

        user.hashed_password = hash_password(payload.new_password)
        self.repo.update(user)
