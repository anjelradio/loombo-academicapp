from fastapi import HTTPException

from app.core.security import create_access_token, verify_password
from app.dependencies.auth import DBSession
from app.modules.users.repository import UserRepository


class LoginService:
    def __init__(self, db: DBSession):
        self.repo = UserRepository(db)

    def login(self, email: str, password: str):
        user = self.repo.get_by_email(email)
        if not user:
            raise HTTPException(status_code=401, detail="Credenciales Invalidas")

        if not verify_password(password[:72], user.hashed_password):
            raise HTTPException(status_code=401, detail="Contrasena Incorrecta")

        token = create_access_token({"sub": str(user.id)})
        return token, user
