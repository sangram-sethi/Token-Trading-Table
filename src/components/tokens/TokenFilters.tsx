"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { setCategory } from "@/store/tokensSlice";
import type { TokenCategory } from "@/lib/types";
import { Button } from "@/components/ui/Button";

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
          <Button
            key={filter.value}
            type="button"
            size="xs"
            variant={isActive ? "primary" : "subtle"}
            className="rounded-full"
            onClick={() => dispatch(setCategory(filter.value))}
          >
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}
