from pydantic import EmailStr
from sqlmodel import SQLModel

from app.modules.auth.schemas.shared import UserRead


class LoginRequest(SQLModel):
    email: EmailStr
    password: str


class LoginResponse(SQLModel):
    user: UserRead
    access_token: str
