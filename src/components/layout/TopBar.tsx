"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { toggleSidebar, setTheme } from "@/store/uiSlice";
import { Button } from "@/components/ui/Button";

export default function TopBar() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === "dark";

  const handleThemeToggle = () => {
    dispatch(setTheme(isDark ? "light" : "dark"));
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-950/95 to-sky-950/40 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          aria-label="Toggle sidebar"
          onClick={() => dispatch(toggleSidebar())}
        >
          <span className="flex flex-col gap-1">
            <span className="block h-0.5 w-4 rounded bg-slate-100" />
            <span className="block h-0.5 w-4 rounded bg-slate-100" />
          </span>
        </Button>

        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wide text-slate-50">
            Axiom Pulse
          </span>
          <span className="text-[11px] text-slate-400">
            Token intelligence, at a glance.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleThemeToggle}
          className="rounded-full border border-slate-700/70 bg-slate-900/60 px-3"
        >
          <span className="text-sm">{isDark ? "🌙" : "☀️"}</span>
          <span className="text-xs capitalize text-slate-300">{theme}</span>
        </Button>
      </div>
    </header>
  );
}
