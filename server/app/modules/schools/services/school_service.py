from __future__ import annotations

from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session

from app.modules.schools.models import School, SchoolRole, SchoolUser
from app.modules.schools.repositories import SchoolRepository, SchoolUserRepository
from app.modules.schools.schemas import SchoolCreate, SchoolWithRole


class SchoolService:
    def __init__(self, db: Session):
        self.db = db
        self.school = SchoolRepository(db)
        self.school_user = SchoolUserRepository(db)

    def list(self) -> list[School]:
        return self.school.list()

    def create(self, payload: SchoolCreate, owner_id: UUID) -> School:
        if self.school.get_by_name(payload.name):
            raise HTTPException(
                status_code=409, detail="El nombre de la escuela ya esta en uso"
            )
        if self.school.get_by_phone(payload.phone):
            raise HTTPException(status_code=409, detail="El telefono ya esta en uso")

        try:
            school = School(
                name=payload.name,
                logo_image=payload.logo_image,
                type=payload.type,
                phone=payload.phone,
            )
            self.school.create(school)
            self.db.flush()

            school_user = SchoolUser(
                user_id=owner_id, school_id=school.id, role=SchoolRole.OWNER
            )
            self.school_user.create(school_user)

            self.db.commit()
            self.db.refresh(school)
            self.db.refresh(school_user)
            return school
        except IntegrityError as error:
            self.db.rollback()
            error_message = str(error.orig).lower()
            if "phone" in error_message:
                raise HTTPException(status_code=409, detail="El telefono ya esta en uso")

            raise HTTPException(
                status_code=409, detail="El nombre de la escuela ya esta en uso"
            )
        except Exception:
            self.db.rollback()
            raise

    def list_by_user(self, user_id: UUID) -> list[SchoolWithRole]:
        results = self.school.list_by_user_id(user_id)
        return [
            SchoolWithRole(
                id=school.id,
                name=school.name,
                logo_image=school.logo_image,
                type=school.type,
                phone=school.phone,
                role=SchoolRole(role),
            )
            for school, role in results
        ]
