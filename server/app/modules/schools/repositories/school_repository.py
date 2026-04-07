from uuid import UUID

from sqlmodel import Session, func, select

from app.modules.schools.models import School, SchoolUser


class SchoolRepository:
    def __init__(self, db: Session):
        self.db = db

    def list(self) -> list[School]:
        query = select(School).where(School.state == True).order_by(School.id.desc())
        return self.db.exec(query).all()

    def get(self, school_id: UUID) -> School | None:
        query = select(School).where(School.id == school_id, School.state == True)
        return self.db.exec(query).first()

    def get_by_name(self, name: str) -> School | None:
        query = select(School).where(
            func.lower(func.trim(School.name)) == name.lower(), School.state == True
        )
        return self.db.exec(query).first()

    def get_by_phone(self, phone: str) -> School | None:
        query = select(School).where(School.phone == phone, School.state == True)
        return self.db.exec(query).first()

    def create(self, school: School) -> School:
        self.db.add(school)
        return school

    def update(self, school: School) -> School:
        self.db.add(school)
        return school

    def delete(self, school: School) -> School:
        school.state = False
        self.db.add(school)
        return school

    def list_by_user_id(self, user_id: UUID):
        query = (
            select(School, SchoolUser.role)
            .join(SchoolUser, School.id == SchoolUser.school_id)
            .where(
                SchoolUser.user_id == user_id,
                School.state == True,
                SchoolUser.state == True,
            )
        )
        return self.db.exec(query).all()
