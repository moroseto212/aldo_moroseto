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
        className="flex flex-wrap items-baseline gap-x-5 border-y border-line py-2.5"
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
                "label-mono relative flex items-baseline gap-1.5 py-2 transition-colors duration-200 focus-visible:outline-none",
                isActive ? "text-foreground" : "text-faint hover:text-muted",
              )}
            >
              {filter}
              <span className="font-mono text-[9px] tracking-[0.08em] text-faint">
                {String(count).padStart(2, "0")}
              </span>
              {isActive && (
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-foreground" />
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
