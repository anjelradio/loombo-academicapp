from pydantic import EmailStr
from sqlmodel import SQLModel


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
