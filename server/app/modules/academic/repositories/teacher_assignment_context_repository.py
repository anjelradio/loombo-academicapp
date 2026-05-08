from uuid import UUID

from sqlmodel import Session, select

from app.modules.academic.models import Assignment, Course, CourseSubject, Subject


class TeacherAssignmentContextRepository:
    def __init__(self, db: Session):
        self.db = db

    # Lista cursos activos donde el docente tiene al menos una asignacion activa.
    def list_teacher_courses(self, school_id: UUID, teacher_id: UUID):
        query = (
            select(Course.id, Course.name)
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

    # Lista materias activas del docente en un curso activo, incluyendo assignment_id.
    def list_teacher_subjects_by_course(self, school_id: UUID, teacher_id: UUID, course_id: UUID):
        query = (
            select(Assignment.id, Subject.id, Subject.name)
            .join(CourseSubject, CourseSubject.id == Assignment.course_subject_id)
            .join(Subject, Subject.id == CourseSubject.subject_id)
            .join(Course, Course.id == CourseSubject.course_id)
            .where(
                Assignment.school_id == school_id,
                Assignment.teacher_id == teacher_id,
                Assignment.state == True,
                Course.id == course_id,
                Course.state == True,
                Course.school_id == school_id,
                CourseSubject.state == True,
                Subject.state == True,
            )
            .order_by(Subject.name.asc())
        )
        return self.db.exec(query).all()

    # Lista asignaciones activas del docente agrupables por curso y materia.
    def list_teacher_assignment_groups(self, school_id: UUID, teacher_id: UUID):
        query = (
            select(Course.id, Course.name, Assignment.id, Subject.id, Subject.name)
            .join(CourseSubject, CourseSubject.course_id == Course.id)
            .join(Subject, Subject.id == CourseSubject.subject_id)
            .join(Assignment, Assignment.course_subject_id == CourseSubject.id)
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

    # Lista todas las asignaciones activas de la escuela agrupables por curso y materia.
    def list_school_assignment_groups(self, school_id: UUID):
        query = (
            select(Course.id, Course.name, Assignment.id, Subject.id, Subject.name)
            .join(CourseSubject, CourseSubject.course_id == Course.id)
            .join(Subject, Subject.id == CourseSubject.subject_id)
            .join(Assignment, Assignment.course_subject_id == CourseSubject.id)
            .where(
                Assignment.school_id == school_id,
                Assignment.state == True,
                Course.state == True,
                Course.school_id == school_id,
                CourseSubject.state == True,
                Subject.state == True,
            )
            .order_by(Course.name.asc(), Subject.name.asc())
        )
        return self.db.exec(query).all()
