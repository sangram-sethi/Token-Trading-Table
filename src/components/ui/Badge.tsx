"use client";

import * as React from "react";

export type BadgeVariant = "default" | "outline" | "success" | "danger" | "muted";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]";

  const variantClasses =
    variant === "default"
      ? "border-sky-600 bg-sky-500/15 text-sky-200"
      : variant === "outline"
      ? "border-slate-600 bg-transparent text-slate-200"
      : variant === "success"
      ? "border-emerald-600 bg-emerald-500/10 text-emerald-300"
      : variant === "danger"
      ? "border-rose-600 bg-rose-500/10 text-rose-300"
      : // muted
        "border-slate-700 bg-slate-900/60 text-slate-400";

  return <span className={`${base} ${variantClasses} ${className}`} {...props} />;
}
