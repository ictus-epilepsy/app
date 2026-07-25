import sys
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import tracker, wearables, community

app = FastAPI(title="Seizure Tracker API")

# Adjust allow_origins for production (Vercel URL / custom domain)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tracker.router, prefix="/api/track", tags=["tracker"])
app.include_router(wearables.router, prefix="/api/wearables", tags=["wearables"])
app.include_router(community.router, prefix="/api/community", tags=["community"])


@app.get("/api")
def health_check():
    return {"status": "ok"}
