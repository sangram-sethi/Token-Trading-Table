"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { toggleSidebar, setTheme } from "@/store/uiSlice";

export default function TopBar() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === "dark";

  const handleThemeToggle = () => {
    dispatch(setTheme(isDark ? "light" : "dark"));
  };

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => dispatch(toggleSidebar())}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-700 bg-slate-800 text-slate-100 hover:bg-slate-700"
        >
          <span className="sr-only">Toggle sidebar</span>
          <span className="flex flex-col gap-1">
            <span className="block h-0.5 w-4 bg-slate-100" />
            <span className="block h-0.5 w-4 bg-slate-100" />
          </span>
        </button>
        <span className="text-sm font-semibold tracking-wide text-slate-100">
          Axiom Pulse
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleThemeToggle}
          className="flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-100 hover:border-slate-500 hover:bg-slate-800"
        >
          <span className="text-sm">{isDark ? "🌙" : "☀️"}</span>
          <span className="capitalize">{theme}</span>
        </button>
      </div>
    </header>
  );
}
