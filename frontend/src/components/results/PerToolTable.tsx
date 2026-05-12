import type { AuditResponse } from "../../lib/api";

function money(n: number) {
  return `$${Math.round(n * 100) / 100}`;
}

export default function PerToolTable(props: { result: AuditResponse }) {
  const result = props.result;
  return (
    <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
      <h3 className="text-base font-semibold text-slate-900">Per-tool breakdown</h3>
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/70">
        <div className="grid grid-cols-12 gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 text-xs font-semibold text-slate-600">
          <div className="col-span-3">Tool</div>
          <div className="col-span-2">Plan</div>
          <div className="col-span-2 text-right">Current</div>
          <div className="col-span-2 text-right">Savings</div>
          <div className="col-span-3">Recommendation</div>
        </div>

        {result.recommendations.map((r, i) => (
          <div key={`${r.tool}-${i}`} className="grid grid-cols-12 gap-3 px-4 py-3 text-sm text-slate-800">
            <div className="col-span-3 font-semibold text-slate-900">{r.tool}</div>
            <div className="col-span-2">{r.current_plan}</div>
            <div className="col-span-2 text-right">{money(r.current_monthly_spend_usd)}</div>
            <div className="col-span-2 text-right">
              <span className={r.monthly_savings_usd >= 500 ? "font-semibold text-sky-700" : ""}>
                {money(r.monthly_savings_usd)}
              </span>
            </div>
            <div className="col-span-3">
              {r.recommended_plan ? (
                <div className="text-sm">
                  <span className="font-semibold">Plan:</span> {r.recommended_plan}
                </div>
              ) : null}
              {r.recommended_tool ? (
                <div className="text-sm">
                  <span className="font-semibold">Alt:</span> {r.recommended_tool}
                </div>
              ) : null}
              {!r.recommended_plan && !r.recommended_tool ? <div className="text-sm text-slate-600">—</div> : null}
            </div>
            <div className="col-span-12 -mt-1 text-xs text-slate-600">{r.reason}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

