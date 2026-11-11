"use client";

import { useState } from "react";
import ProjectRow from "@/components/project/ProjectRow";
import { projectCategories, projects, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/cn";

const filters: Array<ProjectCategory | "Semua"> = ["Semua", ...projectCategories];

export default function ProjectFilter() {
  const [active, setActive] = useState<ProjectCategory | "Semua">("Semua");
  const filtered =
    active === "Semua"
      ? projects
      : projects.filter((project) => project.categories.includes(active));

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter kategori proyek"
        className="grid grid-cols-2 gap-x-5 border-t border-line md:grid-cols-3 lg:flex lg:flex-wrap lg:items-baseline lg:gap-x-5 lg:border-y lg:py-2.5"
      >
        {filters.map((filter) => {
          const count =
            filter === "Semua"
              ? projects.length
              : projects.filter((project) => project.categories.includes(filter)).length;
          const isActive = active === filter;

          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(filter)}
              className={cn(
                "label-mono relative flex min-h-11 w-full items-center justify-between gap-1.5 border-b py-3 text-[10px] tracking-[0.12em] transition-colors duration-200 focus-visible:outline-none",
                "md:text-[0.6875rem] md:tracking-[0.16em]",
                "lg:min-h-0 lg:w-auto lg:items-baseline lg:justify-start lg:border-0 lg:py-2",
                filter === "Semua" && "col-span-2 md:col-span-3",
                isActive
                  ? "border-foreground text-foreground"
                  : "border-line text-faint hover:text-muted",
              )}
            >
              {filter}
              <span className="font-mono text-[9px] tracking-[0.08em] text-faint">
                {String(count).padStart(2, "0")}
              </span>
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 hidden h-px bg-foreground lg:block"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-10 md:mt-14">
        {filtered.map((project, index) => (
          <ProjectRow key={project.slug} project={project} index={index} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-sm text-faint">Belum ada proyek di kategori ini.</p>
      )}
    </>
  );
}
