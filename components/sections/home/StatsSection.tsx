import Counter from "@/components/motion/Counter";
import Reveal from "@/components/motion/Reveal";
import { stats } from "@/data/profile";

export default function StatsSection() {
  return (
    <section className="border-y border-line">
      <div className="container-page">
        <ul className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {stats.map((stat, index) => (
            <li key={stat.label} className="bg-background">
              <Reveal delay={index * 0.06} className="h-full">
                <div className="flex h-full flex-col justify-between gap-8 px-4 py-7 md:px-6 md:py-9">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="label-mono text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="label-mono text-right text-faint">{stat.label}</span>
                  </div>

                  <div>
                    <p className="text-3xl font-medium tracking-tight whitespace-nowrap md:text-4xl">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-faint">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
