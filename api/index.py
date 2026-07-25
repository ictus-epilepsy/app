<<<<<<< HEAD
import sys
import os


app = FastAPI(
    title="Seizure Tracker API",
    version="0.1.0",
)
    return {"status": "ok"}
=======
@app.get("/api/health")
async def health_check() -> dict[str, str]:
    """Check whether the backend is running."""
app = FastAPI(
    title="Seizure Tracker API",
    version="0.1.0",
)


@app.get("/api/health")
async def health_check() -> dict[str, str]:
    """Check whether the backend is running."""
    return {"status": "ok"}
>>>>>>> 2badbe3 (V1)
