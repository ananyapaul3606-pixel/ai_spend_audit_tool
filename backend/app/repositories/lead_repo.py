from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.lead import Lead


def create_lead(
    db: Session,
    *,
    email: str,
    company: str | None,
    role: str | None,
    team_size: int | None,
    audit_id: int | None,
) -> Lead:
    lead = Lead(email=email, company=company, role=role, team_size=team_size, audit_id=audit_id)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead

