from fastapi import APIRouter

from app.api.routes.health import router as health_router
from app.api.routes.audit import router as audit_router
from app.api.routes.leads import router as leads_router
from app.api.routes.report import router as report_router
from app.api.routes.share import router as share_router

api_router = APIRouter()
api_router.include_router(health_router, tags=["health"])
api_router.include_router(audit_router, tags=["audit"])
api_router.include_router(report_router, tags=["report"])
api_router.include_router(leads_router, tags=["leads"])
api_router.include_router(share_router, tags=["share"])
