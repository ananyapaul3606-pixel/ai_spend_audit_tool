from __future__ import annotations

from fastapi import APIRouter

from app.db.session import engine

router = APIRouter()


@router.get("/health")
def health() -> dict:
    # DB ping to catch Railway/Postgres misconfig early.
    with engine.connect() as conn:
        conn.exec_driver_sql("SELECT 1")
    return {"status": "ok"}

