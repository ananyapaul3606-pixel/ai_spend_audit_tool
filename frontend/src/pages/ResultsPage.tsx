import { Link } from "react-router-dom";
import Skeleton from "../components/Skeleton";
import AISummaryCard from "../components/results/AISummaryCard";
import ShareLinkCard from "../components/results/ShareLinkCard";
import SummaryCards from "../components/results/SummaryCards";
import { useLastAudit } from "../lib/store";

export default function ResultsPage() {
  const [lastAudit] = useLastAudit();
 console.log("lastAudit", lastAudit);
  if (!lastAudit) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
          <div className="text-sm font-semibold text-slate-900">No audit yet</div>
          <p className="mt-1 text-sm text-slate-600">Run an audit first to see results.</p>
          <Link
            to="/audit"
            className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
          >
            Go to audit
          </Link>
        </div>
        <Skeleton className="h-24" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SummaryCards result={lastAudit} />
      <ShareLinkCard auditPublicId={lastAudit.audit_public_id ?? null} />
      <AISummaryCard result={lastAudit} />
      <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 text-sm text-slate-700 shadow-sm backdrop-blur">
        Next: open <span className="font-semibold">Graph analysis</span> or <span className="font-semibold">Per-tool breakdown</span> from the sidebar.
      </div>
    </div>
  );
}

