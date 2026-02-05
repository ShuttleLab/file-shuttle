"use client";

import { useEffect } from "react";

/** Syncs .dark class on documentElement with prefers-color-scheme. */
export function ThemeSync() {
  useEffect(() => {
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const set = () => {
      document.documentElement.classList.toggle("dark", m.matches);
    };
    set();
    m.addEventListener("change", set);
    return () => m.removeEventListener("change", set);
  }, []);
  return null;
}
