from sqlmodel import Session, func, select

from app.modules.attendance.models import AttendanceStatus

DEFAULT_ATTENDANCE_STATUSES = ["Presente", "Licencia", "Falta"]


def seed_attendance_statuses(db: Session) -> None:
    for status_name in DEFAULT_ATTENDANCE_STATUSES:
        query = select(AttendanceStatus).where(
            func.lower(func.trim(AttendanceStatus.name)) == status_name.lower(),
            AttendanceStatus.state == True,
        )
        existing = db.exec(query).first()
        if existing:
            continue
        db.add(AttendanceStatus(name=status_name))

    db.commit()
