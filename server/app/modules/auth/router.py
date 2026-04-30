from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm

from app.dependencies.auth import DBSession
from app.modules.auth.schemas import (
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RequestPasswordResetOtpRequest,
    RequestPasswordResetOtpResponse,
    VerifyPasswordResetOtpRequest,
    VerifyPasswordResetOtpResponse,
)
from app.modules.auth.services import LoginService, PasswordResetService, RegisterService

router = APIRouter(prefix="/auth", tags=["Autenticacion"])


@router.post(
    "/register", response_model=LoginResponse, status_code=status.HTTP_201_CREATED
)
def register(db: DBSession, payload: RegisterRequest):
    service = RegisterService(db)
    token, user = service.register_with_token(payload)

    return {"user": user, "access_token": token}


@router.post("/login", response_model=LoginResponse)
def login(db: DBSession, payload: LoginRequest):
    service = LoginService(db)
    token, user = service.login(payload.email, payload.password)

    return {"user": user, "access_token": token}


@router.post("/token", response_model=LoginResponse)
def login(db: DBSession, form: OAuth2PasswordRequestForm = Depends()):
    email = form.username
    password = form.password
    service = LoginService(db)
    token, user = service.login(email, password)

    return {"user": user, "access_token": token}


@router.post("/password/request-otp", response_model=RequestPasswordResetOtpResponse)
async def request_password_reset_otp(
    db: DBSession, payload: RequestPasswordResetOtpRequest
):
    service = PasswordResetService(db)
    return await service.request_password_reset_otp(payload)


@router.post("/password/verify-otp", response_model=VerifyPasswordResetOtpResponse)
async def verify_password_reset_otp(
    db: DBSession, payload: VerifyPasswordResetOtpRequest
):
    service = PasswordResetService(db)
    return await service.verify_password_reset_otp(payload)
