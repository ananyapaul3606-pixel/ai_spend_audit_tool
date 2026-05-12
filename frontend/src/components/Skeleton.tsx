function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function Skeleton(props: { className?: string }) {
  return (
    <div
      className={classNames(
        "animate-pulse rounded-xl bg-gradient-to-r from-slate-200/60 via-slate-100/60 to-slate-200/60",
        props.className,
      )}
    />
  );
}

