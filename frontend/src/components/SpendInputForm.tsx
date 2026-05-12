import { useMemo, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import type { SpendInput, ToolKey, PlanKey, UseCaseKey, ToolSpendRow } from "../types/spend";
import { clampInt } from "../lib/validation";

const STORAGE_KEY = "ai_spend_audit:spend_input:v1";

const TOOL_OPTIONS: Array<{ value: ToolKey; label: string }> = [
  { value: "chatgpt", label: "ChatGPT" },
  { value: "claude", label: "Claude" },
  { value: "copilot", label: "GitHub Copilot" },
  { value: "gemini", label: "Gemini" },
  { value: "perplexity", label: "Perplexity" },
  { value: "midjourney", label: "Midjourney" },
  { value: "other", label: "Other" },
];

const PLAN_OPTIONS: Array<{ value: PlanKey; label: string }> = [
  { value: "free", label: "Free" },
  { value: "individual", label: "Individual" },
  { value: "team", label: "Team" },
  { value: "enterprise", label: "Enterprise" },
];

const USE_CASE_OPTIONS: Array<{ value: UseCaseKey; label: string }> = [
  { value: "coding", label: "Coding / Dev" },
  { value: "support", label: "Customer Support" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "research", label: "Research" },
  { value: "design", label: "Design" },
  { value: "other", label: "Other" },
];

function newRow(): ToolSpendRow {
  return {
    id: crypto.randomUUID(),
    tool: "chatgpt",
    plan: "individual",
    monthly_spend_usd: 20,
    seats: 1,
  };
}

function defaultInput(): SpendInput {
  return { team_size: 5, use_case: "coding", tools: [newRow()] };
}

type FieldErrors = {
  team_size?: string;
  tools?: Record<string, { monthly_spend_usd?: string; seats?: string }>;
};

export default function SpendInputForm(props: { onSubmit?: (value: SpendInput) => void }) {
  const [draft, setDraft] = useLocalStorageState<SpendInput>(STORAGE_KEY, defaultInput());
  const [touched, setTouched] = useState(false);

  const errors = useMemo<FieldErrors>(() => {
    const e: FieldErrors = {};

    if (draft.team_size < 1 || draft.team_size > 5000) {
      e.team_size = "Team size must be between 1 and 5000.";
    }

    const toolErrors: NonNullable<FieldErrors["tools"]> = {};
    for (const row of draft.tools) {
      const rowErr: { monthly_spend_usd?: string; seats?: string } = {};
      if (row.monthly_spend_usd < 0 || row.monthly_spend_usd > 1_000_000) {
        rowErr.monthly_spend_usd = "Monthly spend must be between 0 and 1,000,000.";
      }
      if (row.seats < 1 || row.seats > 5000) {
        rowErr.seats = "Seats must be between 1 and 5000.";
      }
      if (rowErr.monthly_spend_usd || rowErr.seats) toolErrors[row.id] = rowErr;
    }
    if (Object.keys(toolErrors).length > 0) e.tools = toolErrors;
    return e;
  }, [draft]);

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const totalMonthly = useMemo(() => draft.tools.reduce((sum, r) => sum + (r.monthly_spend_usd || 0), 0), [draft]);

  const onAddTool = () => setDraft({ ...draft, tools: [...draft.tools, newRow()] });

  const onRemoveTool = (id: string) => {
    const nextTools = draft.tools.filter((t) => t.id !== id);
    setDraft({ ...draft, tools: nextTools.length ? nextTools : [newRow()] });
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched(true);
    if (!isValid) return;
    props.onSubmit?.(draft);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-slate-900">Spend inputs</h2>
          <p className="text-sm text-slate-600">
            Add the AI tools your team uses. We’ll audit spend and suggest optimizations.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Team size</label>
            <input
              inputMode="numeric"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 shadow-sm outline-none ring-sky-200 focus:ring-4"
              value={draft.team_size}
              onChange={(e) => setDraft({ ...draft, team_size: clampInt(Number(e.target.value || 0), 0, 5000) })}
              onBlur={() => setTouched(true)}
              placeholder="e.g. 12"
            />
            {touched && errors.team_size ? <p className="mt-1 text-sm text-rose-600">{errors.team_size}</p> : null}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Primary use case</label>
            <select
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 shadow-sm outline-none ring-sky-200 focus:ring-4"
              value={draft.use_case}
              onChange={(e) => setDraft({ ...draft, use_case: e.target.value as UseCaseKey })}
            >
              {USE_CASE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Tools</h3>
            <p className="text-sm text-slate-600">Add one row per tool subscription.</p>
          </div>
          <button
            type="button"
            onClick={onAddTool}
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200"
          >
            Add tool
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {draft.tools.map((row, idx) => {
            const rowErr = touched ? errors.tools?.[row.id] : undefined;

            return (
              <div
                key={row.id}
                className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm font-semibold text-slate-900">Tool #{idx + 1}</div>
                  <button
                    type="button"
                    onClick={() => onRemoveTool(row.id)}
                    className="text-sm font-semibold text-slate-500 hover:text-slate-700"
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
                  <div className="md:col-span-1">
                    <label className="text-sm font-medium text-slate-700">Tool</label>
                    <select
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-900 shadow-sm outline-none ring-sky-200 focus:ring-4"
                      value={row.tool}
                      onChange={(e) => {
                        const tool = e.target.value as ToolKey;
                        setDraft({
                          ...draft,
                          tools: draft.tools.map((t) => (t.id === row.id ? { ...t, tool } : t)),
                        });
                      }}
                    >
                      {TOOL_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-medium text-slate-700">Plan</label>
                    <select
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-900 shadow-sm outline-none ring-sky-200 focus:ring-4"
                      value={row.plan}
                      onChange={(e) => {
                        const plan = e.target.value as PlanKey;
                        setDraft({
                          ...draft,
                          tools: draft.tools.map((t) => (t.id === row.id ? { ...t, plan } : t)),
                        });
                      }}
                    >
                      {PLAN_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-medium text-slate-700">Monthly spend (USD)</label>
                    <input
                      inputMode="decimal"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-900 shadow-sm outline-none ring-sky-200 focus:ring-4"
                      value={String(row.monthly_spend_usd)}
                      onChange={(e) => {
                        const monthly_spend_usd = Number(e.target.value || 0);
                        setDraft({
                          ...draft,
                          tools: draft.tools.map((t) => (t.id === row.id ? { ...t, monthly_spend_usd } : t)),
                        });
                      }}
                      onBlur={() => setTouched(true)}
                      placeholder="e.g. 60"
                    />
                    {rowErr?.monthly_spend_usd ? (
                      <p className="mt-1 text-sm text-rose-600">{rowErr.monthly_spend_usd}</p>
                    ) : null}
                  </div>

                  <div className="md:col-span-1">
                    <label className="text-sm font-medium text-slate-700">Seats</label>
                    <input
                      inputMode="numeric"
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-slate-900 shadow-sm outline-none ring-sky-200 focus:ring-4"
                      value={String(row.seats)}
                      onChange={(e) => {
                        const seats = clampInt(Number(e.target.value || 0), 0, 5000);
                        setDraft({
                          ...draft,
                          tools: draft.tools.map((t) => (t.id === row.id ? { ...t, seats } : t)),
                        });
                      }}
                      onBlur={() => setTouched(true)}
                      placeholder="e.g. 3"
                    />
                    {rowErr?.seats ? <p className="mt-1 text-sm text-rose-600">{rowErr.seats}</p> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="text-sm text-slate-700">
            Total current monthly spend:{" "}
            <span className="font-semibold text-slate-900">${Math.round(totalMonthly * 100) / 100}</span>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-sky-200 sm:w-auto"
          >
            Run audit
          </button>
        </div>

        {!isValid && touched ? (
          <p className="mt-3 text-sm text-rose-600">Fix the errors above to continue.</p>
        ) : null}
      </div>
    </form>
  );
}

