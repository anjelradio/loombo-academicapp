from uuid import UUID

from sqlmodel import Session, func, select

from app.modules.academic.models import Subject


class SubjectRepository:
    def __init__(self, db: Session):
        self.db = db

    # Cuenta materias activas de una escuela con filtro opcional por nombre.
    def count_active_by_school(self, school_id: UUID, search: str | None = None) -> int:
        query = (
            select(func.count())
            .select_from(Subject)
            .where(Subject.school_id == school_id, Subject.state == True)
        )
        if search:
            query = query.where(func.lower(Subject.name).contains(search.lower()))
        return self.db.exec(query).one()

    # Lista materias activas por escuela de forma paginada.
    def list_paginated_by_school(
        self,
        school_id: UUID,
        search: str | None = None,
        *,
        per_page: int,
        page: int,
    ) -> list[Subject]:
        query = select(Subject).where(Subject.school_id == school_id, Subject.state == True)
        if search:
            query = query.where(func.lower(Subject.name).contains(search.lower()))
        query = query.order_by(Subject.created_date.desc())

        offset = (page - 1) * per_page
        query = query.offset(offset).limit(per_page)

        return self.db.exec(query).all()

    # Lista todas las materias activas de una escuela ordenadas por nombre.
    def list_active_by_school(self, school_id: UUID) -> list[Subject]:
        query = (
            select(Subject)
            .where(Subject.school_id == school_id, Subject.state == True)
            .order_by(Subject.name.asc())
        )
        return self.db.exec(query).all()

    # Lista materias activas por IDs dentro de una escuela.
    def list_active_by_ids_in_school(
        self, school_id: UUID, subject_ids: list[UUID]
    ) -> list[Subject]:
        query = select(Subject).where(
            Subject.school_id == school_id,
            Subject.id.in_(subject_ids),
            Subject.state == True,
        )
        return self.db.exec(query).all()

    # Busca una materia activa por nombre normalizado dentro de una escuela.
    def get_by_name_in_school(self, school_id: UUID, name: str) -> Subject | None:
        query = select(Subject).where(
            Subject.school_id == school_id,
            func.lower(func.trim(Subject.name)) == name.lower(),
            Subject.state == True,
        )
        return self.db.exec(query).first()

    # Persiste una nueva materia en la sesion actual.
    def create(self, subject: Subject) -> Subject:
        self.db.add(subject)
        return subject

    # Busca una materia activa por ID dentro de una escuela.
    def get_active_by_id_in_school(self, school_id: UUID, subject_id: UUID) -> Subject | None:
        query = select(Subject).where(
            Subject.id == subject_id,
            Subject.school_id == school_id,
            Subject.state == True,
        )
        return self.db.exec(query).first()

    # Persiste cambios sobre una materia existente.
    def update(self, subject: Subject) -> Subject:
        self.db.add(subject)
        return subject

    # Desactiva una materia (borrado logico).
    def delete(self, subject: Subject) -> Subject:
        subject.state = False
        self.db.add(subject)
        return subject
