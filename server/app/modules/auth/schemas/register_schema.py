from typing import Optional

from pydantic import EmailStr
from sqlmodel import SQLModel


class RegisterRequest(SQLModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    super_admin: Optional[bool] = False
