from uuid import UUID

from sqlmodel import Session, select

from app.modules.schools.models import SchoolRole, SchoolUser


class SchoolUserRepository:
    def __init__(self, db: Session):
        self.db = db

    def list_by_user(self, user_id: UUID) -> list[SchoolUser]:
        query = select(SchoolUser).where(
            SchoolUser.user_id == user_id, SchoolUser.state == True
        )
        return self.db.exec(query).all()

    def list_by_school(self, school_id: UUID) -> list[SchoolUser]:
        query = select(SchoolUser).where(
            SchoolUser.school_id == school_id, SchoolUser.state == True
        )
        return self.db.exec(query).all()

    def get_by_user_and_school(self, user_id: UUID, school_id: UUID) -> SchoolUser | None:
        # Busca la afiliacion activa de un usuario dentro de una escuela.
        query = select(SchoolUser).where(
            SchoolUser.user_id == user_id,
            SchoolUser.school_id == school_id,
            SchoolUser.state == True,
        )
        return self.db.exec(query).first()

    def get_by_user_school_and_role(
        self, user_id: UUID, school_id: UUID, role: SchoolRole
    ) -> SchoolUser | None:
        # Busca si un usuario ya tiene un rol activo en la escuela.
        query = select(SchoolUser).where(
            SchoolUser.user_id == user_id,
            SchoolUser.school_id == school_id,
            SchoolUser.role == role,
            SchoolUser.state == True,
        )
        return self.db.exec(query).first()

    def create(self, school_user: SchoolUser) -> SchoolUser:
        self.db.add(school_user)
        return school_user

    def update(self, school_user: SchoolUser) -> SchoolUser:
        self.db.add(school_user)
        return school_user

    def delete(self, school_user: SchoolUser) -> SchoolUser:
        school_user.state = False
        self.db.add(school_user)
        return school_user
