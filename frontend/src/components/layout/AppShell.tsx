import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function classNames(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function Icon(props: {
  name:
    | "menu"
    | "home"
    | "results"
    | "graph"
    | "share"
    | "ai"
    | "mail"
    | "tools"
    | "collapse";
}) {
  const common = "h-4 w-4";
  switch (props.name) {
    case "menu":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 7h16M4 12h16M4 17h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "home":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "results":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M7 7h10M7 12h10M7 17h7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "graph":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M5 19V5m0 14h14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8 16v-5M12 16v-8M16 16v-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "share":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M16 8a3 3 0 1 0-2.83-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M7 12a3 3 0 1 0 0 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 20a3 3 0 1 0-2.83 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M9.5 11l5-3M9.5 13l5 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "ai":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2v3M12 19v3M4.5 4.5l2.1 2.1M17.4 17.4l2.1 2.1M2 12h3M19 12h3M4.5 19.5l2.1-2.1M17.4 6.6l2.1-2.1"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      );
    case "mail":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="2" />
          <path
            d="m4 7 8 6 8-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tools":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M14 7 7 14m0-4v4h4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 7h10v10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "collapse":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none">
          <path
            d="M14 7 9 12l5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function Breadcrumbs() {
  const location = useLocation();
  const crumbs = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    if (parts.length === 0) return [{ label: "Home", href: "/" }];
    const acc: Array<{ label: string; href: string }> = [
      { label: "Home", href: "/" },
    ];
    let href = "";
    for (const p of parts) {
      href += `/${p}`;
      acc.push({ label: p === "report" ? "Report" : p, href });
    }
    return acc;
  }, [location.pathname]);

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500">
      {crumbs.map((c, idx) => (
        <span key={c.href} className="flex items-center gap-2">
          <Link to={c.href} className="hover:text-slate-700">
            {c.label}
          </Link>
          {idx < crumbs.length - 1 ? (
            <span className="text-slate-300">/</span>
          ) : null}
        </span>
      ))}
    </nav>
  );
}

function SidebarNav(props: { collapsed: boolean; onNavigate?: () => void }) {
  const linkBase =
    "flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold transition";
  const iconBase =
    "h-8 w-8 rounded-xl border shadow-sm backdrop-blur flex items-center justify-center";

  const Item = (p: {
    to: string;
    label: string;
    icon: Parameters<typeof Icon>[0]["name"];
    exact?: boolean;
  }) => (
    <NavLink
      to={p.to}
      end={p.exact}
      onClick={props.onNavigate}
      className={({ isActive }) =>
        classNames(
          linkBase,
          // Normal state: neutral, professional.
          isActive
            ? "border border-sky-100 bg-white/60 text-sky-900 shadow-sm backdrop-blur"
            : "text-slate-700 hover:bg-white/70",
          props.collapsed ? "justify-center px-2" : "",
        )
      }
      title={props.collapsed ? p.label : undefined}
    >
      {({ isActive }) => (
        <>
          <span
            className={classNames(
              iconBase,
              isActive
                ? "border-sky-600 bg-sky-600 text-white"
                : "border-sky-100 bg-white/70 text-sky-700",
            )}
          >
            <Icon name={p.icon} />
          </span>
          {props.collapsed ? null : (
            <span className="text-[13px]">{p.label}</span>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <div className="space-y-1">
      <Item to="/" label="Home" icon="home" exact />
      <Item to="/audit" label="Audit" icon="results" />
      <Item to="/results" label="Audit result" icon="results" />
      <Item to="/analysis" label="Graph analysis" icon="graph" />
      <Item to="/share" label="Shareable link" icon="share" />
      <Item to="/summary" label="AI summary" icon="ai" />
      <Item to="/get-report" label="Get the report" icon="mail" />
      <Item to="/breakdown" label="Per-tool breakdown" icon="tools" />
    </div>
  );
}

export default function AppShell(props: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("ui:sidebarCollapsed") === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("ui:sidebarCollapsed", collapsed ? "1" : "0");
    } catch {
      // ignore
    }
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-sky-200/60 blur-3xl" />
        <div className="absolute top-48 left-10 h-56 w-56 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute top-64 right-10 h-56 w-56 rounded-full bg-sky-100/70 blur-3xl" />
      </div>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-20 border-b border-sky-100/60 bg-white/55 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-sky-600 to-sky-400 text-white shadow-sm grid place-items-center font-bold">
              AI
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">
                AI Spend Audit Tool
              </div>
              <div className="text-xs text-slate-500">
                Automation-grade spend insights
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <Breadcrumbs />
            </div>
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-white focus:outline-none focus:ring-4 focus:ring-sky-200 lg:hidden"
              aria-label="Toggle navigation"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          "mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6",
          collapsed ? "lg:grid-cols-[88px_1fr]" : "lg:grid-cols-[260px_1fr]",
        )}
      >
        {/* Mobile overlay */}
        {sidebarOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-10 bg-slate-900/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          />
        ) : null}

        {/* Sidebar */}
        <aside
          className={classNames(
            "z-20 lg:sticky lg:top-[72px] lg:self-start",
            sidebarOpen ? "block" : "hidden lg:block",
            "lg:relative lg:col-span-1",
            "fixed left-4 top-[72px] w-[calc(100%-2rem)] max-w-sm lg:static lg:w-auto",
          )}
        >
          <div
            className={classNames(
              "rounded-2xl border border-sky-100/60 bg-white/60 shadow-sm backdrop-blur",
              collapsed ? "p-2.5" : "p-3.5",
            )}
          >
            {collapsed ? (
              <div className="mb-2 hidden lg:flex justify-center">
                <button
                  type="button"
                  onClick={() => setCollapsed((v) => !v)}
                  className={classNames(
                    "h-8 w-8 rounded-xl border border-sky-100 bg-white/70 shadow-sm backdrop-blur flex items-center justify-center text-slate-700 hover:bg-white focus:outline-none focus:ring-4 focus:ring-sky-200",
                  )}
                  aria-label="Expand sidebar"
                  title="Expand"
                >
                  <span className="rotate-180">
                    <Icon name="collapse" />
                  </span>
                </button>
              </div>
            ) : (
              <div className="mb-2.5 hidden lg:flex items-center justify-between gap-2">
                <div className="text-xs font-semibold text-slate-500">
                  Navigation
                </div>
                <button
                  type="button"
                  onClick={() => setCollapsed((v) => !v)}
                  className="h-8 w-8 rounded-xl border border-sky-100 bg-white/70 shadow-sm backdrop-blur flex items-center justify-center text-slate-700 hover:bg-white focus:outline-none focus:ring-4 focus:ring-sky-200"
                  aria-label="Collapse sidebar"
                  title="Collapse"
                >
                  <Icon name="collapse" />
                </button>
              </div>
            )}

            <SidebarNav
              collapsed={collapsed}
              onNavigate={() => setSidebarOpen(false)}
            />
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0">
          <div className="hidden lg:block mb-4">
            <Breadcrumbs />
          </div>
          {props.children}
        </main>
      </div>
    </div>
  );
}
