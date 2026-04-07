from fastapi import APIRouter, Response, status

from app.dependencies.auth import CurrentUser, DBSession
from app.modules.users.repository import UserRepository
from app.modules.users.schema import (
    UpdateEmailRequest,
    UpdatePasswordRequest,
    RequestEmailOtpResponse,
    UserProfileUpdate,
    UserRead,
    VerifyEmailOtpRequest,
    VerifyEmailOtpResponse,
)
from app.modules.users.service import UserService

router = APIRouter(prefix="/users", tags=["Usuarios"])


@router.patch("/me/profile", response_model=UserRead)
def update_profile(db: DBSession, payload: UserProfileUpdate, user: CurrentUser):
    service = UserService(UserRepository(db))
    return service.update_profile(user.id, payload)


@router.post("/me/email/request-otp", response_model=RequestEmailOtpResponse)
async def request_email_otp(db: DBSession, user: CurrentUser):
    service = UserService(UserRepository(db))
    return await service.request_email_change_otp(user.id)


@router.post("/me/email/verify-otp", response_model=VerifyEmailOtpResponse)
def verify_email_otp(db: DBSession, payload: VerifyEmailOtpRequest, user: CurrentUser):
    service = UserService(UserRepository(db))
    return service.verify_email_change_otp(user.id, payload)


@router.patch("/me/email", response_model=UserRead)
def update_email(db: DBSession, payload: UpdateEmailRequest, user: CurrentUser):
    service = UserService(UserRepository(db))
    return service.update_email(user.id, payload)


@router.patch("/me/password", status_code=status.HTTP_204_NO_CONTENT)
def update_password(db: DBSession, payload: UpdatePasswordRequest, user: CurrentUser):
    service = UserService(UserRepository(db))
    service.update_password(user.id, payload)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
