import { useState } from "react";

export default function ShareLinkCard(props: { auditPublicId: string | null }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = props.auditPublicId ? `${window.location.origin}/report/${props.auditPublicId}` : null;

  if (!shareUrl) return null;

  return (
    <div className="rounded-2xl border border-sky-100/60 bg-white/60 p-6 shadow-sm backdrop-blur">
      <div className="text-sm font-semibold text-slate-900">Shareable link</div>
      <p className="mt-1 text-sm text-slate-600">Public link shows only audit results (no personal data).</p>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white/70 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="break-all text-sm font-semibold text-slate-800">{shareUrl}</div>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(shareUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-sky-200"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          For better social previews use backend <span className="font-semibold">/share/{props.auditPublicId}</span>.
        </p>
      </div>
    </div>
  );
}

