from uuid import UUID

from sqlmodel import Session, select

from app.modules.academic.models import Assignment, Course, CourseSubject, Subject


class AssignmentRepository:
    def __init__(self, db: Session):
        self.db = db

    # Lista cursos activos de la escuela que tienen al menos una materia vinculada.
    def list_courses_with_subjects(self, school_id: UUID):
        query = (
            select(Course.id, Course.name)
            .join(CourseSubject, CourseSubject.course_id == Course.id)
            .join(Subject, Subject.id == CourseSubject.subject_id)
            .where(
                Course.school_id == school_id,
                Course.state == True,
                CourseSubject.state == True,
                Subject.state == True,
            )
            .distinct()
            .order_by(Course.name.asc())
        )
        return self.db.exec(query).all()

    # Lista materias activas vinculadas a un curso activo de la escuela.
    def list_subjects_by_course(self, school_id: UUID, course_id: UUID):
        query = (
            select(Subject.id, Subject.name)
            .join(CourseSubject, CourseSubject.subject_id == Subject.id)
            .join(Course, Course.id == CourseSubject.course_id)
            .where(
                Course.id == course_id,
                Course.school_id == school_id,
                Course.state == True,
                CourseSubject.state == True,
                Subject.state == True,
            )
            .order_by(Subject.name.asc())
        )
        return self.db.exec(query).all()

    # Obtiene IDs activos de course_subject para un curso y materias dadas.
    def get_course_subject_ids_by_course_and_subjects(
        self, course_id: UUID, subject_ids: list[UUID]
    ) -> list[UUID]:
        query = select(CourseSubject.id).where(
            CourseSubject.course_id == course_id,
            CourseSubject.subject_id.in_(subject_ids),
            CourseSubject.state == True,
        )
        return self.db.exec(query).all()

    # Lista asignaciones activas de un docente dentro de un curso.
    def list_active_by_teacher_and_course(
        self, school_id: UUID, teacher_id: UUID, course_id: UUID
    ) -> list[Assignment]:
        query = (
            select(Assignment)
            .join(CourseSubject, CourseSubject.id == Assignment.course_subject_id)
            .join(Course, Course.id == CourseSubject.course_id)
            .where(
                Assignment.school_id == school_id,
                Assignment.teacher_id == teacher_id,
                Assignment.state == True,
                Course.id == course_id,
                Course.state == True,
                Course.school_id == school_id,
                CourseSubject.state == True,
            )
        )
        return self.db.exec(query).all()

    # Crea asignaciones activas para un docente con varios course_subject.
    def create_many(
        self, school_id: UUID, teacher_id: UUID, course_subject_ids: list[UUID]
    ) -> None:
        for course_subject_id in course_subject_ids:
            self.db.add(
                Assignment(
                    school_id=school_id,
                    teacher_id=teacher_id,
                    course_subject_id=course_subject_id,
                )
            )

    # Desactiva una lista de asignaciones activas.
    def soft_delete_many(self, assignments: list[Assignment]) -> None:
        for assignment in assignments:
            assignment.state = False
            self.db.add(assignment)

    # Lista nombres de cursos donde el docente tiene al menos una asignacion activa.
    def list_teacher_course_names(self, school_id: UUID, teacher_id: UUID) -> list[str]:
        query = (
            select(Course.name)
            .join(CourseSubject, CourseSubject.course_id == Course.id)
            .join(Assignment, Assignment.course_subject_id == CourseSubject.id)
            .where(
                Assignment.school_id == school_id,
                Assignment.teacher_id == teacher_id,
                Assignment.state == True,
                Course.state == True,
                Course.school_id == school_id,
                CourseSubject.state == True,
            )
            .distinct()
            .order_by(Course.name.asc())
        )
        return self.db.exec(query).all()

    # Lista filas de asignaciones activas de un docente para agrupar por curso.
    def list_teacher_assignments_rows(self, school_id: UUID, teacher_id: UUID):
        query = (
            select(Course.id, Course.name, Subject.id, Subject.name)
            .join(CourseSubject, CourseSubject.course_id == Course.id)
            .join(Assignment, Assignment.course_subject_id == CourseSubject.id)
            .join(Subject, Subject.id == CourseSubject.subject_id)
            .where(
                Assignment.school_id == school_id,
                Assignment.teacher_id == teacher_id,
                Assignment.state == True,
                Course.state == True,
                Course.school_id == school_id,
                CourseSubject.state == True,
                Subject.state == True,
            )
            .order_by(Course.name.asc(), Subject.name.asc())
        )
        return self.db.exec(query).all()
