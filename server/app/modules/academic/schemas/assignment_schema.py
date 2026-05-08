from typing import Annotated
from uuid import UUID

from pydantic import Field, field_validator
from sqlmodel import SQLModel


class AssignmentTeacherRead(SQLModel):
    teacher_id: UUID
    first_name: str
    last_name: str
    course_names: list[str]


class PaginatedAssignmentTeacher(SQLModel):
    teachers: list[AssignmentTeacherRead]
    page: int
    per_page: int
    total_pages: int
    has_prev: bool
    has_next: bool


class AssignmentCourseOptionRead(SQLModel):
    course_id: UUID
    course_name: str


class AssignmentSubjectOptionRead(SQLModel):
    subject_id: UUID
    subject_name: str


class AssignmentCreate(SQLModel):
    course_id: UUID
    subject_ids: Annotated[list[UUID], Field(min_length=1)]

    @field_validator("subject_ids")
    @classmethod
    def validate_subject_ids(cls, value: list[UUID]) -> list[UUID]:
        unique_subject_ids = list(dict.fromkeys(value))
        if len(unique_subject_ids) == 0:
            raise ValueError("Debes seleccionar al menos una materia")
        return unique_subject_ids


class AssignmentUpdate(SQLModel):
    subject_ids: Annotated[list[UUID], Field(min_length=1)]

    @field_validator("subject_ids")
    @classmethod
    def validate_subject_ids(cls, value: list[UUID]) -> list[UUID]:
        unique_subject_ids = list(dict.fromkeys(value))
        if len(unique_subject_ids) == 0:
            raise ValueError("Debes seleccionar al menos una materia")
        return unique_subject_ids


class AssignmentSubjectRead(SQLModel):
    subject_id: UUID
    subject_name: str


class AssignmentCourseGroupRead(SQLModel):
    course_id: UUID
    course_name: str
    subjects: list[AssignmentSubjectRead]


class TeacherAssignmentsRead(SQLModel):
    teacher_id: UUID
    first_name: str
    last_name: str
    assignments: list[AssignmentCourseGroupRead]


class TeacherAssignmentCourseRead(SQLModel):
    course_id: UUID
    course_name: str


class TeacherAssignmentSubjectRead(SQLModel):
    assignment_id: UUID
    subject_id: UUID
    subject_name: str


class TeacherAssignmentCourseGroupRead(SQLModel):
    course_id: UUID
    course_name: str
    subjects: list[TeacherAssignmentSubjectRead]
