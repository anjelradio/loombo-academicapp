from fastapi import HTTPException

from app.core.security import create_access_token, hash_password
from app.core.validators import validate_password_policy
from app.dependencies.auth import DBSession
from app.modules.auth.schemas import RegisterRequest
from app.modules.users.model import User
from app.modules.users.repository import UserRepository


class RegisterService:
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
