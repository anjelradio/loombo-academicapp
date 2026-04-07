from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = Field(..., env="DATABASE_URL")
    JWT_SECRET: str = Field(..., env="JWT_SECRET")
    JWT_ALG: str = Field(default="HS256", env="JWT_ALG")
    JWT_EXPIRES_MIN: int = Field(default=60 * 24, env="JWT_EXPIRES_MIN")

    BREVO_API_KEY: str = Field(..., env="BREVO_API_KEY")
    BREVO_SENDER_EMAIL: str = Field(..., env="BREVO_SENDER_EMAIL")
    BREVO_SENDER_NAME: str = Field(default="LoomBo", env="BREVO_SENDER_NAME")

    OTP_LENGTH: int = Field(default=6, env="OTP_LENGTH")
    OTP_EXPIRES_MIN: int = Field(default=5, env="OTP_EXPIRES_MIN")
    OTP_MAX_ATTEMPTS: int = Field(default=5, env="OTP_MAX_ATTEMPTS")
    OTP_RESEND_COOLDOWN_SEC: int = Field(default=60, env="OTP_RESEND_COOLDOWN_SEC")

    REDIS_URL: str = Field(..., env="REDIS_URL")

    PROJECT_NAME: str = "LoomBo - API"

    LANGUAGE_CODE: str = "es"
    TIME_ZONE: str = "America/La_Paz"

    class Config:
        env_file = ".env"


settings = Settings()
