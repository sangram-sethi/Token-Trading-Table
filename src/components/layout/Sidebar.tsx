"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { Badge } from "@/components/ui/Badge";
import { setViewMode } from "@/store/tokensSlice";

type NavMode = "all" | "watchlist" | null;

const navItems: { label: string; badge?: string; emoji: string; mode: NavMode }[] =
  [
    { label: "Overview", badge: "Now", emoji: "📊", mode: "all" },
    { label: "Watchlist", badge: "Now", emoji: "⭐", mode: "watchlist" },
    { label: "Analytics", badge: "Soon", emoji: "📈", mode: null },
    { label: "Settings", badge: "Soon", emoji: "⚙️", mode: null },
  ];

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const viewMode = useSelector((state: RootState) => state.tokens.viewMode);

  return (
    <aside
      className={`
        hidden border-r border-slate-800 bg-slate-950/95 px-2 py-4 text-sm md:block
        transition-all duration-200
        ${isOpen ? "w-64" : "w-16"}
      `}
    >
      <nav className="flex h-full flex-col gap-4">
        <div className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Navigation
        </div>

        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.mode === "all"
                ? viewMode === "all"
                : item.mode === "watchlist"
                ? viewMode === "watchlist"
                : false;

            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    if (item.mode === "all" || item.mode === "watchlist") {
                      dispatch(setViewMode(item.mode));
                    }
                  }}
                  className={`
                    group flex w-full items-center rounded-xl border px-2 py-2
                    text-xs transition-colors
                    ${
                      isActive
                        ? "border-sky-500/70 bg-sky-500/15 text-sky-100"
                        : "border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900 hover:text-slate-50"
                    }
                  `}
                >
                  <span className="mr-2 flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-base">
                    {item.emoji}
                  </span>

                  <div
                    className={`
                      flex flex-1 items-center justify-between
                      overflow-hidden transition-all duration-200
                      ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}
                    `}
                  >
                    <span className="truncate text-[12px]">{item.label}</span>
                    {item.badge && (
                      <Badge
                        variant={
                          item.badge === "Now" ? "success" : "muted"
                        }
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-[11px] text-slate-400">
          {isOpen ? (
            <>
              <p className="font-medium text-slate-200">Pro tip</p>
              <p className="mt-1">
                Use <span className="text-sky-300">Watchlist</span> in the
                sidebar to jump straight to your starred tokens.
              </p>
            </>
          ) : (
            <div className="flex items-center justify-center text-lg">👈</div>
          )}
        </div>
      </nav>
    </aside>
  );
}
