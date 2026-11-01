"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { contact } from "@/data/site";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "error";

const serviceOptions = [
  "Company Profile & Landing Page",
  "Web Application & Dashboard",
  "Lainnya",
];

const inputClasses =
  "w-full rounded-none border border-line bg-background px-4 py-3 text-base text-foreground placeholder:text-faint transition-colors focus:border-accent focus:outline-none md:text-sm";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [service, setService] = useState(serviceOptions[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const selectedService = String(form.get("service") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const botcheck = form.get("botcheck");

    const nextErrors: Errors = {};
    if (name.length < 2) nextErrors.name = "Mohon isi nama Anda.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Format email belum benar.";
    if (message.length < 10)
      nextErrors.message = "Ceritakan sedikit lebih detail (min. 10 karakter).";

    setErrors(nextErrors);
    setStatus("idle");
    if (Object.keys(nextErrors).length > 0) return;

    // Honeypot: hanya bot yang mengisi ini. Pura-pura berhasil tanpa memanggil API.
    if (botcheck) {
      setSent(true);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "Form belum dikonfigurasi. Kirim pesan langsung lewat email berikut.",
      );
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      // FormData dipakai (bukan JSON) agar tidak memicu preflight CORS.
      const payload = new FormData();
      payload.set("access_key", accessKey);
      payload.set("subject", `Permintaan proyek — ${selectedService} dari ${name}`);
      payload.set("from_name", "Website Aldo Moroseto");
      payload.set("name", name);
      payload.set("email", email);
      payload.set("service", selectedService);
      payload.set("message", message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });
      const result = (await response.json()) as { success?: boolean };

      if (!response.ok || !result.success) throw new Error("Pengiriman ditolak.");

      setStatus("idle");
      setSent(true);
    } catch {
      setStatus("error");
      setErrorMessage(
        "Pesan belum terkirim. Periksa koneksi Anda lalu coba lagi, atau kirim langsung lewat email.",
      );
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-5 border border-line bg-surface p-8">
        <span className="flex h-9 w-9 items-center justify-center border border-line text-accent">
          <CheckCircle2 size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-medium tracking-tight">Pesan terkirim</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Terima kasih, pesan Anda sudah masuk ke email saya. {contact.responseTime}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setErrors({});
          }}
          className="label-mono text-muted underline decoration-line underline-offset-4 transition-colors hover:text-foreground"
        >
          Tulis pesan lain
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="min-w-0 border border-line bg-surface p-6 md:p-8"
    >
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="label-mono text-faint">
            Nama
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            placeholder="Nama lengkap Anda"
            className={cn(inputClasses, errors.name && "border-danger")}
          />
          {errors.name && (
            <p role="alert" className="text-xs text-danger">
              {errors.name}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="label-mono text-faint">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nama@perusahaan.com"
            className={cn(inputClasses, errors.email && "border-danger")}
          />
          {errors.email && (
            <p role="alert" className="text-xs text-danger">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="label-mono text-faint">Layanan yang dibutuhkan</legend>
        <div className="mt-2.5 grid gap-px border border-line bg-line">
          {serviceOptions.map((option, index) => {
            const isActive = service === option;

            return (
              <label
                key={option}
                className={cn(
                  "flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:-outline-offset-1 has-[:focus-visible]:outline-accent md:gap-4",
                  isActive ? "bg-surface-2" : "bg-background hover:bg-surface",
                )}
              >
                <input
                  type="radio"
                  name="service"
                  value={option}
                  checked={isActive}
                  onChange={() => setService(option)}
                  className="sr-only appearance-none rounded-none"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-3.5 w-3.5 shrink-0 items-center justify-center border transition-colors",
                    isActive ? "border-foreground" : "border-foreground/30",
                  )}
                >
                  {isActive && <span className="h-1.5 w-1.5 bg-foreground" />}
                </span>
                <span className="label-mono w-6 shrink-0 text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "text-sm transition-colors",
                    isActive ? "text-foreground" : "text-muted",
                  )}
                >
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className="label-mono text-faint">
          Pesan
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          placeholder="Ceritakan tentang proyek Anda: tujuan, target waktu, dan kisaran anggaran jika ada."
          className={cn(inputClasses, "resize-y", errors.message && "border-danger")}
        />
        {errors.message && (
          <p role="alert" className="text-xs text-danger">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="mt-6 border border-danger/40 bg-danger/5 px-4 py-3 text-xs leading-relaxed text-danger"
        >
          {errorMessage}{" "}
          <a
            href={`mailto:${contact.email}`}
            className="underline decoration-danger/40 underline-offset-4"
          >
            {contact.email}
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-none border border-foreground bg-foreground px-6 font-mono text-[11px] font-medium tracking-[0.14em] text-background uppercase transition-colors hover:bg-transparent hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-foreground disabled:hover:text-background sm:w-auto"
      >
        {status === "submitting" ? "Mengirim…" : "Kirim pesan"}
        <Send
          size={13}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>

      <p className="mt-4 text-xs leading-relaxed text-faint">
        Pesan dikirim langsung ke email saya. Lebih nyaman chat? Gunakan WhatsApp untuk balasan
        lebih cepat.
      </p>
    </form>
  );
}
