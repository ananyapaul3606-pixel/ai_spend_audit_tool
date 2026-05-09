from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.audit import Audit
from app.repositories.lead_repo import create_lead
from app.security.rate_limit import TokenBucketRateLimiter
from app.services.emailer import send_confirmation_email

router = APIRouter()

# 3 submissions / minute / IP (burst 3)
_limiter = TokenBucketRateLimiter(capacity=3, refill_per_sec=3 / 60)


class LeadCreateRequest(BaseModel):
    # Keep validation dependency-free (EmailStr requires `email-validator`).
    email: str = Field(..., min_length=3, max_length=320, pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    company: str | None = Field(default=None, max_length=200)
    role: str | None = Field(default=None, max_length=200)
    team_size: int | None = Field(default=None, ge=1, le=5000)
    audit_public_id: str | None = Field(default=None, description="Optional audit id returned by /audit")


class LeadCreateResponse(BaseModel):
    status: str = "ok"


@router.post("/leads", response_model=LeadCreateResponse)
def create_lead_endpoint(req: LeadCreateRequest, request: Request, db: Session = Depends(get_db)) -> LeadCreateResponse:
    ip = request.client.host if request.client else "unknown"
    if not _limiter.allow(ip):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again soon.")

    audit_id: int | None = None
    if req.audit_public_id:
        audit = db.execute(select(Audit).where(Audit.public_id == req.audit_public_id)).scalar_one_or_none()
        audit_id = None if audit is None else audit.id

    create_lead(
        db,
        email=str(req.email),
        company=req.company,
        role=req.role,
        team_size=req.team_size,
        audit_id=audit_id,
    )
    # Non-blocking for product flow: failures shouldn't block lead capture.
    try:
        send_confirmation_email(to_email=str(req.email))
    except Exception:
        pass
    return LeadCreateResponse()
