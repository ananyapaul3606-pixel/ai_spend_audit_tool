from __future__ import annotations

from pydantic import BaseModel, Field


class ToolSpendIn(BaseModel):
    tool: str = Field(..., description="Tool key (e.g. chatgpt, claude, copilot)")
    plan: str = Field(..., description="Plan key (free, individual, team, enterprise)")
    monthly_spend_usd: float = Field(..., ge=0, le=1_000_000)
    seats: int = Field(..., ge=1, le=5000)


class AuditRequest(BaseModel):
    team_size: int = Field(..., ge=1, le=5000)
    use_case: str = Field(..., description="Primary use case (coding, support, marketing, etc.)")
    tools: list[ToolSpendIn] = Field(..., min_length=1)


class ToolRecommendation(BaseModel):
    tool: str
    current_plan: str
    current_monthly_spend_usd: float
    expected_monthly_spend_usd: float | None = None
    recommended_plan: str | None = None
    recommended_tool: str | None = None
    reason: str
    monthly_savings_usd: float
    annual_savings_usd: float


class AuditResponse(BaseModel):
    currency: str = "USD"
    audit_public_id: str | None = None
    total_current_monthly_spend_usd: float
    total_recommended_monthly_spend_usd: float | None = None
    total_monthly_savings_usd: float
    total_annual_savings_usd: float
    big_savings: bool
    ai_summary: str | None = None
    ai_summary_source: str | None = None
    recommendations: list[ToolRecommendation]
