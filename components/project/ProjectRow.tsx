import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectVisual from "@/components/project/ProjectVisual";
import Reveal from "@/components/motion/Reveal";
import Tilt from "@/components/motion/Tilt";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/cn";

type ProjectRowProps = {
  project: Project;
  index: number;
  showSummary?: boolean;
  /** Aktifkan tilt kursor — hanya dipakai di beranda. */
  tilt?: boolean;
};

export default function ProjectRow({
  project,
  index,
  showSummary = true,
  tilt = false,
}: ProjectRowProps) {
  const reversed = index % 2 === 1;

  return (
    <Reveal delay={Math.min(index * 0.08, 0.24)}>
      <Link
        href={`/portofolio/${project.slug}`}
        prefetch={false}
        className={cn(
          "group grid gap-6 py-8 focus-visible:outline-none md:grid-cols-12 md:items-start md:gap-8 md:py-10",
          index > 0 && "border-t border-line",
        )}
      >
        <span className="label-mono text-faint md:order-1 md:col-span-1 md:pt-1">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div
          className={cn(
            "md:col-span-6",
            reversed ? "md:order-3" : "md:order-2",
          )}
        >
          {tilt ? (
            <Tilt>
              <ProjectVisual project={project} />
            </Tilt>
          ) : (
            <ProjectVisual project={project} />
          )}
        </div>

        <div
          className={cn(
            "md:col-span-5 md:pt-1",
            reversed ? "md:order-2" : "md:order-3",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="label-mono text-faint">
              {project.client} · {project.year} · {project.categories.join(" / ")}
            </p>
            <span className="hidden size-8 shrink-0 items-center justify-center border border-line text-muted transition-colors duration-300 group-hover:border-foreground/40 group-hover:text-foreground sm:flex">
              <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </div>

          <h3 className="mt-4 text-xl font-medium tracking-tight text-balance transition-colors duration-300 group-hover:text-accent md:text-2xl">
            {project.title}
          </h3>

          {showSummary && (
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              {project.summary}
            </p>
          )}

          <div className="mt-6 border-t border-line pt-4">
            <p className="font-mono text-[10px] leading-relaxed tracking-[0.12em] text-faint uppercase">
              {project.stack.join(" / ")}
            </p>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
