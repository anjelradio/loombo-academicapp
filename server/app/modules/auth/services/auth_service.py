from fastapi import HTTPException

from app.core.security import create_access_token, hash_password, verify_password
from app.core.validators import validate_password_policy
from app.dependencies.auth import DBSession
from app.modules.auth.models import User
from app.modules.auth.repositories import UserRepository
from app.modules.auth.schemas import RegisterRequest


class AuthService:
    def __init__(self, db: DBSession):
        self.repo = UserRepository(db)

    def register(self, payload: RegisterRequest) -> User:
        if self.repo.get_by_email(payload.email):
            raise HTTPException(status_code=400, detail="Email ya registrado")

        validate_password_policy(payload.password)

        user = User(
            first_name=payload.first_name,
            last_name=payload.last_name,
            email=payload.email,
            hashed_password=hash_password(payload.password),
        )

        return self.repo.create(user)

    def register_with_token(self, payload: RegisterRequest):
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
