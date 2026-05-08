import uuid

from sqlmodel import SQLModel


class UserRead(SQLModel):
    id: uuid.UUID
    first_name: str
    last_name: str
    email: str
    is_super_admin: bool
    model_config = {"from_attributes": True}
