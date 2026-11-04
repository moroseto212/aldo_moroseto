"use client";

/**
 * Preferensi efek gerak (gyro) yang dipakai bersama oleh tombol di header dan
 * hook tilt. Disimpan di localStorage supaya pengunjung tidak ditanya izin
 * berulang kali.
 */

const STORAGE_KEY = "motion:gyro";

type Listener = () => void;

let enabled = false;
let hydrated = false;
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener();
}

/** Baca preferensi tersimpan, sekali per muat halaman. */
export function hydrateGyroPreference(): void {
  if (hydrated) return;
  hydrated = true;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "on") enabled = true;
  } catch {
    // localStorage bisa diblokir (mode privat). Efek tetap jalan di sesi ini.
  }

  emit();
}

export function isGyroEnabled(): boolean {
  return enabled;
}

export function setGyroEnabled(next: boolean): void {
  if (enabled === next) return;
  enabled = next;

  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // abaikan: preferensi hanya berlaku untuk sesi ini
  }

  emit();
}

export function subscribeGyroStore(onChange: Listener): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}
