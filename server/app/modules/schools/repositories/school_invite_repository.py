from uuid import UUID

from sqlmodel import Session, select

from app.modules.schools.models import InviteRole, SchoolInvite


class SchoolInviteRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_active_by_code(self, code: str) -> SchoolInvite | None:
        # Busca un codigo activo para evitar colisiones al crear.
        query = select(SchoolInvite).where(
            SchoolInvite.code == code,
            SchoolInvite.state == True,
        )
        return self.db.exec(query).first()

    def get_active_by_school_and_role(
        self, school_id: UUID, role: InviteRole
    ) -> SchoolInvite | None:
        # Busca la invitacion activa por escuela y rol.
        query = select(SchoolInvite).where(
            SchoolInvite.school_id == school_id,
            SchoolInvite.role == role,
            SchoolInvite.state == True,
        )
        return self.db.exec(query).first()

    def list_active_by_school(self, school_id: UUID) -> list[SchoolInvite]:
        # Lista las invitaciones activas de una escuela.
        query = select(SchoolInvite).where(
            SchoolInvite.school_id == school_id,
            SchoolInvite.state == True,
        )
        return self.db.exec(query).all()

    def get_active_by_id(self, invite_id: UUID) -> SchoolInvite | None:
        # Busca una invitacion activa por su identificador.
        query = select(SchoolInvite).where(
            SchoolInvite.id == invite_id,
            SchoolInvite.state == True,
        )
        return self.db.exec(query).first()

    def create(self, invite: SchoolInvite) -> SchoolInvite:
        self.db.add(invite)
        return invite

    def update(self, invite: SchoolInvite) -> SchoolInvite:
        self.db.add(invite)
        return invite

    def delete(self, invite: SchoolInvite) -> SchoolInvite:
        invite.state = False
        self.db.add(invite)
        return invite
