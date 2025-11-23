"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import type { RootState, AppDispatch } from "@/store/store";
import { formatCurrency, formatPercent } from "@/lib/formatting";
import { fetchTokens, selectToken } from "@/store/tokensSlice";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import TokenSparkline from "@/components/tokens/TokenSparkline";

type SortKey = "name" | "price" | "change24h" | "tvl";
type SortDirection = "asc" | "desc";

export default function TokenList() {
  const dispatch = useDispatch<AppDispatch>();
  const { tokens, filteredCategory, status, error, selectedTokenId } =
    useSelector((state: RootState) => state.tokens);

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("tvl");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // pagination state
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1); // 1-based

  // Fetch tokens on first load
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTokens());
    }
  }, [status, dispatch]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection(key === "name" ? "asc" : "desc");
    }
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) {
      return (
        <span className="ml-1 text-[10px] text-slate-500" aria-hidden>
          ↕
        </span>
      );
    }

    return (
      <span className="ml-1 text-[10px] text-slate-300" aria-hidden>
        {sortDirection === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  // 1) category filter
  const filteredByCategory =
    filteredCategory === "all"
      ? tokens
      : tokens.filter((t) => t.category === filteredCategory);

  // 2) search filter
  const searchedTokens = filteredByCategory.filter((t) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.symbol.toLowerCase().includes(q) ||
      t.chain.toLowerCase().includes(q)
    );
  });

  // 3) sorting
  const sortedTokens = [...searchedTokens].sort((a, b) => {
    let result = 0;

    switch (sortKey) {
      case "name": {
        const an = a.name.toLowerCase();
        const bn = b.name.toLowerCase();
        result = an.localeCompare(bn);
        break;
      }
      case "price": {
        result = a.priceUsd - b.priceUsd;
        break;
      }
      case "change24h": {
        result = a.change24h - b.change24h;
        break;
      }
      case "tvl": {
        result = a.tvlUsd - b.tvlUsd;
        break;
      }
    }

    return sortDirection === "asc" ? result : -result;
  });

  const totalRows = sortedTokens.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));

  // keep page in range when filters/search/size change
  useEffect(() => {
    setPage((prev) => {
      if (prev > totalPages) return totalPages;
      if (prev < 1) return 1;
      return prev;
    });
  }, [totalPages]);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const pageTokens = sortedTokens.slice(startIndex, endIndex);

  const displayStart = totalRows === 0 ? 0 : startIndex + 1;
  const displayEnd = totalRows === 0 ? 0 : Math.min(endIndex, totalRows);

  const handlePageSizeChange = (value: string) => {
    const n = Number(value) || 5;
    setPageSize(n);
    setPage(1); // reset to first page when size changes
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Tokens</CardTitle>
          <CardDescription>
            Showing {displayStart}–{displayEnd} of {totalRows} result
            {totalRows === 1 ? "" : "s"}
          </CardDescription>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <div className="w-full sm:w-56">
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1); // reset page on search change
              }}
              placeholder="Search by name, symbol, chain..."
            />
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1 text-[11px] text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        {status === "loading" && (
          <div className="py-8 text-center text-xs text-slate-400">
            Loading tokens…
          </div>
        )}

        {status === "failed" && (
          <div className="py-8 text-center text-xs text-rose-400">
            {error ?? "Failed to load tokens."}
          </div>
        )}

        {status === "succeeded" && totalRows === 0 && (
          <div className="py-8 text-center text-xs text-slate-400">
            No tokens match your filters.
          </div>
        )}

        {status === "succeeded" && totalRows > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-slate-800 text-xs uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="py-2 pr-4">
                      <button
                        type="button"
                        onClick={() => handleSort("name")}
                        className="inline-flex items-center text-[11px] font-semibold tracking-wide text-slate-300"
                      >
                        Name
                        {renderSortIcon("name")}
                      </button>
                    </th>
                    <th className="px-4 py-2 text-[11px] font-semibold tracking-wide text-slate-400">
                      Chain
                    </th>
                    <th className="px-4 py-2 text-[11px] font-semibold tracking-wide text-slate-400">
                      Category
                    </th>
                    <th className="px-4 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => handleSort("price")}
                        className="inline-flex items-center text-[11px] font-semibold tracking-wide text-slate-300"
                      >
                        Price
                        {renderSortIcon("price")}
                      </button>
                    </th>
                    <th className="px-4 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => handleSort("change24h")}
                        className="inline-flex items-center text-[11px] font-semibold tracking-wide text-slate-300"
                      >
                        24h
                        {renderSortIcon("change24h")}
                      </button>
                    </th>
                    <th className="px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-slate-400">
                      Trend
                    </th>
                    <th className="px-4 py-2 text-right">
                      <button
                        type="button"
                        onClick={() => handleSort("tvl")}
                        className="inline-flex items-center text-[11px] font-semibold tracking-wide text-slate-300"
                      >
                        TVL
                        {renderSortIcon("tvl")}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageTokens.map((token) => {
                    const isSelected = token.id === selectedTokenId;

                    return (
                      <tr
                        key={token.id}
                        onClick={() => dispatch(selectToken(token.id))}
                        className={`cursor-pointer border-b border-slate-900/80 transition-colors ${
                          isSelected
                            ? "bg-sky-500/10"
                            : "hover:bg-slate-900/80"
                        }`}
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
                            token.change24h >= 0
                              ? "text-emerald-400"
                              : "text-rose-400"
                          }`}
                        >
                          {formatPercent(token.change24h)}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <TokenSparkline
                            points={token.history}
                            className="mx-auto h-8 w-20"
                            height={32}
                            strokeWidth={1.5}
                          />
                        </td>
                        <td className="px-4 py-2 text-right text-sm text-slate-100">
                          {formatCurrency(token.tvlUsd)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* pagination controls */}
            <div className="mt-3 flex flex-col gap-2 border-t border-slate-800 pt-3 text-[11px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <div>
                Showing {displayStart}–{displayEnd} of {totalRows} result
                {totalRows === 1 ? "" : "s"}
              </div>
              <div className="flex items-center gap-2">
                <span>
                  Page {page} of {totalPages}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1 || totalRows === 0}
                  >
                    ‹ Prev
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() =>
                      setPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={page === totalPages || totalRows === 0}
                  >
                    Next ›
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
