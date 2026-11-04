"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";
import { Compass } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  hydrateGyroPreference,
  isGyroEnabled,
  setGyroEnabled,
  subscribeGyroStore,
} from "@/lib/gyro";

type Support = "unknown" | "prompt" | "silent" | "none";

const PERMISSION_TIMEOUT = 1500;

function subscribeNoop() {
  return () => {};
}

type OrientationApi = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<string>;
};

function getClientSupport(): Support {
  const orientation = window.DeviceOrientationEvent as OrientationApi | undefined;

  if (!orientation) return "none";

  // Hanya perangkat sentuh (HP/tablet). Edge di desktop juga mengekspos
  // requestPermission, jadi tanpa pengecekan ini ikon muncul di laptop.
  if (!window.matchMedia("(pointer: coarse)").matches) return "none";

  return typeof orientation.requestPermission === "function" ? "prompt" : "silent";
}

/** Tunggu satu event orientasi; dipakai untuk memastikan sensor benar-benar ada. */
function waitForOrientation(timeout = PERMISSION_TIMEOUT): Promise<boolean> {
  return new Promise((resolve) => {
    let settled = false;

    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      window.removeEventListener("deviceorientation", onEvent);
      window.clearTimeout(timer);
      resolve(ok);
    };

    const onEvent = (event: DeviceOrientationEvent) => {
      if (event.beta !== null || event.gamma !== null) finish(true);
    };

    const timer = window.setTimeout(() => finish(false), timeout);
    window.addEventListener("deviceorientation", onEvent);
  });
}

/**
 * Tombol ikon untuk menyalakan efek gyro di HP/tablet.
 * Tanpa teks terlihat — status dibaca lewat `aria-label` dan `aria-pressed`.
 */
export default function MotionToggle() {
  const reduced = useReducedMotion();
  const support = useSyncExternalStore(subscribeNoop, getClientSupport, () => "unknown" as Support);
  const enabled = useSyncExternalStore(subscribeGyroStore, isGyroEnabled, () => false);
  const [dismissed, setDismissed] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    hydrateGyroPreference();
  }, []);

  const toggle = useCallback(async () => {
    if (busy) return;

    if (enabled) {
      setGyroEnabled(false);
      return;
    }

    setBusy(true);
    try {
      if (support === "prompt") {
        const request = (
          window.DeviceOrientationEvent as unknown as {
            requestPermission?: () => Promise<string>;
          }
        ).requestPermission;

        if (request) {
          const result = await request();
          if (result !== "granted") {
            // Jangan tanya lagi di sesi ini.
            setDismissed(true);
            return;
          }
        }
      }

      const available = await waitForOrientation();
      if (!available) {
        setDismissed(true);
        return;
      }

      setGyroEnabled(true);
    } finally {
      setBusy(false);
    }
  }, [busy, enabled, support]);

  if (reduced || dismissed || support === "unknown" || support === "none") return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Matikan efek gerak" : "Aktifkan efek gerak"}
      title={enabled ? "Matikan efek gerak" : "Aktifkan efek gerak"}
      aria-busy={busy}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border border-line transition-colors hover:border-foreground/40",
        busy && "opacity-60",
      )}
    >
      <Compass
        size={16}
        strokeWidth={1.6}
        aria-hidden="true"
        className={cn(
          "transition-all duration-500",
          enabled ? "rotate-45 text-foreground" : "rotate-0 text-faint",
        )}
      />
      {enabled && (
        <span aria-hidden="true" className="absolute right-1.5 top-1.5 size-1 bg-accent" />
      )}
    </button>
  );
}
