"use client";

import * as React from "react";

export type ButtonVariant = "primary" | "outline" | "ghost" | "subtle";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-1 rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-40 disabled:cursor-not-allowed";

  const variantClasses =
    variant === "primary"
      ? "bg-sky-500 text-slate-950 hover:bg-sky-400"
      : variant === "outline"
      ? "border border-slate-700 bg-slate-900/40 text-slate-100 hover:border-sky-500 hover:bg-slate-900"
      : variant === "ghost"
      ? "bg-transparent text-slate-300 hover:bg-slate-900/70"
      : // subtle
        "border border-slate-800 bg-slate-900/60 text-slate-200 hover:border-slate-700 hover:bg-slate-900";

  const sizeClasses =
    size === "xs"
      ? "px-2 py-1 text-[11px]"
      : size === "sm"
      ? "px-3 py-1.5 text-xs"
      : size === "lg"
      ? "px-5 py-2.5 text-sm"
      : size === "icon"
      ? "h-9 w-9 rounded-full p-0 text-base"
      : // md
        "px-4 py-2 text-sm";

  const classes = `${base} ${variantClasses} ${sizeClasses} ${className}`;

  return <button className={classes} {...props} />;
}
