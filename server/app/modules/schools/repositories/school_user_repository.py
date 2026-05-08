from uuid import UUID

from sqlalchemy import or_
from sqlmodel import Session, func, select

from app.modules.auth.models import User
from app.modules.schools.models import SchoolRole, SchoolUser


class SchoolUserRepository:
    def __init__(self, db: Session):
        self.db = db

    # Lista todas las afiliaciones activas de un usuario.
    def list_by_user(self, user_id: UUID) -> list[SchoolUser]:
        query = select(SchoolUser).where(
            SchoolUser.user_id == user_id, SchoolUser.state == True
        )
        return self.db.exec(query).all()

    # Lista todas las afiliaciones activas de una escuela.
    def list_by_school(self, school_id: UUID) -> list[SchoolUser]:
        query = select(SchoolUser).where(
            SchoolUser.school_id == school_id, SchoolUser.state == True
        )
        return self.db.exec(query).all()

    # Busca la afiliacion activa de un usuario dentro de una escuela.
    def get_by_user_and_school(self, user_id: UUID, school_id: UUID) -> SchoolUser | None:
        query = select(SchoolUser).where(
            SchoolUser.user_id == user_id,
            SchoolUser.school_id == school_id,
            SchoolUser.state == True,
        )
        return self.db.exec(query).first()

    # Busca si un usuario ya tiene un rol activo en la escuela.
    def get_by_user_school_and_role(
        self, user_id: UUID, school_id: UUID, role: SchoolRole
    ) -> SchoolUser | None:
        query = select(SchoolUser).where(
            SchoolUser.user_id == user_id,
            SchoolUser.school_id == school_id,
            SchoolUser.role == role,
            SchoolUser.state == True,
        )
        return self.db.exec(query).first()

    # Lista afiliaciones activas no-owner de un usuario en una escuela.
    def list_non_owner_by_user_and_school(
        self, user_id: UUID, school_id: UUID
    ) -> list[SchoolUser]:
        query = select(SchoolUser).where(
            SchoolUser.user_id == user_id,
            SchoolUser.school_id == school_id,
            SchoolUser.role != SchoolRole.OWNER,
            SchoolUser.state == True,
        )
        return self.db.exec(query).all()

    # Lista afiliaciones activas administrables (admin/teacher) de un usuario.
    def list_manageable_roles_by_user_and_school(
        self, user_id: UUID, school_id: UUID
    ) -> list[SchoolUser]:
        query = select(SchoolUser).where(
            SchoolUser.user_id == user_id,
            SchoolUser.school_id == school_id,
            SchoolUser.role.in_([SchoolRole.ADMIN, SchoolRole.TEACHER]),
            SchoolUser.state == True,
        )
        return self.db.exec(query).all()

    # Lista usuarios activos con su rol y fecha de ingreso en la escuela.
    def list_users_by_school_and_role(
        self, school_id: UUID, role: SchoolRole | None = None
    ):
        query = select(User, SchoolUser.role, SchoolUser.created_date).join(
            SchoolUser, User.id == SchoolUser.user_id
        ).where(
            SchoolUser.school_id == school_id,
            SchoolUser.state == True,
            User.state == True,
        )

        if role:
            query = query.where(SchoolUser.role == role)

        return self.db.exec(query).all()

    # Cuenta usuarios activos de una escuela con filtros opcionales.
    def count_users_by_school_and_role(
        self,
        school_id: UUID,
        role: SchoolRole | None = None,
        name: str | None = None,
    ) -> int:
        query = select(func.count()).select_from(SchoolUser).join(
            User, User.id == SchoolUser.user_id
        ).where(
            SchoolUser.school_id == school_id,
            SchoolUser.state == True,
            User.state == True,
        )

        if role:
            query = query.where(SchoolUser.role == role)

        if name:
            query_text = f"%{name.lower()}%"
            query = query.where(
                or_(
                    func.lower(User.first_name).like(query_text),
                    func.lower(User.last_name).like(query_text),
                    func.lower(func.concat(User.first_name, " ", User.last_name)).like(
                        query_text
                    ),
                )
            )

        return self.db.exec(query).one()

    # Lista usuarios activos por escuela de forma paginada con filtros opcionales.
    def list_users_by_school_and_role_paginated(
        self,
        school_id: UUID,
        per_page: int,
        page: int,
        role: SchoolRole | None = None,
        name: str | None = None,
    ):
        offset = (page - 1) * per_page
        query = (
            select(User, SchoolUser.role, SchoolUser.created_date)
            .join(SchoolUser, User.id == SchoolUser.user_id)
            .where(
                SchoolUser.school_id == school_id,
                SchoolUser.state == True,
                User.state == True,
            )
            .offset(offset)
            .limit(per_page)
        )

        if role:
            query = query.where(SchoolUser.role == role)

        if name:
            query_text = f"%{name.lower()}%"
            query = query.where(
                or_(
                    func.lower(User.first_name).like(query_text),
                    func.lower(User.last_name).like(query_text),
                    func.lower(func.concat(User.first_name, " ", User.last_name)).like(
                        query_text
                    ),
                )
            )

        return self.db.exec(query).all()

    # Persiste una nueva afiliacion usuario-escuela en la sesion actual.
    def create(self, school_user: SchoolUser) -> SchoolUser:
        self.db.add(school_user)
        return school_user

    # Persiste cambios sobre una afiliacion usuario-escuela existente.
    def update(self, school_user: SchoolUser) -> SchoolUser:
        self.db.add(school_user)
        return school_user

    # Desactiva una afiliacion usuario-escuela (borrado logico).
    def delete(self, school_user: SchoolUser) -> SchoolUser:
        school_user.state = False
        self.db.add(school_user)
        return school_user
