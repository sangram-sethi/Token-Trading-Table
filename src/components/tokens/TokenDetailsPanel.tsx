"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { clearSelectedToken } from "@/store/tokensSlice";
import { formatCurrency, formatPercent } from "@/lib/formatting";

export default function TokenDetailsPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const { tokens, selectedTokenId, status } = useSelector(
    (state: RootState) => state.tokens,
  );

  const token = tokens.find((t) => t.id === selectedTokenId) ?? null;

  if (status === "loading") {
    return (
      <section className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-400">
        Loading details…
      </section>
    );
  }

  if (!token) {
    return (
      <section className="mt-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-4 text-xs text-slate-400">
        <p className="font-medium text-slate-300">Token details</p>
        <p className="mt-2">
          Select a token from the table to view its details here.
        </p>
      </section>
    );
  }

  const isPositive = token.change24h >= 0;

  return (
    <section className="mt-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Token
          </div>
          <h2 className="text-base font-semibold text-slate-50">
            {token.name}{" "}
            <span className="text-xs font-normal text-slate-400">
              ({token.symbol})
            </span>
          </h2>
          <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-slate-300">
            <span className="rounded-full bg-slate-800 px-2 py-0.5">
              Chain: {token.chain}
            </span>
            <span className="rounded-full bg-slate-800 px-2 py-0.5 capitalize">
              {token.category}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => dispatch(clearSelectedToken())}
          className="rounded-full border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-slate-300 hover:border-slate-500 hover:bg-slate-800"
        >
          Clear
        </button>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-slate-500">
            Price
          </div>
          <div className="mt-1 text-lg font-semibold text-slate-50">
            {formatCurrency(token.priceUsd)}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-2">
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

          <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-2">
            <div className="text-[10px] uppercase tracking-wide text-slate-500">
              TVL
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-50">
              {formatCurrency(token.tvlUsd)}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-2 text-[11px] text-slate-300">
          <p className="mb-1 font-medium text-slate-200">
            Quick note (mocked):
          </p>
          <p>
            This is placeholder copy. In a real app, you could surface on-chain
            metrics, risk flags, liquidity sources, or strategy notes for{" "}
            {token.symbol}.
          </p>
        </div>
      </div>
    </section>
  );
}