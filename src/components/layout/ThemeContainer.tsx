"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function ThemeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useSelector((state: RootState) => state.ui.theme);
  const isDark = theme === "dark";

  const base = "min-h-screen transition-colors duration-200 antialiased";
  const themeClasses = isDark
    ? "bg-slate-950 text-slate-50"
    : "bg-slate-50 text-slate-900";

  return <div className={`${base} ${themeClasses}`}>{children}</div>;
}
