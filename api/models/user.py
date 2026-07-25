from pydantic import BaseModel, EmailStr


class CurrentUser(BaseModel):
    """Minimal authenticated user information needed by the health API."""

    id: str
    email: EmailStr | None = None