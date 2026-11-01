import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { profile } from "@/data/profile";

export default function AboutPreview() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <SectionHeading
              label="Tentang"
              title="Detail-oriented, hasil-oriented"
              description="Saya bekerja dekat dengan konten dan tujuan bisnis Anda — bukan hanya menghias tampilan."
            />

            <Reveal delay={0.1}>
              <p className="max-w-xl text-base leading-[1.8] text-muted md:text-lg">
                {profile.bio[1]}
              </p>
            </Reveal>

            <ol className="mt-10 border-t border-line">
              {profile.principles.slice(0, 3).map((principle, index) => (
                <li key={principle.title} className="border-b border-line">
                  <Reveal delay={0.15 + index * 0.06}>
                    <div className="grid grid-cols-[2.5rem_1fr] gap-4 py-5">
                      <span className="label-mono pt-0.5 text-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{principle.title}</p>
                        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
                          {principle.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={0.35}>
              <div className="mt-9">
                <Button href="/tentang" variant="secondary">
                  Kenali lebih jauh
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal
            className="md:col-span-4 md:col-start-9 lg:sticky lg:top-24 lg:self-start"
            delay={0.12}
            y={16}
          >
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden border border-line">
                <Image
                  src={profile.photo}
                  alt={`Foto ${profile.name}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-3 border-t border-line pt-3">
                <span className="label-mono text-foreground">{profile.name}</span>
                <span className="label-mono text-faint">{profile.location}</span>
              </figcaption>
              <div className="mt-4">
                <Badge dot>Terbuka untuk kolaborasi</Badge>
              </div>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
