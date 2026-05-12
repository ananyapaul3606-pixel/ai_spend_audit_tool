import AISummaryCard from "../components/results/AISummaryCard";
import { useLastAudit } from "../lib/store";

export default function AISummaryPage() {
  const [lastAudit] = useLastAudit();
  if (!lastAudit) return <div className="text-sm text-slate-600">Run an audit first.</div>;
  return (
    <div className="space-y-6">
      <AISummaryCard result={lastAudit} />
    </div>
  );
}

