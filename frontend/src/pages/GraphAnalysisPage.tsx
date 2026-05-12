import AnalysisCharts from "../components/results/AnalysisCharts";
import { useLastAudit } from "../lib/store";

export default function GraphAnalysisPage() {
  const [lastAudit] = useLastAudit();
  if (!lastAudit) return <div className="text-sm text-slate-600">Run an audit first.</div>;
  return (
    <div className="space-y-6">
      <AnalysisCharts result={lastAudit} />
    </div>
  );
}

