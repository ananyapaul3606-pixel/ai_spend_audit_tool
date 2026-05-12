import { useState } from "react";

type Props = {
  auditPublicId: string | null;
  onSubmitted?: () => void;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export default function LeadCaptureForm(props: Props) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          company: company || null,
          role: role || null,
          team_size: teamSize ? Number(teamSize) : null,
          audit_public_id: props.auditPublicId,
        }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Lead capture failed (HTTP ${res.status}) ${text}`.trim());
      }
      setDone(true);
      props.onSubmitted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-900">
        Thanks — check your inbox for a confirmation email.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">Work email</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 shadow-sm outline-none ring-sky-200 focus:ring-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Company (optional)</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 shadow-sm outline-none ring-sky-200 focus:ring-4"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Inc."
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Role (optional)</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 shadow-sm outline-none ring-sky-200 focus:ring-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Engineering Manager"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Team size (optional)</label>
          <input
            inputMode="numeric"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-slate-900 shadow-sm outline-none ring-sky-200 focus:ring-4"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            placeholder="e.g. 25"
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-3 text-sm text-rose-800">{error}</div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Email me this report"}
      </button>

      <p className="text-xs text-slate-500">
        Basic rate limiting is enabled to prevent abuse.
      </p>
    </form>
  );
}

