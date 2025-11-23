import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Token, TokenCategory } from "@/lib/types";

interface TokensState {
  tokens: Token[];
  filteredCategory: TokenCategory;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedTokenId: string | null;
  watchlist: string[]; // token IDs
}

const initialState: TokensState = {
  tokens: [],
  filteredCategory: "all",
  status: "idle",
  error: null,
  selectedTokenId: null,
  watchlist: [],
};

// Async thunk to load tokens from our API route
export const fetchTokens = createAsyncThunk<Token[]>(
  "tokens/fetchTokens",
  async () => {
    const res = await fetch("/api/tokens");

    if (!res.ok) {
      throw new Error("Failed to fetch tokens");
    }

    const data = (await res.json()) as { tokens: Token[] };
    return data.tokens;
  },
);

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<TokenCategory>) {
      state.filteredCategory = action.payload;
    },
    setTokens(state, action: PayloadAction<Token[]>) {
      state.tokens = action.payload;
    },
    selectToken(state, action: PayloadAction<string>) {
      state.selectedTokenId = action.payload;
    },
    clearSelectedToken(state) {
      state.selectedTokenId = null;
    },
    toggleWatchlist(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.watchlist.includes(id)) {
        state.watchlist = state.watchlist.filter((t) => t !== id);
      } else {
        state.watchlist.push(id);
      }
    },
    clearWatchlist(state) {
      state.watchlist = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTokens.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTokens.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tokens = action.payload;
      })
      .addCase(fetchTokens.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const {
  setCategory,
  setTokens,
  selectToken,
  clearSelectedToken,
  toggleWatchlist,
  clearWatchlist,
} = tokensSlice.actions;
export default tokensSlice.reducer;
