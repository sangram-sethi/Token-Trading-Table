import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Token, TokenCategory } from "@/lib/types";
import { mockTokens } from "@/lib/mockTokens";

interface TokensState {
  tokens: Token[];
  filteredCategory: TokenCategory;
}

const initialState: TokensState = {
  tokens: mockTokens,
  filteredCategory: "all",
};

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
  },
});

export const { setCategory, setTokens } = tokensSlice.actions;
export default tokensSlice.reducer;
