import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { contact } from "@/data/site";

type CtaSectionProps = {
  title?: string;
  description?: string;
};

export default function CtaSection({
  title = "Punya ide? Mari wujudkan bersama",
  description = "Ceritakan kebutuhan Anda — saya akan balas dengan estimasi ruang lingkup, jadwal, dan biaya dalam 1×24 jam.",
}: CtaSectionProps) {
  return (
    <section className="border-t border-line py-16 md:py-24">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-7">
            <span className="label-mono text-faint">Selanjutnya</span>
            <h2 className="mt-4 max-w-2xl text-display-sm text-balance">{title}</h2>
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.1}>
            <p className="max-w-md text-base leading-relaxed text-muted">{description}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button href="/kontak">Hubungi saya</Button>
              <Button href="/portofolio" variant="secondary">
                Lihat karya dulu
              </Button>
            </div>

            <p className="mt-5 text-sm text-faint">
              atau email langsung ke{" "}
              <a
                href={`mailto:${contact.email}`}
                className="inline-block py-1.5 font-mono text-[11px] tracking-[0.06em] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-foreground sm:inline sm:py-0"
              >
                {contact.email}
              </a>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
