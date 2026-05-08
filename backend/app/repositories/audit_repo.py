from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.audit import Audit


def create_audit(db: Session, input_data: dict, result_data: dict | None) -> Audit:
    audit = Audit(input_data=input_data, result_data=result_data)
    db.add(audit)
    db.commit()
    db.refresh(audit)
    return audit

