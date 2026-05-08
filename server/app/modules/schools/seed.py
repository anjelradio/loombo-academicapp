from sqlmodel import Session

from app.modules.schools.models import Level
from app.modules.schools.repositories import LevelRepository

DEFAULT_LEVELS = ["Inicial", "Primaria", "Secundaria"]


def seed_levels(db: Session) -> None:
    level_repository = LevelRepository(db)

    for level_name in DEFAULT_LEVELS:
        if level_repository.get_by_name(level_name):
            continue
        level_repository.create(Level(name=level_name))

    db.commit()
