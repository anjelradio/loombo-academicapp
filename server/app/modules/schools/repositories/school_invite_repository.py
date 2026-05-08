from uuid import UUID

from sqlmodel import Session, select

from app.modules.schools.models import InviteRole, SchoolInvite


class SchoolInviteRepository:
    def __init__(self, db: Session):
        self.db = db

    # Busca un codigo de invitacion activo para evitar colisiones al crear.
    def get_active_by_code(self, code: str) -> SchoolInvite | None:
        query = select(SchoolInvite).where(
            SchoolInvite.code == code,
            SchoolInvite.state == True,
        )
        return self.db.exec(query).first()

    # Busca una invitacion activa por escuela y rol.
    def get_active_by_school_and_role(
        self, school_id: UUID, role: InviteRole
    ) -> SchoolInvite | None:
        query = select(SchoolInvite).where(
            SchoolInvite.school_id == school_id,
            SchoolInvite.role == role,
            SchoolInvite.state == True,
        )
        return self.db.exec(query).first()

    # Lista las invitaciones activas de una escuela.
    def list_active_by_school(self, school_id: UUID) -> list[SchoolInvite]:
        query = select(SchoolInvite).where(
            SchoolInvite.school_id == school_id,
            SchoolInvite.state == True,
        )
        return self.db.exec(query).all()

    # Busca una invitacion activa por su identificador.
    def get_active_by_id(self, invite_id: UUID) -> SchoolInvite | None:
        query = select(SchoolInvite).where(
            SchoolInvite.id == invite_id,
            SchoolInvite.state == True,
        )
        return self.db.exec(query).first()

    # Persiste una nueva invitacion en la sesion actual.
    def create(self, invite: SchoolInvite) -> SchoolInvite:
        self.db.add(invite)
        return invite

    # Persiste cambios sobre una invitacion existente.
    def update(self, invite: SchoolInvite) -> SchoolInvite:
        self.db.add(invite)
        return invite

    # Desactiva una invitacion (borrado logico).
    def delete(self, invite: SchoolInvite) -> SchoolInvite:
        invite.state = False
        self.db.add(invite)
        return invite
