"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { clearSelectedToken } from "@/store/tokensSlice";
import { formatCurrency, formatPercent } from "@/lib/formatting";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function TokenDetailsPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const { tokens, selectedTokenId, status } = useSelector(
    (state: RootState) => state.tokens,
  );

  const token = tokens.find((t) => t.id === selectedTokenId) ?? null;

  if (status === "loading") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Token details</CardTitle>
          <CardDescription>Loading details…</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!token) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Token details</CardTitle>
          <CardDescription>
            Select a token from the table to view its metrics and quick notes.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-[11px] text-slate-400">
          Tip: try clicking on{" "}
          <span className="font-semibold text-slate-200">Ethereum</span> or{" "}
          <span className="font-semibold text-slate-200">USDC</span> in the
          table.
        </CardContent>
      </Card>
    );
  }

  const isPositive = token.change24h >= 0;

  return (
    <Card>
      <CardHeader className="flex items-start justify-between gap-2">
        <div>
          <CardTitle className="flex items-baseline gap-2">
            {token.name}
            <span className="text-xs font-normal text-slate-400">
              ({token.symbol})
            </span>
          </CardTitle>
          <CardDescription className="mt-2 flex flex-wrap gap-2">
            <Badge variant="muted">Chain: {token.chain}</Badge>
            <Badge variant="outline" className="capitalize">
              {token.category}
            </Badge>
          </CardDescription>
        </div>

        <Button
          variant="ghost"
          size="xs"
          onClick={() => dispatch(clearSelectedToken())}
          className="rounded-full border border-slate-700/70 px-2 py-1 text-[11px]"
        >
          Clear
        </Button>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-slate-500">
            Price
          </div>
          <div className="mt-1 text-lg font-semibold text-slate-50">
            {formatCurrency(token.priceUsd)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              24h Change
            </div>
            <div
              className={`mt-1 text-sm font-semibold ${
                isPositive ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {formatPercent(token.change24h)}
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              TVL
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-50">
              {formatCurrency(token.tvlUsd)}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-[11px] text-slate-300">
          <p className="mb-1 font-medium text-slate-200">Quick note</p>
          <p>
            This is placeholder copy. In a real app, you could surface on-chain
            activity, liquidity sources, risk flags, or strategy notes for{" "}
            {token.symbol}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
