import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Project } from "@/data/projects";

const accents: Record<Project["accent"], string> = {
  violet: "from-violet-500/45 via-indigo-500/15 to-transparent",
  teal: "from-teal-400/45 via-emerald-500/15 to-transparent",
  amber: "from-amber-400/45 via-orange-500/15 to-transparent",
  rose: "from-rose-400/45 via-pink-500/15 to-transparent",
  sky: "from-sky-400/45 via-blue-500/15 to-transparent",
  lime: "from-lime-400/45 via-green-500/15 to-transparent",
};

const dots: Record<Project["accent"], string> = {
  violet: "bg-violet-300",
  teal: "bg-teal-300",
  amber: "bg-amber-300",
  rose: "bg-rose-300",
  sky: "bg-sky-300",
  lime: "bg-lime-300",
};

export default function ProjectVisual({
  project,
  className,
  fullHeight = false,
}: {
  project: Project;
  className?: string;
  fullHeight?: boolean;
}) {
  const grows = fullHeight && Boolean(project.cover);
  // A source narrower than the detail container must not be upscaled: serving a
  // 1920w variant from an 896px file looks blurry. Show it at its natural size
  // (centered) and let the browser use the original file — pixel-for-pixel sharp.
  // `unoptimized` is deliberately NOT used here: it would skip the custom image
  // loader and drop the basePath prefix on GitHub Pages.
  const nativeCover =
    grows && project.coverWidth !== undefined && project.coverWidth < 1200;

  // Kartu dengan coverFit "native" memakai rasio asli cover, bukan 16:10,
  // sehingga gambar tampil penuh tanpa crop dan tanpa ruang kosong.
  const nativeFrame =
    !grows &&
    project.coverFit === "native" &&
    project.coverWidth !== undefined &&
    project.coverHeight !== undefined;

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-line",
        grows || nativeFrame ? "" : "aspect-[16/10]",
        className,
      )}
      style={
        nativeFrame
          ? { aspectRatio: `${project.coverWidth} / ${project.coverHeight}` }
          : undefined
      }
    >
      {project.cover ? (
        grows ? (
          <>
            <Image
              src={project.cover}
              alt={`Tampilan ${project.title}`}
              width={project.coverWidth ?? 1920}
              height={project.coverHeight ?? 6637}
              sizes="(min-width: 1280px) 1216px, 100vw"
              quality={95}
              style={
                nativeCover
                  ? { maxWidth: project.coverWidth, marginInline: "auto" }
                  : undefined
              }
              className="block h-auto w-full"
              priority
            />

            {project.coverAlt && (
              <figure className="mt-6">
                <Image
                  src={project.coverAlt}
                  alt={`Halaman admin ${project.title}`}
                  width={project.coverAltWidth ?? 1920}
                  height={project.coverAltHeight ?? 948}
                  sizes="(min-width: 1280px) 1216px, 100vw"
                  quality={95}
                  className="block h-auto w-full border border-line"
                />
                <figcaption className="mt-3 text-center text-xs text-faint">
                  Halaman admin — kelola konten &amp; data tanpa menyentuh kode
                </figcaption>
              </figure>
            )}
          </>
        ) : (
          <>
            <Image
              src={project.cover}
              alt={`Tampilan ${project.title}`}
              fill
              sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
              quality={95}
              className={cn(
                "object-cover object-top",
                project.coverAlt &&
                  "transition-opacity duration-500 group-hover:opacity-0 group-focus-visible:opacity-0",
              )}
            />
            {project.coverAlt && (
              <Image
                src={project.coverAlt}
                alt={`Halaman admin ${project.title}`}
                fill
                sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
                quality={95}
                className="object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
              />
            )}
          </>
        )
      ) : (
        <>
          {/* decorative layers — ONLY for the mock visual, never on top of a real
              screenshot (they tint/noise/grid the image if left on) */}
          <div className={cn("absolute inset-0 bg-gradient-to-br", accents[project.accent])} />
          <div className="bg-noise absolute inset-0 opacity-[0.15] mix-blend-overlay" />
          <div className="bg-grid absolute inset-0 opacity-40" />

          <div className="absolute inset-x-6 top-8 rounded-xl border border-white/15 bg-black/35 p-3 shadow-2xl shadow-black/40 backdrop-blur-sm transition-transform duration-500 ease-out md:inset-x-10 md:top-12 md:p-4">
            <div className="flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", dots[project.accent])} />
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="ml-3 h-2 flex-1 rounded-full bg-white/10" />
            </div>
            <div className="mt-4 space-y-2.5">
              <div className="h-3 w-2/3 rounded-full bg-white/30" />
              <div className="h-2 w-full rounded-full bg-white/15" />
              <div className="h-2 w-5/6 rounded-full bg-white/15" />
              <div className="flex gap-2 pt-2">
                <div className="h-5 w-16 rounded-full bg-white/25" />
                <div className="h-5 w-12 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </>
      )}

      <div className="absolute bottom-4 left-4 border border-white/10 bg-black/40 px-2.5 py-1 text-[0.65rem] font-medium tracking-wide text-white/70 uppercase backdrop-blur-sm md:bottom-6 md:left-6 md:text-xs">
        {project.categories[0]}
      </div>
    </div>
  );
}
