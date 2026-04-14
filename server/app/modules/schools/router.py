from uuid import UUID

from fastapi import APIRouter, Response, status

from app.dependencies.auth import CurrentUser, DBSession
from app.modules.schools.schemas import (
    SchoolCreate,
    SchoolInviteCreate,
    SchoolInviteRead,
    SchoolJoinByCode,
    SchoolMemberRead,
    SchoolRead,
    SchoolUsersFilterRole,
    SchoolWithRole,
)
from app.modules.schools.services import SchoolInviteService, SchoolService

router = APIRouter(prefix="/school", tags=["Escuela"])


@router.get("/", response_model=list[SchoolRead])
def list_schools(db: DBSession):
    return SchoolService(db).list()


@router.post("/", response_model=SchoolRead)
def create_school(db: DBSession, payload: SchoolCreate, user: CurrentUser):
    return SchoolService(db).create(payload, user.id)


@router.get("/by_user", response_model=list[SchoolWithRole])
def list_school_by_user(db: DBSession, user: CurrentUser):
    return SchoolService(db).list_by_user(user.id)


@router.get("/{school_id}/users", response_model=list[SchoolMemberRead])
def list_users_by_school(
    school_id: UUID,
    db: DBSession,
    user: CurrentUser,
    role: SchoolUsersFilterRole | None = None,
):
    return SchoolService(db).list_users_by_school(school_id, user.id, role)


@router.delete("/{school_id}/users/{target_user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user_from_school(
    school_id: UUID, target_user_id: UUID, db: DBSession, user: CurrentUser
):
    SchoolService(db).delete_user_from_school(school_id, user.id, target_user_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.patch("/{school_id}/users/{target_user_id}/role", response_model=SchoolMemberRead)
def toggle_user_role_in_school(
    school_id: UUID, target_user_id: UUID, db: DBSession, user: CurrentUser
):
    return SchoolService(db).toggle_user_role_in_school(school_id, user.id, target_user_id)


@router.post("/{school_id}/invite", response_model=SchoolInviteRead)
def create_school_invite(
    school_id: UUID, db: DBSession, payload: SchoolInviteCreate, user: CurrentUser
):
    return SchoolInviteService(db).create(school_id, payload, user.id)


@router.get("/{school_id}/invite", response_model=list[SchoolInviteRead])
def list_school_invites(school_id: UUID, db: DBSession, user: CurrentUser):
    return SchoolInviteService(db).list_by_school(school_id, user.id)


@router.delete("/{school_id}/invite/{invite_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_school_invite(
    school_id: UUID, invite_id: UUID, db: DBSession, user: CurrentUser
):
    SchoolInviteService(db).delete(school_id, invite_id, user.id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/join", response_model=SchoolWithRole)
def join_school_with_code(db: DBSession, payload: SchoolJoinByCode, user: CurrentUser):
    return SchoolInviteService(db).join_by_code(payload, user.id)
