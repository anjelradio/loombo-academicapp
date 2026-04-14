from enum import Enum


class SchoolUsersFilterRole(str, Enum):
    ADMIN = "admin"
    TEACHER = "teacher"
