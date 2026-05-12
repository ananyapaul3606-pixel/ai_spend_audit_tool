import type { SpendInput } from "../types/spend";

export type AuditRecommendation = {
  tool: string;
  current_plan: string;
  current_monthly_spend_usd: number;
  expected_monthly_spend_usd: number | null;
  recommended_plan: string | null;
  recommended_tool: string | null;
  reason: string;
  monthly_savings_usd: number;
  annual_savings_usd: number;
};

export type AuditResponse = {
  currency: string;
  audit_public_id: string | null;
  total_current_monthly_spend_usd: number;
  total_recommended_monthly_spend_usd: number | null;
  total_monthly_savings_usd: number;
  total_annual_savings_usd: number;
  big_savings: boolean;
  ai_summary: string | null;
  ai_summary_source: string | null;
  recommendations: AuditRecommendation[];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function runAudit(input: SpendInput): Promise<AuditResponse> {
  const res = await fetch(`${API_BASE_URL}/audit`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      team_size: input.team_size,
      use_case: input.use_case,
      tools: input.tools.map((t) => ({
        tool: t.tool,
        plan: t.plan,
        monthly_spend_usd: t.monthly_spend_usd,
        seats: t.seats,
      })),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Audit failed (HTTP ${res.status}) ${text}`.trim());
  }

  return (await res.json()) as AuditResponse;
}
