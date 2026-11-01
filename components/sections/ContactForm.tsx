"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { contact } from "@/data/site";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const service = String(form.get("service") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (name.length < 2) nextErrors.name = "Mohon isi nama Anda.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Format email belum benar.";
    if (message.length < 10) nextErrors.message = "Ceritakan sedikit lebih detail (min. 10 karakter).";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Permintaan proyek — ${service} dari ${name}`);
    const body = encodeURIComponent(
      `Halo Aldo,\n\nNama: ${name}\nEmail: ${email}\nLayanan: ${service}\n\nPesan:\n${message}\n`,
    );

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-5 border border-line bg-surface p-8">
        <span className="flex h-9 w-9 items-center justify-center border border-line text-accent">
          <CheckCircle2 size={18} aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-medium tracking-tight">Email Anda siap dikirim</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Aplikasi email Anda telah dibuka dengan pesan yang sudah terisi. Tekan kirim di sana
            — saya akan membalas dalam {contact.responseTime.toLowerCase()}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
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

      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="service" className="label-mono text-faint">
          Layanan yang dibutuhkan
        </label>
        <select
          id="service"
          name="service"
          defaultValue={serviceOptions[0]}
          className={cn(inputClasses, "min-w-0")}
        >
          {serviceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

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

      <button
        type="submit"
        className="group mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-none border border-foreground bg-foreground px-6 font-mono text-[11px] font-medium tracking-[0.14em] text-background uppercase transition-colors hover:bg-transparent hover:text-foreground sm:w-auto"
      >
        Kirim pesan
        <Send
          size={13}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </button>

      <p className="mt-4 text-xs leading-relaxed text-faint">
        Pesan akan terbuka lewat aplikasi email Anda. Lebih nyaman chat? Gunakan WhatsApp
        untuk balasan lebih cepat.
      </p>
    </form>
  );
}
