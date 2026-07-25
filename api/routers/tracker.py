from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

router = APIRouter()


class SeizureLog(BaseModel):
    user_id: str
    occurred_at: datetime
    duration_seconds: Optional[int] = None
    seizure_type: Optional[str] = None
    triggers: Optional[list[str]] = None
    notes: Optional[str] = None


@router.get("/")
def list_logs(user_id: str):
    # TODO: query Supabase for this user's seizure logs
    return {"user_id": user_id, "logs": []}


@router.post("/")
def create_log(log: SeizureLog):
    # TODO: insert into Supabase
    return {"status": "created", "log": log}
