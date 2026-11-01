import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/motion/Reveal";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CtaSection from "@/components/sections/CtaSection";
import Button from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Jasa pembuatan website company profile & landing page, serta web application & dashboard — dikerjakan dari awal sampai peluncuran.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Layanan"
        title="Dari brief sampai website meluncur"
        description="Dua layanan yang bisa berdiri sendiri atau digabung dalam satu proyek. Semua dikerjakan langsung oleh saya — tanpa lempar ke tim tak dikenal."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/kontak">Minta estimasi</Button>
          <Button href="#faq" variant="secondary">
            Pertanyaan umum
          </Button>
        </div>
      </PageHero>

      <div className="divide-y divide-line">
        {services.map((service, index) => {
          const Icon = service.icon;
          const number = String(index + 1).padStart(2, "0");

          return (
            <section
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 py-16 md:py-24"
            >
              <div className="container-page">
                <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
                  <Reveal className="lg:col-span-5">
                    <div className="lg:sticky lg:top-24">
                      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                        <span className="label-mono text-faint">Layanan {number}</span>
                        <Icon size={16} className="self-center text-faint" aria-hidden="true" />
                      </div>

                      <h2 className="text-heading mt-5 text-balance">{service.title}</h2>
                      <p className="mt-4 text-base leading-relaxed text-muted">
                        {service.description}
                      </p>

                      <dl className="mt-7 grid grid-cols-2 gap-px border border-line bg-line">
                        <div className="bg-surface px-4 py-4">
                          <dt className="label-mono text-faint">Estimasi waktu</dt>
                          <dd className="mt-2.5 font-mono text-sm text-foreground">
                            {service.duration}
                          </dd>
                        </div>
                        <div className="bg-surface px-4 py-4">
                          <dt className="label-mono text-faint">Mulai dari</dt>
                          <dd className="mt-2.5 font-mono text-sm text-foreground">
                            {service.priceFrom}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-6">
                        <Button href="/kontak" variant="secondary" size="sm">
                          Konsultasi layanan ini
                        </Button>
                      </div>
                    </div>
                  </Reveal>

                  <div className="lg:col-span-7">
                    <Reveal delay={0.1}>
                      <p className="label-mono border-b border-line pb-3 text-faint">
                        Yang Anda dapatkan
                      </p>
                      <ul>
                        {service.deliverables.map((item, itemIndex) => (
                          <li
                            key={item}
                            className="flex items-start gap-4 border-b border-line py-4"
                          >
                            <span className="label-mono shrink-0 pt-0.5 text-faint">
                              {String(itemIndex + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm leading-relaxed text-muted">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Reveal>

                    <Reveal delay={0.18}>
                      <p className="label-mono mt-12 border-b border-line pb-3 text-faint">
                        Alur kerja
                      </p>
                      <ol>
                        {service.process.map((step) => (
                          <li
                            key={step.step}
                            className="grid gap-1 border-b border-line py-5 sm:grid-cols-[4rem_1fr] sm:gap-4"
                          >
                            <span className="font-mono text-[11px] tracking-[0.14em] text-faint">
                              {step.step}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-foreground">{step.title}</p>
                              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                                {step.description}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </Reveal>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              label="FAQ"
              title="Pertanyaan yang sering masuk"
              description="Belum menemukan jawabannya? Kirim pesan, saya balas dalam 1×24 jam."
            />
          </div>
          <div className="lg:col-span-8" id="faq">
            <Reveal delay={0.1}>
              <FaqAccordion />
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaSection
        title="Tidak yakin harus mulai dari mana?"
        description="Ceritakan masalahnya, saya bantu tentukan layanan mana yang benar-benar Anda butuhkan — termasuk jika jawabannya bukan jasa saya."
      />
    </>
  );
}
