from __future__ import annotations

from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.repositories.report_repo import get_audit_by_public_id

router = APIRouter()


class PublicReportResponse(BaseModel):
    audit_public_id: str
    created_at: datetime
    result: dict


@router.get("/report/{public_id}", response_model=PublicReportResponse)
def get_public_report(public_id: str, db: Session = Depends(get_db)) -> PublicReportResponse:
    audit = get_audit_by_public_id(db, public_id)
    if audit is None or audit.result_data is None:
        raise HTTPException(status_code=404, detail="Report not found")

    # IMPORTANT: no emails/personal info are stored on audits; we only return computed result.
    return PublicReportResponse(
        audit_public_id=audit.public_id,
        created_at=audit.created_at,
        result=audit.result_data,
    )

