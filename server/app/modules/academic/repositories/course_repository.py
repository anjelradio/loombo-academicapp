from uuid import UUID

from sqlmodel import Session, func, select

from app.modules.academic.models import Course, CourseSubject, Subject
from app.modules.schools.models import Level, SchoolLevel


class CourseRepository:
    def __init__(self, db: Session):
        self.db = db

    # Persiste un nuevo curso en la sesion actual.
    def create(self, course: Course) -> Course:
        self.db.add(course)
        return course

    # Persiste cambios sobre un curso existente.
    def update(self, course: Course) -> Course:
        self.db.add(course)
        return course

    # Desactiva un curso (borrado logico).
    def delete(self, course: Course) -> Course:
        course.state = False
        self.db.add(course)
        return course

    # Busca un curso activo por ID dentro de una escuela.
    def get_active_by_id_in_school(self, school_id: UUID, course_id: UUID) -> Course | None:
        query = select(Course).where(
            Course.id == course_id,
            Course.school_id == school_id,
            Course.state == True,
        )
        return self.db.exec(query).first()

    # Busca un curso activo por nombre y nivel dentro de una escuela.
    def get_by_name_and_level_in_school(
        self, school_id: UUID, school_level_id: UUID, name: str
    ) -> Course | None:
        query = select(Course).where(
            Course.school_id == school_id,
            Course.school_level_id == school_level_id,
            func.lower(func.trim(Course.name)) == name.lower(),
            Course.state == True,
        )
        return self.db.exec(query).first()

    # Cuenta cursos activos de una escuela con filtro opcional por nombre.
    def count_active_by_school(self, school_id: UUID, search: str | None = None) -> int:
        query = (
            select(func.count())
            .select_from(Course)
            .where(Course.school_id == school_id, Course.state == True)
        )
        if search:
            query = query.where(func.lower(Course.name).contains(search.lower()))
        return self.db.exec(query).one()

    # Lista cursos activos por escuela de forma paginada junto al nombre del nivel.
    def list_paginated_by_school(
        self,
        school_id: UUID,
        search: str | None = None,
        *,
        per_page: int,
        page: int,
    ):
        query = (
            select(Course, Level.name)
            .join(SchoolLevel, SchoolLevel.id == Course.school_level_id)
            .join(Level, Level.id == SchoolLevel.level_id)
            .where(
                Course.school_id == school_id,
                Course.state == True,
                SchoolLevel.state == True,
                Level.state == True,
            )
        )

        if search:
            query = query.where(func.lower(Course.name).contains(search.lower()))

        query = query.order_by(Course.created_date.desc())

        offset = (page - 1) * per_page
        query = query.offset(offset).limit(per_page)
        return self.db.exec(query).all()


class CourseSubjectRepository:
    def __init__(self, db: Session):
        self.db = db

    # Reemplaza materias activas asociadas a un curso por un nuevo conjunto de materias.
    def replace_for_course(self, course_id: UUID, subject_ids: list[UUID]) -> None:
        current_active_query = select(CourseSubject).where(
            CourseSubject.course_id == course_id,
            CourseSubject.state == True,
        )
        current_active = self.db.exec(current_active_query).all()

        for row in current_active:
            row.state = False
            self.db.add(row)

        for subject_id in subject_ids:
            self.db.add(CourseSubject(course_id=course_id, subject_id=subject_id))

    # Lista IDs de materias activas asociadas a un curso.
    def list_active_subject_ids_by_course(self, course_id: UUID) -> list[UUID]:
        query = select(CourseSubject.subject_id).where(
            CourseSubject.course_id == course_id,
            CourseSubject.state == True,
        )
        return self.db.exec(query).all()

    # Lista nombres de materias activas asociadas a un curso.
    def list_active_subject_names_by_course(self, course_id: UUID) -> list[str]:
        query = (
            select(Subject.name)
            .join(CourseSubject, CourseSubject.subject_id == Subject.id)
            .where(
                CourseSubject.course_id == course_id,
                CourseSubject.state == True,
                Subject.state == True,
            )
            .order_by(Subject.name.asc())
        )
        return self.db.exec(query).all()
