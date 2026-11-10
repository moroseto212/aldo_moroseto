"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import {
  getServerTheme,
  getTheme,
  subscribeTheme,
  toggleTheme,
} from "@/lib/theme";

/**
 * Tombol ikon gelap/terang. Ikon yang terlihat ditentukan oleh atribut
 * `data-theme` di <html> (lewat CSS), jadi tidak ada kedipan ikon saat hidrasi.
 */
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const label = theme === "dark" ? "Aktifkan mode terang" : "Aktifkan mode gelap";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="relative flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-foreground/40"
    >
      <Sun
        size={16}
        strokeWidth={1.6}
        aria-hidden="true"
        className="theme-icon-sun text-faint transition-colors"
      />
      <Moon
        size={16}
        strokeWidth={1.6}
        aria-hidden="true"
        className="theme-icon-moon text-faint transition-colors"
      />
    </button>
  );
}
