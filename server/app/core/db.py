import os
from typing import Iterator

from sqlmodel import Session, SQLModel, create_engine

from app.core.config import settings
from app.modules.attendance.models import AttendanceRecord, AttendanceSession, AttendanceStatus  # noqa: F401
from app.modules.attendance.seed import seed_attendance_statuses
from app.modules.evaluations.models import (  # noqa: F401
    Evaluation,
    EvaluationGrade,
    EvaluationType,
    TermSubjectAverage,
)
from app.modules.evaluations.seed import seed_evaluation_types
from app.modules.schools.seed import seed_levels
from app.modules.subscriptions.models import (  # noqa: F401
    Plan,
    SchoolSubscription,
    SubscriptionPayment,
)
from app.modules.subscriptions.seed import seed_subscription_plans

# prod
# raw_url = os.environ["DATABASE_URL"]
# url = raw_url
# if url.startswith("postgres//"):
#     url = "postgresql+psycopg://" + url[len("postgres://") :]
# elif url.startswith("postgresql://") and "+psycopg" not in url:
#     url = "postgresql+psycopg://" + url[len("postgresql://") :]
# engine = create_engine(url, pool_pre_ping=True)


# DEV
engine = create_engine(
    settings.DATABASE_URL,
    echo=False,
    connect_args={"check_same_thread": False}
    if "sqlite" in settings.DATABASE_URL
    else {},
)


def init_db() -> None:
    if settings.ENVIRONMENT == "DEV":
        SQLModel.metadata.create_all(engine)  # dev
        with Session(engine) as session:
            seed_levels(session)
            seed_evaluation_types(session)
            seed_attendance_statuses(session)
            seed_subscription_plans(session)


def get_session() -> Iterator[Session]:
    with Session(engine) as session:
        yield session
