"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const navItems = [
  { label: "Overview", badge: "Now", emoji: "📊" },
  { label: "Watchlist", badge: "Soon", emoji: "⭐" },
  { label: "Analytics", badge: "Soon", emoji: "📈" },
  { label: "Settings", badge: "Soon", emoji: "⚙️" },
];

export default function Sidebar() {
  const isOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);

  return (
    <aside
      className={`
        hidden border-r border-slate-800 bg-slate-950/90 px-2 py-4 text-sm md:block
        transition-all duration-200
        ${isOpen ? "w-60" : "w-16"}
      `}
    >
      <nav className="flex h-full flex-col gap-4">
        <div className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          NAVIGATION
        </div>

        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className={`
                  group flex w-full items-center rounded-lg px-2 py-2
                  text-xs text-slate-300 hover:bg-slate-900 hover:text-slate-50
                `}
              >
                <span className="mr-2 flex h-6 w-6 items-center justify-center text-base">
                  {item.emoji}
                </span>

                {/* Text hides when collapsed */}
                <div
                  className={`
                    flex flex-1 items-center justify-between
                    overflow-hidden transition-all duration-200
                    ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}
                  `}
                >
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-300">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-[10px] text-slate-400">
          <div className={`${isOpen ? "block" : "hidden"}`}>
            Tip: use the menu button in the top-left to collapse the sidebar and
            focus on the table.
          </div>
          {!isOpen && (
            <div className="flex items-center justify-center text-lg">👈</div>
          )}
        </div>
      </nav>
    </aside>
  );
}
