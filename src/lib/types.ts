export type TokenCategory = "all" | "layer1" | "defi" | "meme" | "stablecoin";

export interface Token {
  id: string;
  name: string;
  symbol: string;
  chain: string;
  category: TokenCategory;
  priceUsd: number;
  change24h: number; // e.g. -0.034 => -3.4%
  tvlUsd: number;
}
