import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { profile } from "@/data/profile";
import { formatNumber } from "@/lib/format";
import { contact } from "@/data/site";

const skills = ["React", "Next.js", "TypeScript", "Motion", "Tailwind CSS"];

export default function Hero() {
  return (
    <section className="pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="container-page">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
            <span className="label-mono text-foreground">Beranda</span>
            <span className="label-mono hidden text-faint sm:block">
              Arsip — {formatNumber(profile.yearsOfExperience)} tahun
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal>
              <Badge dot>{contact.availability}</Badge>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 text-display text-balance">
                Saya membangun website yang cepat, jelas, dan hidup.
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                {profile.intro}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/portofolio">Lihat portofolio</Button>
                <Button href="/kontak" variant="secondary">
                  Mulai proyek
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-9 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-5 font-mono text-[10px] tracking-[0.12em] text-faint uppercase">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Reveal delay={0.15} y={20}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden border border-line">
                  <Image
                    src={profile.photo}
                    alt={`Foto ${profile.name}`}
                    fill
                    priority
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-3">
                  <span className="label-mono text-foreground">{profile.name}</span>
                  <span className="label-mono text-right text-faint">{profile.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          </aside>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <dt className="label-mono text-faint">Lokasi</dt>
            <dd className="mt-2 text-sm text-foreground">{profile.location}</dd>
          </div>
          <div>
            <dt className="label-mono text-faint">Pengalaman</dt>
            <dd className="mt-2 text-sm text-foreground">
              {formatNumber(profile.yearsOfExperience)} tahun
            </dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="label-mono text-faint">Waktu respons</dt>
            <dd className="mt-2 text-sm text-foreground">{contact.responseTime}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
