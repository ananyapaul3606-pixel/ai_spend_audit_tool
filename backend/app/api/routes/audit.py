from __future__ import annotations

from pathlib import Path

from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.audit.engine import run_audit
from app.audit.pricing_loader import load_pricing_from_repo_root
from app.audit.schemas import AuditRequest, AuditResponse
from app.api.deps import get_db
from app.repositories.audit_repo import create_audit
from fastapi import Depends

router = APIRouter()


@router.post("/audit", response_model=AuditResponse)
def audit(req: AuditRequest, db: Session = Depends(get_db)) -> AuditResponse:
    repo_root = Path(__file__).resolve().parents[3]
    pricing = load_pricing_from_repo_root(repo_root)
    result = run_audit(req, pricing)

    # Persist for Step 6/7 flows.
    audit_row = create_audit(db, input_data=req.model_dump(), result_data=result.model_dump())
    result.audit_public_id = audit_row.public_id
    return result
