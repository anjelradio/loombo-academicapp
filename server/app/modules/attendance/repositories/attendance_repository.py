from uuid import UUID

from sqlmodel import Session, func, select

from app.modules.academic.models import Assignment, Course, CourseSubject, Term
from app.modules.attendance.models import AttendanceRecord, AttendanceSession, AttendanceStatus
from app.modules.students.models import CourseStudent, Student


class AttendanceSessionRepository:
    def __init__(self, db: Session):
        self.db = db

    # Persiste una nueva sesion de asistencia en la sesion actual.
    def create(self, session: AttendanceSession) -> AttendanceSession:
        self.db.add(session)
        return session

    # Persiste cambios sobre una sesion de asistencia existente.
    def update(self, session: AttendanceSession) -> AttendanceSession:
        self.db.add(session)
        return session

    # Desactiva una sesion de asistencia (borrado logico).
    def delete(self, session: AttendanceSession) -> AttendanceSession:
        session.state = False
        self.db.add(session)
        return session

    # Busca una sesion activa por ID dentro de la escuela.
    def get_active_by_id_in_school(self, school_id: UUID, session_id: UUID) -> AttendanceSession | None:
        query = select(AttendanceSession).where(
            AttendanceSession.id == session_id,
            AttendanceSession.school_id == school_id,
            AttendanceSession.state == True,
        )
        return self.db.exec(query).first()

    # Cuenta sesiones activas para una asignacion en la escuela.
    def count_by_assignment(self, school_id: UUID, assignment_id: UUID) -> int:
        query = select(func.count()).select_from(AttendanceSession).where(
            AttendanceSession.school_id == school_id,
            AttendanceSession.assignment_id == assignment_id,
            AttendanceSession.state == True,
        )
        return self.db.exec(query).one()

    # Lista sesiones activas por asignacion con nombre de trimestre.
    def list_paginated_by_assignment(
        self,
        school_id: UUID,
        assignment_id: UUID,
        *,
        per_page: int,
        page: int,
    ):
        offset = (page - 1) * per_page
        query = (
            select(AttendanceSession, Term.name)
            .join(Term, Term.id == AttendanceSession.term_id)
            .where(
                AttendanceSession.school_id == school_id,
                AttendanceSession.assignment_id == assignment_id,
                AttendanceSession.state == True,
                Term.state == True,
            )
            .order_by(AttendanceSession.attendance_date.desc(), AttendanceSession.created_date.desc())
            .offset(offset)
            .limit(per_page)
        )
        return self.db.exec(query).all()

    # Obtiene una sesion activa con nombre de trimestre para detalle.
    def get_read_row_by_id(self, school_id: UUID, session_id: UUID):
        query = (
            select(AttendanceSession, Term.name)
            .join(Term, Term.id == AttendanceSession.term_id)
            .where(
                AttendanceSession.school_id == school_id,
                AttendanceSession.id == session_id,
                AttendanceSession.state == True,
                Term.state == True,
            )
        )
        return self.db.exec(query).first()


class AttendanceStatusRepository:
    def __init__(self, db: Session):
        self.db = db

    # Lista estados de asistencia activos para opciones de formulario.
    def list_active(self) -> list[AttendanceStatus]:
        query = select(AttendanceStatus).where(AttendanceStatus.state == True).order_by(AttendanceStatus.name.asc())
        return self.db.exec(query).all()

    # Busca un estado de asistencia activo por ID.
    def get_active_by_id(self, status_id: UUID) -> AttendanceStatus | None:
        query = select(AttendanceStatus).where(
            AttendanceStatus.id == status_id,
            AttendanceStatus.state == True,
        )
        return self.db.exec(query).first()

    # Busca un estado de asistencia activo por nombre.
    def get_active_by_name(self, name: str) -> AttendanceStatus | None:
        query = select(AttendanceStatus).where(
            func.lower(AttendanceStatus.name) == name.lower(),
            AttendanceStatus.state == True,
        )
        return self.db.exec(query).first()


class AttendanceRecordRepository:
    def __init__(self, db: Session):
        self.db = db

    # Persiste un nuevo registro de asistencia en la sesion actual.
    def create(self, record: AttendanceRecord) -> AttendanceRecord:
        self.db.add(record)
        return record

    # Persiste cambios sobre un registro de asistencia existente.
    def update(self, record: AttendanceRecord) -> AttendanceRecord:
        self.db.add(record)
        return record

    # Lista registros de asistencia activos para una sesion.
    def list_active_by_session(self, school_id: UUID, session_id: UUID) -> list[AttendanceRecord]:
        query = select(AttendanceRecord).where(
            AttendanceRecord.school_id == school_id,
            AttendanceRecord.attendance_session_id == session_id,
            AttendanceRecord.state == True,
        )
        return self.db.exec(query).all()

    # Busca un registro activo de asistencia por sesion y estudiante.
    def get_active_by_session_and_student(
        self,
        school_id: UUID,
        session_id: UUID,
        student_id: UUID,
    ) -> AttendanceRecord | None:
        query = select(AttendanceRecord).where(
            AttendanceRecord.school_id == school_id,
            AttendanceRecord.attendance_session_id == session_id,
            AttendanceRecord.student_id == student_id,
            AttendanceRecord.state == True,
        )
        return self.db.exec(query).first()

    # Desactiva todos los registros activos de una sesion.
    def soft_delete_by_session(self, school_id: UUID, session_id: UUID) -> None:
        query = select(AttendanceRecord).where(
            AttendanceRecord.school_id == school_id,
            AttendanceRecord.attendance_session_id == session_id,
            AttendanceRecord.state == True,
        )
        records = self.db.exec(query).all()
        for record in records:
            record.state = False
            self.db.add(record)


class AttendanceContextRepository:
    def __init__(self, db: Session):
        self.db = db

    # Busca una asignacion activa por ID dentro de la escuela.
    def get_active_assignment_by_id_in_school(self, school_id: UUID, assignment_id: UUID) -> Assignment | None:
        query = select(Assignment).where(
            Assignment.id == assignment_id,
            Assignment.school_id == school_id,
            Assignment.state == True,
        )
        return self.db.exec(query).first()

    # Busca un trimestre activo por ID dentro de la escuela.
    def get_active_term_by_id_in_school(self, school_id: UUID, term_id: UUID) -> Term | None:
        query = select(Term).where(
            Term.id == term_id,
            Term.school_id == school_id,
            Term.state == True,
        )
        return self.db.exec(query).first()

    # Busca el trimestre activo que contiene la fecha indicada.
    def get_active_term_by_date_in_school(self, school_id: UUID, at_date) -> Term | None:
        query = select(Term).where(
            Term.school_id == school_id,
            Term.state == True,
            Term.start_date <= at_date,
            Term.end_date >= at_date,
        )
        return self.db.exec(query).first()

    # Obtiene el curso asociado a una asignacion activa.
    def get_course_id_by_assignment(self, assignment_id: UUID) -> UUID | None:
        query = (
            select(Course.id)
            .join(CourseSubject, CourseSubject.course_id == Course.id)
            .join(Assignment, Assignment.course_subject_id == CourseSubject.id)
            .where(
                Assignment.id == assignment_id,
                Assignment.state == True,
                CourseSubject.state == True,
                Course.state == True,
            )
        )
        return self.db.exec(query).first()

    # Lista estudiantes activos vinculados a un curso activo.
    def list_active_students_by_course(self, school_id: UUID, course_id: UUID) -> list[Student]:
        query = (
            select(Student)
            .join(CourseStudent, CourseStudent.student_id == Student.id)
            .join(Course, Course.id == CourseStudent.course_id)
            .where(
                CourseStudent.course_id == course_id,
                CourseStudent.state == True,
                Student.state == True,
                Student.school_id == school_id,
                Course.state == True,
                Course.school_id == school_id,
            )
            .order_by(Student.last_name.asc(), Student.first_name.asc())
        )
        return self.db.exec(query).all()
