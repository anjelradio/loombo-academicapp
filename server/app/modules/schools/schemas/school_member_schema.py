from datetime import datetime
from typing import List
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


class PaginatedSchoolMember(SQLModel):
    users: List[SchoolMemberRead]
    page: int
    per_page: int
    total_pages: int
    has_prev: bool
    has_next: bool
