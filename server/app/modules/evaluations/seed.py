from sqlmodel import Session, func, select

from app.modules.evaluations.models import EvaluationType

DEFAULT_EVALUATION_TYPES = [
    "Tarea",
    "Practica",
    "Examen",
    "Proyecto",
    "Participacion",
    "Autoevaluacion",
]


def seed_evaluation_types(db: Session) -> None:
    for type_name in DEFAULT_EVALUATION_TYPES:
        query = select(EvaluationType).where(
            func.lower(func.trim(EvaluationType.name)) == type_name.lower(),
            EvaluationType.state == True,
        )
        existing = db.exec(query).first()
        if existing:
            continue

        db.add(EvaluationType(name=type_name))

    db.commit()
