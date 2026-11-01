import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import { contact, site, socials } from "@/data/site";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Aldo Moroseto untuk proyek company profile & landing page atau web application & dashboard. Balasan dalam 1×24 jam.",
};

const channels = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
    note: "Untuk brief dan detail proyek",
  },
  {
    label: "WhatsApp",
    value: contact.phone,
    href: `https://wa.me/${contact.phoneHref}`,
    note: "Untuk pertanyaan cepat",
  },
  {
    label: "Lokasi",
    value: contact.location,
    href: null,
    note: `Zona waktu ${contact.timezone} · bisa remote ke mana saja`,
  },
  {
    label: "Ketersediaan",
    value: contact.availability,
    href: null,
    note: contact.responseTime,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Kontak"
        title="Mari bicarakan proyek Anda"
        description="Isi form di bawah atau hubungi langsung lewat email dan WhatsApp. Saya balas dalam 1×24 jam dengan estimasi awal tanpa biaya."
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal className="min-w-0 lg:col-span-7">
              <ContactForm />
            </Reveal>

            <div className="min-w-0 lg:col-span-5">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <span className="label-mono text-faint">Saluran langsung</span>
                <span className="label-mono text-faint">
                  {String(channels.length).padStart(2, "0")} kanal
                </span>
              </div>

              <ul>
                {channels.map((channel, index) => {
                  const body = (
                    <>
                      <span className="label-mono shrink-0 pt-0.5 text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="label-mono block text-faint">{channel.label}</span>
                        <span className="mt-2 block font-mono text-sm break-all text-foreground">
                          {channel.value}
                        </span>
                        <span className="mt-1.5 block text-xs leading-relaxed text-muted">
                          {channel.note}
                        </span>
                      </span>
                      {channel.href && (
                        <ArrowUpRight
                          size={14}
                          className="mt-0.5 shrink-0 text-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                          aria-hidden="true"
                        />
                      )}
                    </>
                  );

                  return (
                    <Reveal key={channel.label} delay={index * 0.06}>
                      <li className="border-b border-line">
                        {channel.href ? (
                          <a
                            href={channel.href}
                            target={channel.href.startsWith("http") ? "_blank" : undefined}
                            rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="group flex items-start gap-4 py-5 transition-colors hover:bg-surface/60 focus-visible:outline-none"
                          >
                            {body}
                          </a>
                        ) : (
                          <div className="flex items-start gap-4 py-5">{body}</div>
                        )}
                      </li>
                    </Reveal>
                  );
                })}
              </ul>

              <Reveal delay={0.3}>
                <div className="border-t border-line pt-4">
                  <p className="label-mono text-faint">Temukan saya di</p>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {socials.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase underline-offset-4 transition-colors hover:text-foreground hover:underline"
                        >
                          {social.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-mono text-[11px] tracking-[0.08em] break-all text-faint">
                    {site.url.replace("https://", "")}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
