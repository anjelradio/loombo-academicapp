from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.db import init_db
from app.modules.auth.router import router as auth_router
from app.modules.schools.router import router as school_router
from app.modules.users.router import router as users_router

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    if settings.ENVIRONMENT == "DEV":
        init_db()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    lifespan=lifespan,
    swagger_ui_parameters={
        "persistAuthorization": True,
    },
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router, prefix="/api")

app.include_router(school_router, prefix="/api")

app.include_router(users_router, prefix="/api")
