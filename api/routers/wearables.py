from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

router = APIRouter()


class WearableSample(BaseModel):
    user_id: str
    device: str  # e.g. "apple_watch", "fitbit", "empatica"
    recorded_at: datetime
    heart_rate: Optional[float] = None
    sleep_hours: Optional[float] = None
    stress_score: Optional[float] = None


@router.get("/")
def list_samples(user_id: str):
    # TODO: query Supabase for this user's wearable data
    return {"user_id": user_id, "samples": []}


@router.post("/sync")
def sync_samples(samples: list[WearableSample]):
    # TODO: batch insert into Supabase
    return {"status": "synced", "count": len(samples)}
