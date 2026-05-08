from uuid import UUID

from sqlmodel import Session, select

from app.modules.academic.models import Assignment, Course, CourseSubject, EvaluationWeight, Term
from app.modules.attendance.models import AttendanceRecord, AttendanceSession, AttendanceStatus
from app.modules.evaluations.models import Evaluation, EvaluationGrade, EvaluationType, TermSubjectAverage
from app.modules.students.models import CourseStudent, Student


class TermSubjectAverageRepository:
    def __init__(self, db: Session):
        self.db = db

    # Busca una asignacion activa por ID en la escuela.
    def get_active_assignment_by_id_in_school(self, school_id: UUID, assignment_id: UUID) -> Assignment | None:
        query = select(Assignment).where(
            Assignment.id == assignment_id,
            Assignment.school_id == school_id,
            Assignment.state == True,
        )
        return self.db.exec(query).first()

    # Busca un trimestre activo por ID en la escuela.
    def get_active_term_by_id_in_school(self, school_id: UUID, term_id: UUID) -> Term | None:
        query = select(Term).where(
            Term.id == term_id,
            Term.school_id == school_id,
            Term.state == True,
        )
        return self.db.exec(query).first()

    # Lista trimestres activos y marca el vigente por fecha.
    def list_active_terms_with_active_flag(self, school_id: UUID, at_date):
        query = (
            select(Term)
            .where(Term.school_id == school_id, Term.state == True)
            .order_by(Term.start_date.asc())
        )
        terms = self.db.exec(query).all()
        return [(term, term.start_date <= at_date <= term.end_date) for term in terms]

    # Obtiene curso y nivel escolar asociados a una asignacion activa.
    def get_course_and_level_by_assignment(self, assignment_id: UUID):
        query = (
            select(Course.id, Course.school_level_id)
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

    # Obtiene ponderacion activa por escuela y nivel escolar.
    def get_active_weight_by_school_and_level(
        self,
        school_id: UUID,
        school_level_id: UUID,
    ) -> EvaluationWeight | None:
        query = select(EvaluationWeight).where(
            EvaluationWeight.school_id == school_id,
            EvaluationWeight.school_level_id == school_level_id,
            EvaluationWeight.state == True,
        )
        return self.db.exec(query).first()

    # Lista estudiantes activos de la asignacion en orden alfabetico.
    def list_active_students_by_assignment(self, school_id: UUID, assignment_id: UUID) -> list[Student]:
        query = (
            select(Student)
            .join(CourseStudent, CourseStudent.student_id == Student.id)
            .join(Course, Course.id == CourseStudent.course_id)
            .join(CourseSubject, CourseSubject.course_id == Course.id)
            .join(Assignment, Assignment.course_subject_id == CourseSubject.id)
            .where(
                Assignment.id == assignment_id,
                Assignment.school_id == school_id,
                Assignment.state == True,
                CourseSubject.state == True,
                Course.state == True,
                CourseStudent.state == True,
                Student.state == True,
                Student.school_id == school_id,
            )
            .order_by(Student.last_name.asc(), Student.first_name.asc())
        )
        return self.db.exec(query).all()

    # Lista evaluaciones activas de la asignacion y trimestre con tipo.
    def list_active_evaluations_by_assignment_and_term(self, school_id: UUID, assignment_id: UUID, term_id: UUID):
        query = (
            select(Evaluation.id, EvaluationType.name)
            .join(EvaluationType, EvaluationType.id == Evaluation.evaluation_type_id)
            .where(
                Evaluation.school_id == school_id,
                Evaluation.assignment_id == assignment_id,
                Evaluation.term_id == term_id,
                Evaluation.state == True,
                EvaluationType.state == True,
            )
        )
        return self.db.exec(query).all()

    # Lista calificaciones activas por un conjunto de evaluaciones.
    def list_active_grades_by_evaluation_ids(
        self,
        school_id: UUID,
        evaluation_ids: list[UUID],
    ) -> list[EvaluationGrade]:
        if not evaluation_ids:
            return []
        query = select(EvaluationGrade).where(
            EvaluationGrade.school_id == school_id,
            EvaluationGrade.evaluation_id.in_(evaluation_ids),
            EvaluationGrade.state == True,
        )
        return self.db.exec(query).all()

    # Obtiene los IDs de estados de asistencia por nombre.
    def get_attendance_status_ids_by_name(self) -> dict[str, UUID]:
        query = select(AttendanceStatus.id, AttendanceStatus.name).where(AttendanceStatus.state == True)
        rows = self.db.exec(query).all()
        return {name.lower(): status_id for status_id, name in rows}

    # Lista registros de asistencia por asignacion y trimestre.
    def list_attendance_records_by_assignment_and_term(
        self,
        school_id: UUID,
        assignment_id: UUID,
        term_id: UUID,
    ):
        query = (
            select(AttendanceRecord.student_id, AttendanceRecord.status_id)
            .join(AttendanceSession, AttendanceSession.id == AttendanceRecord.attendance_session_id)
            .where(
                AttendanceRecord.school_id == school_id,
                AttendanceRecord.state == True,
                AttendanceSession.school_id == school_id,
                AttendanceSession.assignment_id == assignment_id,
                AttendanceSession.term_id == term_id,
                AttendanceSession.state == True,
            )
        )
        return self.db.exec(query).all()

    # Lista promedios activos por asignacion y trimestre.
    def list_active_by_assignment_and_term(
        self,
        school_id: UUID,
        assignment_id: UUID,
        term_id: UUID,
    ) -> list[TermSubjectAverage]:
        query = select(TermSubjectAverage).where(
            TermSubjectAverage.school_id == school_id,
            TermSubjectAverage.assignment_id == assignment_id,
            TermSubjectAverage.term_id == term_id,
            TermSubjectAverage.state == True,
        )
        return self.db.exec(query).all()

    # Desactiva promedios existentes de una asignacion y trimestre.
    def soft_delete_by_assignment_and_term(self, school_id: UUID, assignment_id: UUID, term_id: UUID) -> None:
        query = select(TermSubjectAverage).where(
            TermSubjectAverage.school_id == school_id,
            TermSubjectAverage.assignment_id == assignment_id,
            TermSubjectAverage.term_id == term_id,
            TermSubjectAverage.state == True,
        )
        rows = self.db.exec(query).all()
        for row in rows:
            row.state = False
            self.db.add(row)

    # Persiste un promedio trimestral por estudiante.
    def create(self, model: TermSubjectAverage) -> TermSubjectAverage:
        self.db.add(model)
        return model
