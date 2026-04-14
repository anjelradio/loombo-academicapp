from datetime import datetime
from uuid import UUID

from sqlmodel import SQLModel

from app.modules.schools.models import SchoolRole


class SchoolMemberRead(SQLModel):
    id: UUID
    first_name: str
    last_name: str
    email: str
    role: SchoolRole
    created_date: datetime
