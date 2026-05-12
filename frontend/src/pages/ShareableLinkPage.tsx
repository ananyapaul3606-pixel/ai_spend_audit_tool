import ShareLinkCard from "../components/results/ShareLinkCard";
import { useLastAudit } from "../lib/store";

export default function ShareableLinkPage() {
  const [lastAudit] = useLastAudit();
  if (!lastAudit) return <div className="text-sm text-slate-600">Run an audit first.</div>;
  return (
    <div className="space-y-6">
      <ShareLinkCard auditPublicId={lastAudit.audit_public_id ?? null} />
    </div>
  );
}

