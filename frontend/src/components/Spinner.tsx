export default function Spinner(props: { label?: string; size?: "sm" | "md" }) {
  const size = props.size ?? "md";
  const dim = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return (
    <div className="inline-flex items-center gap-2 text-sm text-slate-600">
      <span
        className={`${dim} inline-block animate-spin rounded-full border-2 border-slate-300 border-t-sky-600`}
        aria-hidden="true"
      />
      {props.label ? <span>{props.label}</span> : null}
    </div>
  );
}

