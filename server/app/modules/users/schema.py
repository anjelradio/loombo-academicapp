import uuid
from typing import Annotated, Optional

from pydantic import EmailStr, StringConstraints, field_validator
from sqlmodel import SQLModel


class UserCreate(SQLModel):
    first_name: str
    last_name: str
    email: str
    password: str
    super_admin: Optional[bool] = False


class UserRead(SQLModel):
    id: uuid.UUID
    first_name: str
    last_name: str
    email: str
    is_super_admin: bool
    model_config = {"from_attributes": True}


class UserProfileUpdate(SQLModel):
    first_name: Annotated[str, StringConstraints(min_length=2, max_length=50)]
    last_name: Annotated[str, StringConstraints(min_length=2, max_length=70)]

    @field_validator("first_name", "last_name")
    @classmethod
    def normalize_name(cls, value: str) -> str:
        normalized = " ".join(value.split())
        if len(normalized) < 2:
            raise ValueError("El campo debe tener al menos 2 caracteres")
        return normalized


class RequestEmailOtpResponse(SQLModel):
    message: str
    expires_in_seconds: int


class VerifyEmailOtpRequest(SQLModel):
    otp: str


class VerifyEmailOtpResponse(SQLModel):
    message: str
    email_change_token: str
    expires_in_seconds: int


class UpdateEmailRequest(SQLModel):
    new_email: EmailStr
    email_change_token: str


class UpdatePasswordRequest(SQLModel):
    current_password: Annotated[str, StringConstraints(min_length=1)]
    new_password: Annotated[str, StringConstraints(min_length=1)]
    confirm_new_password: Annotated[str, StringConstraints(min_length=1)]

    @field_validator("current_password", "new_password", "confirm_new_password")
    @classmethod
    def validate_password_required(cls, value: str) -> str:
        normalized = value.strip()
        if not normalized:
            raise ValueError("La contraseña es requerida")
        return value
