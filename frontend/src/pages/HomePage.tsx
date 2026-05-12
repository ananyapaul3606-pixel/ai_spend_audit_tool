import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-8 shadow-sm backdrop-blur">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Production-ready SaaS MVP
        </div>

        <div className="mt-4 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              Cut AI spend with a transparent audit — not guesswork
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Add your ChatGPT, Claude, Copilot and other tool subscriptions.
              We’ll calculate spend, detect overlap, suggest cheaper plans, and
              generate a shareable report for decision makers.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/audit"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-sky-200"
              >
                Start an audit
              </Link>

              <a
                href="/analysis"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-white focus:outline-none focus:ring-4 focus:ring-sky-200"
              >
                See analysis
              </a>
            </div>

            <div className="mt-5 text-xs text-slate-500">
              Deterministic savings engine + optional AI summary (with
              fallback).
            </div>
          </div>

          <div className="rounded-3xl border border-sky-100/70 bg-gradient-to-br from-white/70 to-sky-50/70 p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="text-xs font-semibold text-slate-500">
                  Spend visibility
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  Per-tool breakdown
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-2/3 rounded-full bg-sky-500/80" />
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="text-xs font-semibold text-slate-500">
                  Savings
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  $ / month
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-1/2 rounded-full bg-emerald-500/80" />
                </div>
              </div>
              <div className="col-span-2 rounded-2xl border border-slate-200 bg-white/70 p-4">
                <div className="text-xs font-semibold text-slate-500">
                  Automation feel
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-900">
                    Audit → Insights → Share
                  </div>
                  <div className="h-2 w-2 animate-ping rounded-full bg-sky-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold text-slate-900">
            Rule-based engine
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Explainable recommendations using configurable pricing data.
          </p>
        </div>
        <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold text-slate-900">
            Graph analysis
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Recharts visuals to communicate spend and savings quickly.
          </p>
        </div>
        <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold text-slate-900">
            Shareable reports
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Public link shows only audit output; no personal data.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              How it works
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              A simple workflow designed for busy teams.
            </p>
          </div>
          <a
            href="/audit"
            className="text-sm font-semibold text-sky-700 hover:text-sky-800"
          >
            Run it now →
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
          {[
            { title: "1. Input", desc: "Tools, plans, seats, spend." },
            {
              title: "2. Audit",
              desc: "Rules compute savings & optimizations.",
            },
            { title: "3. Visualize", desc: "Charts + per-tool rationale." },
            { title: "4. Share", desc: "Public report link for stakeholders." },
          ].map((s, idx) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-slate-200 bg-white/70 p-4"
            >
              <div className="text-sm font-semibold text-slate-900">
                {s.title}
              </div>
              <div className="mt-1 text-sm text-slate-600">{s.desc}</div>
              {idx < 3 ? (
                <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 lg:block">
                  <div className="h-10 w-10 animate-bounce rounded-full border border-sky-100 bg-white/70 shadow-sm backdrop-blur grid place-items-center text-sky-700">
                    →
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
