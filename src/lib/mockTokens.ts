import type { Token } from "./types";

export const mockTokens: Token[] = [
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    chain: "Ethereum",
    category: "layer1",
    priceUsd: 3450,
    change24h: 0.021,
    tvlUsd: 420_000_000,
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    chain: "Multi-chain",
    category: "stablecoin",
    priceUsd: 1,
    change24h: 0.0,
    tvlUsd: 5_200_000_000,
  },
  {
    id: "uni",
    name: "Uniswap",
    symbol: "UNI",
    chain: "Ethereum",
    category: "defi",
    priceUsd: 9.4,
    change24h: -0.035,
    tvlUsd: 750_000_000,
  },
];
