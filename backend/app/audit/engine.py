from __future__ import annotations

from dataclasses import dataclass

from app.audit.pricing_loader import PricingData
from app.audit.schemas import AuditRequest, AuditResponse, ToolRecommendation
from app.audit.summary import generate_ai_summary


@dataclass(frozen=True)
class RuleResult:
    expected_monthly_spend_usd: float | None
    recommended_plan: str | None
    recommended_tool: str | None
    reason: str


def run_audit(req: AuditRequest, pricing: PricingData) -> AuditResponse:
    recs: list[ToolRecommendation] = []

    total_current = 0.0
    total_savings = 0.0
    total_recommended: float | None = 0.0

    for row in req.tools:
        total_current += float(row.monthly_spend_usd)

        tool_pricing = pricing.tools.get(row.tool)
        rule = _apply_rules(req, row.tool, row.plan, row.monthly_spend_usd, row.seats, tool_pricing, pricing)

        if rule.expected_monthly_spend_usd is None:
            # We can't price it; be conservative and avoid claiming savings.
            expected = None
            savings = 0.0
            recommended_monthly_component: float | None = None
        else:
            expected = float(rule.expected_monthly_spend_usd)
            savings = max(0.0, float(row.monthly_spend_usd) - expected)
            recommended_monthly_component = expected

        total_savings += savings
        if total_recommended is not None:
            if recommended_monthly_component is None:
                total_recommended = None
            else:
                total_recommended += recommended_monthly_component

        recs.append(
            ToolRecommendation(
                tool=row.tool,
                current_plan=row.plan,
                current_monthly_spend_usd=float(row.monthly_spend_usd),
                expected_monthly_spend_usd=expected,
                recommended_plan=rule.recommended_plan,
                recommended_tool=rule.recommended_tool,
                reason=rule.reason,
                monthly_savings_usd=round(savings, 2),
                annual_savings_usd=round(savings * 12.0, 2),
            )
        )

    total_savings = round(total_savings, 2)
    annual_savings = round(total_savings * 12.0, 2)
    big_savings = total_savings >= 500.0

    audit = AuditResponse(
        currency=pricing.currency,
        total_current_monthly_spend_usd=round(total_current, 2),
        total_recommended_monthly_spend_usd=(None if total_recommended is None else round(total_recommended, 2)),
        total_monthly_savings_usd=total_savings,
        total_annual_savings_usd=annual_savings,
        big_savings=big_savings,
        recommendations=recs,
    )

    summary, source = generate_ai_summary(audit)
    audit.ai_summary = summary
    audit.ai_summary_source = source
    return audit


def _apply_rules(
    req: AuditRequest,
    tool: str,
    plan: str,
    current_monthly: float,
    seats: int,
    tool_pricing,
    pricing: PricingData,
) -> RuleResult:
    # Price helpers (if available).
    def plan_price(plan_key: str) -> float | None:
        if tool_pricing is None:
            return None
        p = tool_pricing.plans.get(plan_key)
        if not p or p.price_usd_per_seat_month is None:
            return None
        return float(p.price_usd_per_seat_month)

    def expected_cost(plan_key: str) -> float | None:
        price = plan_price(plan_key)
        if price is None:
            return None
        return price * seats

    expected_current = expected_cost(plan)

    # Rule 2: If current monthly is meaningfully above expected, call it overspending.
    if expected_current is not None and current_monthly > expected_current * 1.15:
        return RuleResult(
            expected_monthly_spend_usd=expected_current,
            recommended_plan=plan,
            recommended_tool=None,
            reason="Your entered spend is higher than the expected price for this plan and seat count. Verify billing/add-ons.",
        )

    # Rule 3: Pick cheapest known plan for this tool (same seats).
    if tool_pricing is not None:
        known_plans = ["free", "individual", "team", "enterprise"]
        candidates: list[tuple[str, float]] = []
        for p in known_plans:
            cost = expected_cost(p)
            if cost is not None:
                candidates.append((p, cost))
        if candidates:
            cheapest_plan, cheapest_cost = min(candidates, key=lambda x: x[1])
            current_expected = expected_current
            # Only recommend a change if it is materially cheaper and doesn't force "free" when spend exists.
            if cheapest_plan != plan:
                if current_expected is not None and cheapest_cost <= current_expected * 0.95:
                    return RuleResult(
                        expected_monthly_spend_usd=cheapest_cost,
                        recommended_plan=cheapest_plan,
                        recommended_tool=None,
                        reason="A lower-cost plan exists for your seat count based on configured pricing.",
                    )

    # Rule 4: Use-case-based alternative suggestions (no pricing claims if unknown).
    if req.use_case == "coding" and tool == "chatgpt":
        # If Copilot is present, often ChatGPT for coding can be reduced; we don't claim savings without pricing.
        return RuleResult(
            expected_monthly_spend_usd=expected_current,
            recommended_plan=None,
            recommended_tool="copilot",
            reason="For coding-heavy teams, Copilot may cover a large share of use cases. Consider consolidating to reduce overlap.",
        )

    # Default: no change.
    return RuleResult(
        expected_monthly_spend_usd=expected_current,
        recommended_plan=None,
        recommended_tool=None,
        reason="No clear optimization found from current rules.",
    )
