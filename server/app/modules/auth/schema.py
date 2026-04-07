from pydantic import EmailStr
from sqlmodel import SQLModel

from app.modules.users.schema import UserRead


class LoginResponse(SQLModel):
    user: UserRead
    access_token: str


class LoginRequest(SQLModel):
    email: EmailStr
    password: str
