from fastapi import HTTPException

from app.core.security import create_access_token, hash_password, verify_password
from app.modules.users.model import User
from app.modules.users.repository import UserRepository
from app.modules.users.schema import UserCreate


def validate_password_policy(password: str) -> None:
    digit_count = sum(char.isdigit() for char in password)
    uppercase_count = sum(char.isupper() for char in password)

    has_two_digits = digit_count >= 2
    has_two_uppercase = uppercase_count >= 2

    if not has_two_digits and not has_two_uppercase:
        raise HTTPException(
            status_code=400,
            detail="La contraseña debe tener al menos 2 números y al menos 2 letras mayúsculas",
        )

    if not has_two_digits:
        raise HTTPException(
            status_code=400,
            detail="La contraseña debe tener al menos 2 números",
        )

    if not has_two_uppercase:
        raise HTTPException(
            status_code=400,
            detail="La contraseña debe tener al menos 2 letras mayúsculas",
        )


class AuthService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def _validate_password_policy(self, password: str) -> None:
        validate_password_policy(password)

    def register(self, payload: UserCreate) -> User:
        if self.repo.get_by_email(payload.email):
            raise HTTPException(status_code=400, detail="Email ya registrado")

        self._validate_password_policy(payload.password)

        user = User(
            first_name=payload.first_name,
            last_name=payload.last_name,
            email=payload.email,
            hashed_password=hash_password(payload.password),
        )

        return self.repo.create(user)

    def register_with_token(self, payload: UserCreate):
        user = self.register(payload)
        token = create_access_token({"sub": str(user.id)})
        return token, user

    def login(self, email: str, password: str):
        user = self.repo.get_by_email(email)
        if not user:
            raise HTTPException(status_code=401, detail="Credenciales Invalidas")

        if not verify_password(password[:72], user.hashed_password):
            raise HTTPException(status_code=401, detail="Contrasena Incorrecta")

        token = create_access_token({"sub": str(user.id)})
        return token, user
