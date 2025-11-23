"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { formatCurrency, formatPercent } from "@/lib/formatting";

export default function TokenList() {
  const tokens = useSelector((state: RootState) => state.tokens.tokens);
  const category = useSelector(
    (state: RootState) => state.tokens.filteredCategory,
  );

  const visibleTokens =
    category === "all"
      ? tokens
      : tokens.filter((t) => t.category === category);

  return (
    <section className="mt-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="flex items-center justify-between pb-3">
        <h2 className="text-sm font-semibold text-slate-100">Tokens</h2>
        <span className="text-xs text-slate-400">
          Showing {visibleTokens.length} of {tokens.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="px-4 py-2">Chain</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-right">Price</th>
              <th className="px-4 py-2 text-right">24h</th>
              <th className="px-4 py-2 text-right">TVL</th>
            </tr>
          </thead>
          <tbody>
            {visibleTokens.map((token) => (
              <tr
                key={token.id}
                className="border-b border-slate-900/80 hover:bg-slate-900/80"
              >
                <td className="py-2 pr-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-100">
                      {token.name}
                    </span>
                    <span className="text-xs uppercase tracking-wide text-slate-500">
                      {token.symbol}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 text-xs text-slate-300">
                  {token.chain}
                </td>
                <td className="px-4 py-2 text-xs capitalize text-slate-300">
                  {token.category}
                </td>
                <td className="px-4 py-2 text-right text-sm">
                  {formatCurrency(token.priceUsd)}
                </td>
                <td
                  className={`px-4 py-2 text-right text-sm ${
                    token.change24h >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {formatPercent(token.change24h)}
                </td>
                <td className="px-4 py-2 text-right text-sm text-slate-100">
                  {formatCurrency(token.tvlUsd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
