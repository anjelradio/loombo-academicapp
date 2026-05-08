from uuid import UUID

from sqlmodel import Session, select

from app.modules.schools.models import Level, SchoolLevel


class LevelRepository:
    def __init__(self, db: Session):
        self.db = db

    # Lista niveles activos ordenados alfabeticamente.
    def list_active(self) -> list[Level]:
        query = select(Level).where(Level.state == True).order_by(Level.name.asc())
        return self.db.exec(query).all()

    # Recupera niveles activos por un conjunto de identificadores.
    def list_by_ids(self, level_ids: list[UUID]) -> list[Level]:
        query = select(Level).where(Level.id.in_(level_ids), Level.state == True)
        return self.db.exec(query).all()

    # Busca un nivel activo por nombre exacto.
    def get_by_name(self, name: str) -> Level | None:
        query = select(Level).where(Level.name == name, Level.state == True)
        return self.db.exec(query).first()

    # Persiste un nuevo nivel en la sesion actual.
    def create(self, level: Level) -> Level:
        self.db.add(level)
        return level


class SchoolLevelRepository:
    def __init__(self, db: Session):
        self.db = db

    # Persiste la relacion entre escuela y nivel en la sesion actual.
    def create(self, school_level: SchoolLevel) -> SchoolLevel:
        self.db.add(school_level)
        return school_level
