from uuid import UUID

from app.modules.schools.permissions import ensure_owner
from app.modules.schools.repositories import SchoolUserRepository


def ensure_owner_in_school(
    school_user_repo: SchoolUserRepository,
    user_id: UUID,
    school_id: UUID,
) -> None:
    ensure_owner(school_user_repo, user_id, school_id)
