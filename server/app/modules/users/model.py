from sqlmodel import Field

from app.core.base_model import UUIDBaseModel


class User(UUIDBaseModel, table=True):
    first_name: str
    last_name: str
    email: str = Field(index=True, unique=True)
    hashed_password: str
    is_super_admin: bool = Field(default=False)
