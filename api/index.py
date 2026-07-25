from typing import Annotated

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.config import Settings, get_settings
from api.dependencies import get_current_user
from api.models.user import CurrentUser


settings: Settings = get_settings()

app = FastAPI(
    title="Seizure Tracker API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health_check() -> dict[str, str]:
    """Confirm that the backend is running."""
    return {"status": "ok"}


@app.get("/api/me")
async def read_current_user(
    current_user: Annotated[CurrentUser, Depends(get_current_user)],
) -> CurrentUser:
    """Return the currently authenticated user."""
    return current_user
