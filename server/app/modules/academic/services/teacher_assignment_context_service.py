from uuid import UUID

from fastapi import HTTPException
from sqlmodel import Session

from app.modules.academic.repositories import TeacherAssignmentContextRepository
from app.modules.academic.schemas import (
    TeacherAssignmentCourseGroupRead,
    TeacherAssignmentCourseRead,
    TeacherAssignmentSubjectRead,
)
from app.modules.schools.models import SchoolRole
from app.modules.schools.repositories import SchoolRepository, SchoolUserRepository


class TeacherAssignmentContextService:
    def __init__(self, db: Session):
        self.db = db
        self.teacher_context = TeacherAssignmentContextRepository(db)
        self.school = SchoolRepository(db)
        self.school_user = SchoolUserRepository(db)

    def _get_teacher_membership_id(self, school_id: UUID, user_id: UUID) -> UUID:
        # Valida que el usuario sea docente activo de la escuela y devuelve su membership id.
        membership = self.school_user.get_by_user_school_and_role(user_id, school_id, SchoolRole.TEACHER)
        if not membership:
            raise HTTPException(status_code=403, detail="Solo un docente de la escuela puede acceder")
        return membership.id

    def _ensure_school_exists(self, school_id: UUID) -> None:
        # Valida que la escuela exista.
        school = self.school.get(school_id)
        if not school:
            raise HTTPException(status_code=404, detail="Escuela no encontrada")

    def list_teacher_courses(self, school_id: UUID, user_id: UUID) -> list[TeacherAssignmentCourseRead]:
        # Obtiene cursos donde el docente tiene asignaciones activas.
        self._ensure_school_exists(school_id)
        teacher_id = self._get_teacher_membership_id(school_id, user_id)
        rows = self.teacher_context.list_teacher_courses(school_id, teacher_id)
        return [
            TeacherAssignmentCourseRead(course_id=course_id, course_name=course_name)
            for course_id, course_name in rows
        ]

    def list_teacher_subjects_by_course(
        self,
        school_id: UUID,
        course_id: UUID,
        user_id: UUID,
    ) -> list[TeacherAssignmentSubjectRead]:
        # Obtiene materias del docente para un curso especifico.
        self._ensure_school_exists(school_id)
        teacher_id = self._get_teacher_membership_id(school_id, user_id)
        rows = self.teacher_context.list_teacher_subjects_by_course(school_id, teacher_id, course_id)
        return [
            TeacherAssignmentSubjectRead(
                assignment_id=assignment_id,
                subject_id=subject_id,
                subject_name=subject_name,
            )
            for assignment_id, subject_id, subject_name in rows
        ]

    def list_teacher_assignment_groups(
        self,
        school_id: UUID,
        user_id: UUID,
    ) -> list[TeacherAssignmentCourseGroupRead]:
        # Obtiene asignaciones del docente agrupadas por curso.
        self._ensure_school_exists(school_id)
        teacher_id = self._get_teacher_membership_id(school_id, user_id)
        rows = self.teacher_context.list_teacher_assignment_groups(school_id, teacher_id)

        grouped: dict[UUID, TeacherAssignmentCourseGroupRead] = {}
        for course_id, course_name, assignment_id, subject_id, subject_name in rows:
            if course_id not in grouped:
                grouped[course_id] = TeacherAssignmentCourseGroupRead(
                    course_id=course_id,
                    course_name=course_name,
                    subjects=[],
                )

            grouped[course_id].subjects.append(
                TeacherAssignmentSubjectRead(
                    assignment_id=assignment_id,
                    subject_id=subject_id,
                    subject_name=subject_name,
                )
            )

        return list(grouped.values())

    # Obtiene asignaciones por curso segun el rol (docente: propias, admin/owner: todas).
    def list_assignment_groups_for_context(
        self,
        school_id: UUID,
        user_id: UUID,
    ) -> list[TeacherAssignmentCourseGroupRead]:
        self._ensure_school_exists(school_id)

        membership = self.school_user.get_by_user_and_school(user_id, school_id)
        if not membership:
            raise HTTPException(status_code=403, detail="No perteneces a esta escuela")

        if membership.role == SchoolRole.TEACHER:
            rows = self.teacher_context.list_teacher_assignment_groups(school_id, membership.id)
        elif membership.role in [SchoolRole.ADMIN, SchoolRole.OWNER]:
            rows = self.teacher_context.list_school_assignment_groups(school_id)
        else:
            raise HTTPException(status_code=403, detail="No tienes permisos para consultar asignaciones")

        grouped: dict[UUID, TeacherAssignmentCourseGroupRead] = {}
        for course_id, course_name, assignment_id, subject_id, subject_name in rows:
            if course_id not in grouped:
                grouped[course_id] = TeacherAssignmentCourseGroupRead(
                    course_id=course_id,
                    course_name=course_name,
                    subjects=[],
                )

            grouped[course_id].subjects.append(
                TeacherAssignmentSubjectRead(
                    assignment_id=assignment_id,
                    subject_id=subject_id,
                    subject_name=subject_name,
                )
            )

        return list(grouped.values())
