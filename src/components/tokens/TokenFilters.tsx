"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { setCategory } from "@/store/tokensSlice";
import type { TokenCategory } from "@/lib/types";

const FILTERS: { label: string; value: TokenCategory }[] = [
  { label: "All", value: "all" },
  { label: "Layer 1", value: "layer1" },
  { label: "DeFi", value: "defi" },
  { label: "Meme", value: "meme" },
  { label: "Stablecoins", value: "stablecoin" },
];

export default function TokenFilters() {
  const dispatch = useDispatch<AppDispatch>();
  const active = useSelector(
    (state: RootState) => state.tokens.filteredCategory,
  );

  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => {
        const isActive = active === filter.value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => dispatch(setCategory(filter.value))}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              isActive
                ? "border-sky-400 bg-sky-500/10 text-sky-100"
                : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:bg-slate-800"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
