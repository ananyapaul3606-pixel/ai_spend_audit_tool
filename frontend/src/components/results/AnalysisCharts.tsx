import type { AuditResponse } from "../../lib/api";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AnalysisCharts(props: { result: AuditResponse }) {
  const byTool = props.result.recommendations.map((r) => ({
    tool: r.tool,
    current: r.current_monthly_spend_usd,
    savings: r.monthly_savings_usd,
  }));

  return (
    <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
      <div>
        <h3 className="text-base font-semibold text-slate-900">Graph analysis</h3>
        <p className="text-sm text-slate-600">A quick visual breakdown of spend and savings.</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
          <div className="text-sm font-semibold text-slate-900">Monthly savings by tool</div>
          <div className="mt-3 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byTool} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="tool" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="savings" name="Savings ($/mo)" fill="#0284c7" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/70 p-4">
          <div className="text-sm font-semibold text-slate-900">Current spend mix</div>
          <div className="mt-3 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={byTool}
                  dataKey="current"
                  nameKey="tool"
                  outerRadius={90}
                  fill="#38bdf8"
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

