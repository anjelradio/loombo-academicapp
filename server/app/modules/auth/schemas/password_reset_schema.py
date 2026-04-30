from pydantic import EmailStr
from sqlmodel import SQLModel


class RequestPasswordResetOtpRequest(SQLModel):
    email: EmailStr


class RequestPasswordResetOtpResponse(SQLModel):
    message: str
    expires_in_seconds: int


class VerifyPasswordResetOtpRequest(SQLModel):
    email: EmailStr
    otp: str


class VerifyPasswordResetOtpResponse(SQLModel):
    message: str
