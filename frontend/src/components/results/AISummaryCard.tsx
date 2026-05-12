import type { AuditResponse } from "../../lib/api";

export default function AISummaryCard(props: { result: AuditResponse }) {
  const r = props.result;
  return (
    <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">AI summary</h3>
          <p className="text-sm text-slate-600">
            {r.ai_summary_source === "nvidia" ? "Generated using NVIDIA." : "Fallback summary (AI unavailable)."}
          </p>
        </div>
        <div className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
          {r.ai_summary_source ?? "unknown"}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-800">
        {r.ai_summary ?? "No summary available."}
      </div>
    </div>
  );
}

