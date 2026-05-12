import PerToolTable from "../components/results/PerToolTable";
import { useLastAudit } from "../lib/store";

export default function PerToolBreakdownPage() {
  const [lastAudit] = useLastAudit();
  if (!lastAudit) return <div className="text-sm text-slate-600">Run an audit first.</div>;
  return (
    <div className="space-y-6">
      <PerToolTable result={lastAudit} />
    </div>
  );
}

