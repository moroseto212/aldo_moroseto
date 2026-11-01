import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/motion/Reveal";
import StatsSection from "@/components/sections/home/StatsSection";
import Button from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { experience, profile, skills } from "@/data/profile";
import { formatNumber } from "@/lib/format";

export const metadata: Metadata = {
  title: "Tentang",
  description: `Kenali perjalanan, prinsip kerja, dan keahlian ${profile.name} — ${profile.role} dari Bekasi, Indonesia.`,
};

const summary = [
  { label: "Nama", value: profile.name },
  { label: "Peran", value: profile.role },
  { label: "Lokasi", value: profile.location },
  { label: "Pengalaman", value: `${formatNumber(profile.yearsOfExperience)} tahun` },
  { label: "Bahasa", value: "Indonesia, Inggris" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Tentang"
        title="Tiga setengah tahun merawat detail di balik layar"
        description="Perjalanan dari developer freelance di Bekasi hingga menjadi website developer yang membangun produk digital — dengan prinsip kerja yang selalu sama."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/kontak">Ajak kerja sama</Button>
          <Button href="/portofolio" variant="secondary">
            Lihat portofolio
          </Button>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading label="Cerita" title="Sedikit tentang saya" />
            <div className="border-t border-line">
              {profile.bio.map((paragraph, index) => (
                <Reveal key={index} delay={index * 0.08}>
                  <div className="flex gap-4 border-b border-line py-5 md:gap-6 md:py-6">
                    <span className="label-mono shrink-0 pt-1.5 text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-base leading-[1.85] text-muted md:text-lg">{paragraph}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="lg:col-span-5" delay={0.2}>
            <div className="space-y-5 lg:sticky lg:top-24">
              <figure className="mx-auto max-w-sm border border-line bg-surface lg:max-w-none">
                <Image
                  src={profile.photo}
                  alt={`Foto ${profile.name}`}
                  width={720}
                  height={900}
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </figure>

              <div className="border border-line">
                <p className="label-mono border-b border-line px-5 py-3 text-faint">Ringkasan</p>
                <dl className="px-5">
                  {summary.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-3.5 last:border-b-0"
                    >
                      <dt className="label-mono text-faint">{item.label}</dt>
                      <dd className="text-right text-sm font-medium text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="border-t border-line p-4">
                  <Button href="/kontak" variant="secondary" size="sm" className="w-full">
                    Kirim pesan
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <StatsSection />

      <Section>
        <SectionHeading
          label="Perjalanan"
          title="Pengalaman kerja"
          description="Beberapa tahun mengerjakan website untuk klien dari berbagai industri — satu peran, satu standar: kerapihan, kecepatan, dan komunikasi yang jelas."
        />

        <ol className="border-t border-line">
          {experience.map((item, index) => (
            <Reveal key={item.role} delay={index * 0.08}>
              <li className="grid gap-5 border-b border-line py-7 md:grid-cols-12 md:gap-8 md:py-9">
                <div className="md:col-span-4">
                  <span className="label-mono text-faint">
                    {String(index + 1).padStart(2, "0")} — {item.period}
                  </span>
                  <h3 className="mt-3 text-lg font-medium tracking-tight md:text-xl">
                    {item.role}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted">
                    {item.company} · {item.location}
                  </p>
                </div>

                <ul className="md:col-span-8">
                  {item.highlights.map((highlight, highlightIndex) => (
                    <li
                      key={highlight}
                      className="flex gap-4 border-b border-line py-3 text-sm leading-relaxed text-muted last:border-b-0 last:pb-0 first:pt-0"
                    >
                      <span className="label-mono shrink-0 pt-0.5 text-faint">
                        {String(highlightIndex + 1).padStart(2, "0")}
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading
          label="Nilai kerja"
          title="Empat hal yang tidak saya tawar"
          description="Prinsip yang saya bawa ke setiap proyek, dari brief pertama sampai serah terima."
        />
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {profile.principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 0.08}>
              <div className="h-full bg-background p-5 md:p-6">
                <p className="label-mono text-faint">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-base font-medium tracking-tight md:text-lg">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {principle.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading
          label="Keahlian"
          title="Perkakas sehari-hari"
          description="Teknologi yang saya pakai untuk membangun produk — dipilih karena matang, cepat, dan enak dirawat."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {skills.map((group, index) => (
            <Reveal key={group.name} delay={index * 0.08}>
              <div className="border-t border-line pt-4">
                <h3 className="label-mono text-faint">{group.name}</h3>
                <ul className="mt-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-b border-line py-2.5 text-sm text-muted last:border-b-0"
                    >
                      <span aria-hidden="true" className="h-px w-2 shrink-0 bg-foreground/30" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
