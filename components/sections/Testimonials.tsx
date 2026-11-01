import Reveal from "@/components/motion/Reveal";
import { testimonials } from "@/data/projects";

export default function Testimonials() {
  const [lead, ...rest] = testimonials;

  if (!lead) return null;

  return (
    <section className="border-t border-line py-16 md:py-24">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <span className="label-mono flex items-center gap-2.5 text-faint">
              <span aria-hidden="true" className="h-px w-6 bg-foreground/30" />
              Testimoni
            </span>
            <h2 className="text-heading mt-4 text-balance">
              Kata mereka yang bekerja sama
            </h2>
          </div>

          <div className="md:col-span-9">
            <Reveal>
              <figure>
                <blockquote className="max-w-2xl text-xl leading-[1.5] text-balance md:text-2xl">
                  {lead.quote}
                </blockquote>
                <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-4">
                  <span className="label-mono text-foreground">{lead.name}</span>
                  <span className="label-mono text-faint">{lead.role}</span>
                </figcaption>
              </figure>
            </Reveal>

            {rest.length > 0 && (
              <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-2 md:gap-10">
                {rest.map((testimonial, index) => (
                  <Reveal key={testimonial.name} delay={0.08 + index * 0.06}>
                    <figure>
                      <blockquote className="text-sm leading-relaxed text-muted">
                        {testimonial.quote}
                      </blockquote>
                      <figcaption className="mt-4">
                        <p className="label-mono text-foreground">{testimonial.name}</p>
                        <p className="label-mono mt-1.5 text-faint">{testimonial.role}</p>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
