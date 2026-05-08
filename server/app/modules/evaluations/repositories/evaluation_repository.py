from datetime import date
from uuid import UUID

from sqlmodel import Session, func, select

from app.modules.academic.models import Assignment, Course, CourseSubject, Subject, Term
from app.modules.evaluations.models import Evaluation, EvaluationGrade, EvaluationType


class EvaluationRepository:
    def __init__(self, db: Session):
        self.db = db

    # Persiste una nueva evaluacion en la sesion actual.
    def create(self, evaluation: Evaluation) -> Evaluation:
        self.db.add(evaluation)
        return evaluation

    # Persiste cambios sobre una evaluacion existente.
    def update(self, evaluation: Evaluation) -> Evaluation:
        self.db.add(evaluation)
        return evaluation

    # Desactiva una evaluacion (borrado logico).
    def delete(self, evaluation: Evaluation) -> Evaluation:
        evaluation.state = False
        self.db.add(evaluation)
        return evaluation

    # Desactiva todas las calificaciones activas asociadas a una evaluacion.
    def soft_delete_grades_by_evaluation(self, school_id: UUID, evaluation_id: UUID) -> None:
        query = select(EvaluationGrade).where(
            EvaluationGrade.school_id == school_id,
            EvaluationGrade.evaluation_id == evaluation_id,
            EvaluationGrade.state == True,
        )
        grades = self.db.exec(query).all()
        for grade in grades:
            grade.state = False
            self.db.add(grade)

    # Busca una evaluacion activa por ID dentro de la escuela.
    def get_active_by_id_in_school(self, school_id: UUID, evaluation_id: UUID) -> Evaluation | None:
        query = select(Evaluation).where(
            Evaluation.id == evaluation_id,
            Evaluation.school_id == school_id,
            Evaluation.state == True,
        )
        return self.db.exec(query).first()

    # Cuenta evaluaciones activas para una asignacion dentro de la escuela.
    def count_by_assignment(self, school_id: UUID, assignment_id: UUID) -> int:
        query = select(func.count()).select_from(Evaluation).where(
            Evaluation.school_id == school_id,
            Evaluation.assignment_id == assignment_id,
            Evaluation.state == True,
        )
        return self.db.exec(query).one()

    # Lista evaluaciones activas de una asignacion con nombre de tipo y trimestre.
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
            select(Evaluation, EvaluationType.name, Term.name)
            .join(EvaluationType, EvaluationType.id == Evaluation.evaluation_type_id)
            .join(Term, Term.id == Evaluation.term_id)
            .where(
                Evaluation.school_id == school_id,
                Evaluation.assignment_id == assignment_id,
                Evaluation.state == True,
                EvaluationType.state == True,
                Term.state == True,
            )
            .order_by(Evaluation.presentation_date.desc(), Evaluation.created_date.desc())
            .offset(offset)
            .limit(per_page)
        )
        return self.db.exec(query).all()

    # Obtiene una evaluacion activa con nombre de tipo y trimestre para detalle.
    def get_read_row_by_id(self, school_id: UUID, evaluation_id: UUID):
        query = (
            select(Evaluation, EvaluationType.name, Term.name)
            .join(EvaluationType, EvaluationType.id == Evaluation.evaluation_type_id)
            .join(Term, Term.id == Evaluation.term_id)
            .where(
                Evaluation.school_id == school_id,
                Evaluation.id == evaluation_id,
                Evaluation.state == True,
                EvaluationType.state == True,
                Term.state == True,
            )
        )
        return self.db.exec(query).first()


class EvaluationTypeRepository:
    def __init__(self, db: Session):
        self.db = db

    # Lista tipos de evaluacion activos para opciones de formulario.
    def list_active(self) -> list[EvaluationType]:
        query = select(EvaluationType).where(EvaluationType.state == True).order_by(EvaluationType.name.asc())
        return self.db.exec(query).all()

    # Busca un tipo de evaluacion activo por ID.
    def get_active_by_id(self, evaluation_type_id: UUID) -> EvaluationType | None:
        query = select(EvaluationType).where(
            EvaluationType.id == evaluation_type_id,
            EvaluationType.state == True,
        )
        return self.db.exec(query).first()


class EvaluationContextRepository:
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

    # Lista trimestres activos de la escuela para opciones de formulario.
    def list_active_terms_by_school(self, school_id: UUID) -> list[Term]:
        query = (
            select(Term)
            .where(
                Term.school_id == school_id,
                Term.state == True,
            )
            .order_by(Term.start_date.asc())
        )
        return self.db.exec(query).all()

    # Obtiene curso y materia relacionados a una asignacion activa.
    def get_assignment_summary(self, assignment_id: UUID):
        query = (
            select(Course.id, Subject.id)
            .join(CourseSubject, CourseSubject.course_id == Course.id)
            .join(Subject, Subject.id == CourseSubject.subject_id)
            .join(Assignment, Assignment.course_subject_id == CourseSubject.id)
            .where(
                Assignment.id == assignment_id,
                Assignment.state == True,
                Course.state == True,
                CourseSubject.state == True,
                Subject.state == True,
            )
        )
        return self.db.exec(query).first()

    # Verifica si el docente tiene asignacion activa para una materia de un curso.
    def is_teacher_assigned_to_course_subject(
        self,
        school_id: UUID,
        teacher_id: UUID,
        course_id: UUID,
        subject_id: UUID,
    ) -> bool:
        query = (
            select(Assignment.id)
            .join(CourseSubject, CourseSubject.id == Assignment.course_subject_id)
            .where(
                Assignment.school_id == school_id,
                Assignment.teacher_id == teacher_id,
                Assignment.state == True,
                CourseSubject.course_id == course_id,
                CourseSubject.subject_id == subject_id,
                CourseSubject.state == True,
            )
        )
        return self.db.exec(query).first() is not None
