from uuid import UUID

from fastapi import APIRouter

from app.dependencies.auth import CurrentUser, DBSession
from app.modules.subscriptions.schemas import CurrentSubscriptionRead
from app.modules.subscriptions.services import SubscriptionService

router = APIRouter(prefix="/subscriptions", tags=["Suscripciones"])


@router.get("/schools/{school_id}/current", response_model=CurrentSubscriptionRead)
def get_current_subscription(school_id: UUID, db: DBSession, user: CurrentUser):
    return SubscriptionService(db).get_current_subscription(school_id, user.id)
