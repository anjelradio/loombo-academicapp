from datetime import date
from uuid import UUID

from sqlmodel import Session, and_, select

from app.modules.academic.models import EvaluationWeight, Term
from app.modules.schools.models import Level, SchoolLevel


class TermRepository:
    def __init__(self, db: Session):
        self.db = db

    # Lista trimestres activos de una escuela ordenados por fecha de inicio.
    def list_active_by_school(self, school_id: UUID) -> list[Term]:
        query = (
            select(Term)
            .where(Term.school_id == school_id, Term.state == True)
            .order_by(Term.start_date.asc())
        )
        return self.db.exec(query).all()

    # Busca un trimestre activo por ID dentro de una escuela.
    def get_active_by_id_in_school(self, school_id: UUID, term_id: UUID) -> Term | None:
        query = select(Term).where(
            Term.id == term_id,
            Term.school_id == school_id,
            Term.state == True,
        )
        return self.db.exec(query).first()

    # Busca un trimestre activo por nombre dentro de una escuela.
    def get_by_name_in_school(self, school_id: UUID, name: str) -> Term | None:
        query = select(Term).where(
            Term.school_id == school_id,
            Term.name == name,
            Term.state == True,
        )
        return self.db.exec(query).first()

    # Verifica solapamiento de fechas con trimestres activos de la escuela.
    def has_date_overlap(
        self,
        school_id: UUID,
        start_date: date,
        end_date: date,
        exclude_term_id: UUID | None = None,
    ) -> bool:
        query = select(Term).where(
            Term.school_id == school_id,
            Term.state == True,
            and_(Term.start_date <= end_date, Term.end_date >= start_date),
        )

        if exclude_term_id:
            query = query.where(Term.id != exclude_term_id)

        return self.db.exec(query).first() is not None

    # Persiste un nuevo trimestre en la sesion actual.
    def create(self, term: Term) -> Term:
        self.db.add(term)
        return term

    # Persiste cambios sobre un trimestre existente.
    def update(self, term: Term) -> Term:
        self.db.add(term)
        return term

    # Desactiva un trimestre (borrado logico).
    def delete(self, term: Term) -> Term:
        term.state = False
        self.db.add(term)
        return term


class EvaluationWeightRepository:
    def __init__(self, db: Session):
        self.db = db

    # Busca ponderacion activa por escuela y nivel escolar.
    def get_by_school_and_level(
        self, school_id: UUID, school_level_id: UUID
    ) -> EvaluationWeight | None:
        query = select(EvaluationWeight).where(
            EvaluationWeight.school_id == school_id,
            EvaluationWeight.school_level_id == school_level_id,
            EvaluationWeight.state == True,
        )
        return self.db.exec(query).first()

    # Persiste una nueva ponderacion en la sesion actual.
    def create(self, model: EvaluationWeight) -> EvaluationWeight:
        self.db.add(model)
        return model

    # Persiste cambios sobre una ponderacion existente.
    def update(self, model: EvaluationWeight) -> EvaluationWeight:
        self.db.add(model)
        return model

    # Lista niveles activos de la escuela con su ponderacion asociada si existe.
    def list_levels_with_weights(self, school_id: UUID):
        query = (
            select(
                SchoolLevel.id,
                Level.name,
                EvaluationWeight.id,
                EvaluationWeight.ser,
                EvaluationWeight.saber,
                EvaluationWeight.hacer,
                EvaluationWeight.autoevaluacion,
            )
            .join(Level, Level.id == SchoolLevel.level_id)
            .outerjoin(
                EvaluationWeight,
                and_(
                    EvaluationWeight.school_level_id == SchoolLevel.id,
                    EvaluationWeight.school_id == school_id,
                    EvaluationWeight.state == True,
                ),
            )
            .where(SchoolLevel.school_id == school_id, SchoolLevel.state == True, Level.state == True)
            .order_by(Level.name.asc())
        )
        return self.db.exec(query).all()
