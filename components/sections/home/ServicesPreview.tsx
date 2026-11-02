import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/Section";
import { services } from "@/data/services";

export default function ServicesPreview() {
  const preview = services.slice(0, 2);

  return (
    <section className="border-y border-line py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          label="Layanan"
          title="Bisa saya bantu apa"
          description="Dari website profil sampai aplikasi web kompleks — dikerjakan satu orang dari desain hingga peluncuran."
        />

        <div className="border-t border-line">
          {preview.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.slug} delay={Math.min(index * 0.07, 0.2)}>
                <Link
                  href={`/layanan#${service.slug}`}
                  prefetch={false}
                  className="group grid gap-5 border-b border-line py-7 transition-colors duration-300 hover:bg-surface/60 focus-visible:outline-none md:grid-cols-12 md:items-start md:gap-8 md:py-9"
                >
                  <span className="label-mono text-faint md:col-span-1 md:pt-1.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="md:col-span-7">
                    <div className="flex items-center gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center border border-line bg-background text-faint transition-colors duration-300 group-hover:text-foreground">
                        <Icon size={15} aria-hidden="true" />
                      </span>
                      <h3 className="text-xl font-medium tracking-tight text-balance transition-colors duration-300 group-hover:text-accent md:text-2xl">
                        {service.title}
                      </h3>
                    </div>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                      {service.summary}
                    </p>
                  </div>

                  <div className="md:col-span-4 md:pl-4">
                    <p className="font-mono text-sm tracking-[0.04em] text-foreground">
                      {service.priceFrom}
                    </p>
                    <p className="label-mono mt-1.5 text-faint">{service.duration}</p>
                    <span className="label-mono mt-4 inline-flex items-center gap-2 text-muted transition-colors duration-300 group-hover:text-foreground">
                      Selengkapnya
                      <ArrowRight
                        size={12}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
