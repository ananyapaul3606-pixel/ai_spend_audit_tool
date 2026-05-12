import LeadCaptureForm from "../components/LeadCaptureForm";
import { useLastAudit } from "../lib/store";

export default function GetReportPage() {
  const [lastAudit] = useLastAudit();
  if (!lastAudit) return <div className="text-sm text-slate-600">Run an audit first.</div>;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Get the report</h1>
        <p className="mt-1 text-sm text-slate-600">Enter your email to receive a copy and optional next-step guidance.</p>
        <div className="mt-4">
          <LeadCaptureForm auditPublicId={lastAudit.audit_public_id ?? null} />
        </div>
      </div>
    </div>
  );
}

