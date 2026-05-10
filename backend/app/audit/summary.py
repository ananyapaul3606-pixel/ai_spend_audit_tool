from __future__ import annotations

import json

from app.audit.schemas import AuditResponse
from app.services.nvidia_llm import NvidiaLLMError, nvidia_chat_completion


def _fallback_summary(audit: AuditResponse) -> str:
    savings = audit.total_monthly_savings_usd
    current = audit.total_current_monthly_spend_usd
    annual = audit.total_annual_savings_usd

    if savings < 100:
        headline = "Your AI spend looks reasonably optimized."
    elif savings < 500:
        headline = "You have meaningful near-term savings available."
    else:
        headline = "You have a large savings opportunity."

    # Pick top 2 by savings.
    top = sorted(audit.recommendations, key=lambda r: r.monthly_savings_usd, reverse=True)[:2]
    top_bits = []
    for r in top:
        if r.monthly_savings_usd <= 0:
            continue
        rec = []
        if r.recommended_plan:
            rec.append(f"switch to {r.recommended_plan}")
        if r.recommended_tool:
            rec.append(f"consider {r.recommended_tool}")
        rec_txt = ", ".join(rec) if rec else "review plan fit"
        top_bits.append(f"{r.tool}: {rec_txt} (save ~${r.monthly_savings_usd}/mo)")

    top_line = " Top opportunities: " + "; ".join(top_bits) + "." if top_bits else ""

    return (
        f"{headline} You're currently spending about ${current}/month. "
        f"Estimated savings are ${savings}/month (${annual}/year)."
        f"{top_line} Next step: confirm seat counts and remove overlapping subscriptions."
    )


def generate_ai_summary(audit: AuditResponse) -> tuple[str, str]:
    """
    Returns (summary, source) where source is 'nvidia' or 'fallback'.
    """
    prompt = (
        "You are generating a short product report for a SaaS called \"AI Spend Audit Tool\".\n\n"
        "Write ~100 words summarizing:\n"
        "1) Current spend vs estimated savings\n"
        "2) Biggest optimization opportunities (top 2)\n"
        "3) One practical next step for the team\n\n"
        "Return plain text only (no markdown).\n\n"
        f"Audit JSON:\n{json.dumps(audit.model_dump(), ensure_ascii=False)}"
    )

    try:
        text = nvidia_chat_completion(prompt)
        if not text:
            raise NvidiaLLMError("Empty response")
        return text, "nvidia"
    except NvidiaLLMError:
        return _fallback_summary(audit), "fallback"

