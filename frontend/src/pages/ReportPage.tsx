import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { AuditResponse } from "../lib/api";
import Spinner from "../components/Spinner";
import Skeleton from "../components/Skeleton";
import SummaryCards from "../components/results/SummaryCards";
import ShareLinkCard from "../components/results/ShareLinkCard";
import AISummaryCard from "../components/results/AISummaryCard";
import AnalysisCharts from "../components/results/AnalysisCharts";
import PerToolTable from "../components/results/PerToolTable";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

type PublicReportResponse = {
  audit_public_id: string;
  created_at: string;
  result: AuditResponse;
};

export default function ReportPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResponse | null>(null);

  const safeId = useMemo(() => (id ?? "").trim(), [id]);

  useEffect(() => {
    const run = async () => {
      if (!safeId) {
        setError("Missing report id");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE_URL}/report/${encodeURIComponent(safeId)}`);
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Report fetch failed (HTTP ${res.status}) ${text}`.trim());
        }
        const data = (await res.json()) as PublicReportResponse;
        setResult(data.result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load report");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [safeId]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Shared report</h1>
        <p className="mt-1 text-sm text-slate-600">This link contains only audit results (no personal data).</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-4 shadow-sm backdrop-blur">
            <Spinner label="Loading report…" />
          </div>
          <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-800">{error}</div>
      ) : null}

      {result ? (
        <div className="space-y-6">
          <SummaryCards result={result} />
          <ShareLinkCard auditPublicId={result.audit_public_id ?? null} />
          <AISummaryCard result={result} />
          <AnalysisCharts result={result} />
          <PerToolTable result={result} />
        </div>
      ) : null}
    </div>
  );
}
