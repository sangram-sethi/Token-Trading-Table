"use client";

import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-950/60 shadow-sm shadow-slate-950/40 ${className}`}
      {...props}
    />
  );
}

export interface CardSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className = "", ...props }: CardSectionProps) {
  return (
    <div
      className={`border-b border-slate-800 px-4 py-3 ${className}`}
      {...props}
    />
  );
}

export function CardTitle({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={`text-sm font-semibold tracking-tight text-slate-50 ${className}`}
      {...props}
    />
  );
}

export function CardDescription({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-xs text-slate-400 leading-relaxed ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: CardSectionProps) {
  return <div className={`px-4 py-3 ${className}`} {...props} />;
}