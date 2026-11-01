import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";

type PageHeroProps = {
  label: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export default function PageHero({ label, title, description, children }: PageHeroProps) {
  return (
    <section className="border-b border-line pb-14 pt-28 md:pb-20 md:pt-36">
      <div className="container-page">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
            <span className="label-mono text-foreground">{label}</span>
            <span className="label-mono hidden text-faint sm:block">
              Arsip — Aldo Moroseto
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-9 max-w-4xl text-display text-balance">{title}</h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        </Reveal>

        {children && (
          <Reveal delay={0.24}>
            <div className="mt-8">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
