from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.audit import Audit


def get_audit_by_public_id(db: Session, public_id: str) -> Audit | None:
    return db.execute(select(Audit).where(Audit.public_id == public_id)).scalar_one_or_none()

