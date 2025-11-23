import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

interface UIState {
  isSidebarOpen: boolean;
  theme: Theme;
}

// Static, SSR-safe initial state
const initialState: UIState = {
  isSidebarOpen: true,
  theme: "dark",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
