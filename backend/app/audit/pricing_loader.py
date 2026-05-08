from __future__ import annotations

import json
import re
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class PricingPlan:
    price_usd_per_seat_month: float | None


@dataclass(frozen=True)
class ToolPricing:
    key: str
    label: str
    official_url: str | None
    plans: dict[str, PricingPlan]


@dataclass(frozen=True)
class PricingData:
    currency: str
    tools: dict[str, ToolPricing]


_JSON_FENCE_RE = re.compile(r"```json\s*(\{.*?\})\s*```", re.DOTALL)


def load_pricing_from_repo_root(repo_root: Path) -> PricingData:
    pricing_path = repo_root / "PRICING_DATA.md"
    raw = pricing_path.read_text(encoding="utf-8")
    match = _JSON_FENCE_RE.search(raw)
    if not match:
        raise RuntimeError("PRICING_DATA.md is missing a ```json fenced block.")

    payload = json.loads(match.group(1))
    return _parse_pricing(payload)


def _parse_pricing(payload: dict[str, Any]) -> PricingData:
    currency = str(payload.get("currency", "USD"))
    tools_payload = payload.get("tools", {})
    tools: dict[str, ToolPricing] = {}

    for tool_key, tool_obj in tools_payload.items():
        label = str(tool_obj.get("label", tool_key))
        official_url = tool_obj.get("official_url")
        plans_obj = tool_obj.get("plans", {})

        plans: dict[str, PricingPlan] = {}
        for plan_key, plan_obj in plans_obj.items():
            price = plan_obj.get("price_usd_per_seat_month")
            plans[str(plan_key)] = PricingPlan(price_usd_per_seat_month=(None if price is None else float(price)))

        tools[str(tool_key)] = ToolPricing(
            key=str(tool_key),
            label=label,
            official_url=(None if official_url in (None, "") else str(official_url)),
            plans=plans,
        )

    return PricingData(currency=currency, tools=tools)

