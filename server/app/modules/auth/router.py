from fastapi import APIRouter, Depends, status
from fastapi.security import OAuth2PasswordRequestForm

from app.dependencies.auth import DBSession
from app.modules.auth.schema import LoginRequest, LoginResponse
from app.modules.auth.service import AuthService
from app.modules.users.repository import UserRepository
from app.modules.users.schema import UserCreate

router = APIRouter(prefix="/auth", tags=["Autenticacion"])


@router.post(
    "/register", response_model=LoginResponse, status_code=status.HTTP_201_CREATED
)
def register(db: DBSession, payload: UserCreate):
    service = AuthService(UserRepository(db))
    token, user = service.register_with_token(payload)

    return {"user": user, "access_token": token}


@router.post("/login", response_model=LoginResponse)
def login(db: DBSession, payload: LoginRequest):
    service = AuthService(UserRepository(db))
    token, user = service.login(payload.email, payload.password)

    return {"user": user, "access_token": token}


@router.post("/token", response_model=LoginResponse)
def login(db: DBSession, form: OAuth2PasswordRequestForm = Depends()):
    email = form.username
    password = form.password
    service = AuthService(UserRepository(db))
    token, user = service.login(email, password)

    return {"user": user, "access_token": token}
