import type { AuditResponse } from "../../lib/api";

function money(n: number) {
  return `$${Math.round(n * 100) / 100}`;
}

export default function SummaryCards(props: { result: AuditResponse }) {
  const r = props.result;
  const showCredexCta = r.total_monthly_savings_usd >= 500;
  const showGoodSpend = r.total_monthly_savings_usd < 100;

  return (
    <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Audit result</h2>
          <p className="text-sm text-slate-600">Totals and high-level savings estimate.</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
          <div className="text-xs font-semibold text-slate-500">Current spend (monthly)</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">{money(r.total_current_monthly_spend_usd)}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
          <div className="text-xs font-semibold text-slate-500">Estimated savings (monthly)</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">{money(r.total_monthly_savings_usd)}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
          <div className="text-xs font-semibold text-slate-500">Estimated savings (annual)</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">{money(r.total_annual_savings_usd)}</div>
        </div>
      </div>

      {showCredexCta ? (
        <div className="mt-5 rounded-2xl border border-sky-200 bg-sky-50/80 p-4">
          <div className="text-sm font-semibold text-slate-900">Big savings opportunity</div>
          <p className="mt-1 text-sm text-slate-700">
            You could save <span className="font-semibold">{money(r.total_monthly_savings_usd)}</span>/month. Add a
            “Credex” CTA here (demo / calendly) for high-intent users.
          </p>
        </div>
      ) : null}

      {showGoodSpend ? (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
          <div className="text-sm font-semibold text-slate-900">You’re spending well</div>
          <p className="mt-1 text-sm text-slate-700">Savings are under {money(100)} per month — your setup looks reasonably optimized.</p>
        </div>
      ) : null}
    </div>
  );
}

