from uuid import UUID

from fastapi import HTTPException

from app.modules.schools.models import SchoolRole
from app.modules.schools.repositories import SchoolUserRepository


def ensure_owner(school_user_repo: SchoolUserRepository, user_id: UUID, school_id: UUID) -> None:
    membership = school_user_repo.get_by_user_and_school(user_id, school_id)
    if not membership:
        raise HTTPException(status_code=403, detail="No perteneces a esta escuela")

    if membership.role != SchoolRole.OWNER:
        raise HTTPException(
            status_code=403,
            detail="Solo el owner puede gestionar este recurso",
        )
