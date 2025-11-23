"use client";

import { Provider, useSelector, useDispatch } from "react-redux";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { store } from "@/store/store";
import type { RootState, AppDispatch } from "@/store/store";
import { setTheme } from "@/store/uiSlice";
import { setViewMode, setWatchlist } from "@/store/tokensSlice";

function ThemeAndPersistence({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  const theme = useSelector((state: RootState) => state.ui.theme);
  const watchlist = useSelector((state: RootState) => state.tokens.watchlist);
  const viewMode = useSelector((state: RootState) => state.tokens.viewMode);

  // On mount, hydrate from localStorage into Redux
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // theme
      const storedTheme = window.localStorage.getItem("axiom-pulse-theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        dispatch(setTheme(storedTheme));
      }

      // tokens (watchlist + viewMode)
      const raw = window.localStorage.getItem("axiom-pulse-tokens");
      if (raw) {
        const parsed = JSON.parse(raw) as {
          watchlist?: unknown;
          viewMode?: unknown;
        };

        if (Array.isArray(parsed.watchlist)) {
          const ids = parsed.watchlist.filter(
            (id): id is string => typeof id === "string",
          );
          dispatch(setWatchlist(ids));
        }

        if (parsed.viewMode === "all" || parsed.viewMode === "watchlist") {
          dispatch(setViewMode(parsed.viewMode));
        }
      }
    } catch {
      // ignore bad localStorage
    }
  }, [dispatch]);

  // Apply theme + persist it
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }

    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("axiom-pulse-theme", theme);
      } catch {
        // ignore write errors
      }
    }
  }, [theme]);

  // Persist watchlist + viewMode
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const payload = { watchlist, viewMode };
      window.localStorage.setItem(
        "axiom-pulse-tokens",
        JSON.stringify(payload),
      );
    } catch {
      // ignore
    }
  }, [watchlist, viewMode]);

  return <>{children}</>;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeAndPersistence>{children}</ThemeAndPersistence>
    </Provider>
  );
}

export default AppProviders;
