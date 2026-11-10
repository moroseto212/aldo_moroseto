"use client";

/**
 * Preferensi tema gelap/terang. Nilai tersimpan dibaca oleh skrip kecil di
 * <head> sebelum halaman dilukis, jadi tidak ada kedipan tema. Store ini
 * menyinkronkan tombol di header, perubahan setelan sistem, dan tab lain.
 */

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const META_COLORS: Record<Theme, string> = {
  dark: "#0b0b0c",
  light: "#f4f1ea",
};

type Listener = () => void;

let current: Theme | null = null;
let listening = false;
const listeners = new Set<Listener>();

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function storedTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage bisa diblokir (mode privat); tema tetap jalan di sesi ini.
  }
  return null;
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", META_COLORS[theme]);
}

function emit() {
  for (const listener of listeners) listener();
}

/** Ambil tema aktif. Membaca DOM supaya hasil skrip anti-kedip ikut terbaca. */
export function getTheme(): Theme {
  if (current) return current;

  const attr = document.documentElement.dataset.theme;
  current = attr === "light" || attr === "dark" ? attr : storedTheme() ?? systemTheme();
  return current;
}

/** Dipakai saat render server/hidrasi: selalu gelap, sama seperti HTML awal. */
export function getServerTheme(): Theme {
  return "dark";
}

export function setTheme(theme: Theme) {
  current = theme;
  applyTheme(theme);

  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // abaikan: preferensi hanya berlaku untuk sesi ini
  }

  emit();
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

function ensureListeners() {
  if (listening) return;
  listening = true;

  // Ikuti perubahan setelan OS selama pengunjung belum memilih sendiri.
  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
    if (storedTheme()) return;
    current = systemTheme();
    applyTheme(current);
    emit();
  });

  // Sinkronkan antar-tab.
  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    current =
      event.newValue === "light" || event.newValue === "dark"
        ? event.newValue
        : storedTheme() ?? systemTheme();
    applyTheme(current);
    emit();
  });

  // Pastikan meta theme-color sama dengan tema yang sudah dipasang skrip awal.
  applyTheme(getTheme());
}

export function subscribeTheme(listener: Listener) {
  ensureListeners();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
