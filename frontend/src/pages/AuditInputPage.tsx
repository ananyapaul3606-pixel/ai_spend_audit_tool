import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpendInputForm from "../components/SpendInputForm";
import Spinner from "../components/Spinner";
import { runAudit, type AuditResponse } from "../lib/api";
import { useLastAudit } from "../lib/store";
import type { SpendInput } from "../types/spend";

export default function AuditInputPage() {
  const navigate = useNavigate();
  const [lastAudit, setLastAudit] = useLastAudit();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (value: SpendInput) => {
    setError(null);
    setLoading(true);
    try {
      const r = (await runAudit(value)) as AuditResponse;
      setLastAudit(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Audit failed");
    } finally {
      setLoading(false);
      setTimeout(() => {
        if (lastAudit) {
          navigate("/results");
        }
      }, 0);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Audit
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Enter your AI subscriptions and run a deterministic audit.
        </p>
      </div>

      <SpendInputForm onSubmit={onSubmit} />

      {loading ? (
        <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-4 shadow-sm backdrop-blur">
          <Spinner label="Running audit…" />
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4 text-sm text-rose-800">
          {error}
        </div>
      ) : null}
    </div>
  );
}
