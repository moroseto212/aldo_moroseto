import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProjectVisual from "@/components/project/ProjectVisual";
import Reveal from "@/components/motion/Reveal";
import CtaSection from "@/components/sections/CtaSection";
import Button from "@/components/ui/Button";
import { projects } from "@/data/projects";

type ProjectParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: ProjectParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return { title: "Proyek tidak ditemukan" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

async function getProject(params: ProjectParams) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) notFound();

  return project;
}

/**
 * Shell bersama untuk semua link ke /portofolio/[slug] — tidak membaca `params`,
 * jadi shell-nya bisa dipakai ulang oleh setiap navigasi.
 */
export default function ProjectDetailPage({ params }: PageProps<"/portofolio/[slug]">) {
  return (
    <>
      <article>
        <header className="border-b border-line pb-14 pt-28 md:pb-20 md:pt-36">
          <div className="container-page">
            <Reveal>
              <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
                <Link
                  href="/portofolio"
                  prefetch={false}
                  className="label-mono group inline-flex items-center gap-2 py-1 text-foreground transition-colors hover:text-muted"
                >
                  <ArrowLeft
                    size={12}
                    className="transition-transform duration-200 group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                  Semua proyek
                </Link>
                <span className="label-mono hidden text-faint sm:block">
                  Portofolio — Arsip
                </span>
              </div>
            </Reveal>

            <Suspense fallback={<ProjectHeadingSkeleton />}>
              <ProjectHeading params={params} />
            </Suspense>
          </div>
        </header>

        <Suspense fallback={<ProjectBodySkeleton />}>
          <ProjectBody params={params} />
        </Suspense>
      </article>

      <CtaSection />
    </>
  );
}

async function ProjectHeading({ params }: { params: ProjectParams }) {
  const project = await getProject(params);
  const position = projects.findIndex((item) => item.slug === project.slug) + 1;

  return (
    <>
      <Reveal delay={0.06}>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="label-mono text-faint">
            {String(position).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="text-faint">
            —
          </span>
          <span className="label-mono text-muted">
            {project.categories.join(" · ")} · {project.year} · {project.role}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <h1 className="text-display mt-6 max-w-4xl text-balance">{project.title}</h1>
      </Reveal>

      <Reveal delay={0.18}>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {project.summary}
        </p>
      </Reveal>
    </>
  );
}

async function ProjectBody({ params }: { params: ProjectParams }) {
  const project = await getProject(params);

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="container-page py-12 md:py-16">
      <Reveal>
        <ProjectVisual
          project={project}
          fullHeight={project.coverFull}
          className={project.coverFull ? undefined : "aspect-[16/9]"}
        />
      </Reveal>

      <Reveal delay={0.1}>
        <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {[
            { label: "Klien", value: project.client },
            { label: "Peran", value: project.role },
            { label: "Tahun", value: String(project.year) },
            { label: "Kategori", value: project.categories.join(" · ") },
          ].map((item) => (
            <div key={item.label} className="bg-surface px-5 py-4">
              <dt className="label-mono text-faint">{item.label}</dt>
              <dd className="mt-2 text-sm font-medium text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <Reveal>
            <section className="border-t border-line pt-5">
              <p className="label-mono text-faint">Masalah</p>
              <p className="mt-4 text-base leading-[1.85] text-muted md:text-lg">
                {project.problem}
              </p>
            </section>
          </Reveal>

          <Reveal delay={0.06}>
            <section className="mt-10 border-t border-line pt-5">
              <p className="label-mono text-faint">Solusi</p>
              <p className="mt-4 text-base leading-[1.85] text-muted md:text-lg">
                {project.solution}
              </p>
            </section>
          </Reveal>

          <Reveal delay={0.12}>
            <section className="mt-10 border-t border-line pt-5">
              <p className="label-mono text-faint">Fitur utama</p>
              <ul className="mt-5 grid gap-px bg-line sm:grid-cols-2">
                {project.features.map((feature, featureIndex) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 bg-background p-4 text-sm leading-relaxed text-muted"
                  >
                    <span className="label-mono shrink-0 pt-0.5 text-faint">
                      {String(featureIndex + 1).padStart(2, "0")}
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        <aside className="md:col-span-4 md:col-start-9">
          <div className="lg:sticky lg:top-24">
            <Reveal delay={0.1}>
              <div className="border border-line">
                <p className="label-mono border-b border-line px-5 py-3 text-faint">Dampak</p>
                <ul>
                  {project.results.map((result) => (
                    <li
                      key={result.label}
                      className="border-b border-line px-5 py-5 last:border-b-0"
                    >
                      <p className="font-mono text-2xl tracking-tight text-foreground md:text-3xl">
                        {result.value}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{result.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-5 border border-line">
                <p className="label-mono border-b border-line px-5 py-3 text-faint">
                  Teknologi
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 px-5 py-4">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                {project.link && (
                  <div className="border-t border-line p-4">
                    <Button href={project.link} variant="secondary" size="sm" external>
                      Kunjungi website
                    </Button>
                  </div>
                )}
              </div>
            </Reveal>

            {project.admin && (
              <Reveal delay={0.22}>
                <div className="mt-5 border border-line">
                  <p className="label-mono border-b border-line px-5 py-3 text-faint">
                    Akses Admin
                  </p>
                  <p className="px-5 pt-4 text-sm leading-relaxed text-muted">
                    Ingin mengakses bagian admin? Tambahkan{" "}
                    <code className="border border-line px-1.5 py-0.5 font-mono text-xs text-foreground">
                      {project.admin.path}
                    </code>{" "}
                    pada bagian URL.
                  </p>
                  <dl className="space-y-3 px-5 py-4">
                    <div>
                      <dt className="label-mono text-faint">Email</dt>
                      <dd className="mt-1.5 font-mono text-sm break-all text-foreground">
                        {project.admin.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="label-mono text-faint">Password</dt>
                      <dd className="mt-1.5 font-mono text-sm break-all text-foreground">
                        {project.admin.password}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            )}
          </div>
        </aside>
      </div>

      <nav
        className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2 sm:gap-6"
        aria-label="Navigasi proyek"
      >
        <Link
          href={`/portofolio/${previous.slug}`}
          prefetch={false}
          className="group border border-line p-5 transition-colors duration-300 hover:border-foreground/30 focus-visible:outline-none"
        >
          <span className="label-mono flex items-center gap-2 text-faint transition-colors group-hover:text-muted">
            <ArrowLeft size={11} aria-hidden="true" />
            Sebelumnya
          </span>
          <p className="mt-3 text-sm font-medium text-balance transition-colors group-hover:text-accent">
            {previous.title}
          </p>
        </Link>
        <Link
          href={`/portofolio/${next.slug}`}
          prefetch={false}
          className="group border border-line p-5 text-right transition-colors duration-300 hover:border-foreground/30 focus-visible:outline-none sm:col-start-2"
        >
          <span className="label-mono flex items-center justify-end gap-2 text-faint transition-colors group-hover:text-muted">
            Berikutnya
            <ArrowRight size={11} aria-hidden="true" />
          </span>
          <p className="mt-3 text-sm font-medium text-balance transition-colors group-hover:text-accent">
            {next.title}
          </p>
        </Link>
      </nav>
    </div>
  );
}

function ProjectHeadingSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="h-3 w-16 bg-surface animate-pulse" />
        <span className="h-3 w-40 bg-surface animate-pulse" />
      </div>
      <div className="mt-6 h-14 w-full max-w-3xl bg-surface animate-pulse" />
      <div className="mt-3 h-14 w-3/5 max-w-2xl bg-surface animate-pulse" />
      <div className="mt-6 h-5 w-full max-w-2xl bg-surface animate-pulse" />
      <div className="mt-2.5 h-5 w-4/5 max-w-xl bg-surface animate-pulse" />
    </div>
  );
}

function ProjectBodySkeleton() {
  return (
    <div className="container-page py-12 md:py-16" aria-hidden="true">
      <div className="aspect-[16/9] w-full border border-line bg-surface animate-pulse" />

      <dl className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="bg-surface px-5 py-4">
            <div className="h-3 w-12 bg-line animate-pulse" />
            <div className="mt-3 h-4 w-20 bg-line animate-pulse" />
          </div>
        ))}
      </dl>

      <div className="mt-14 grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="space-y-4 md:col-span-7">
          {[0, 1, 2, 3, 4].map((line) => (
            <div
              key={line}
              className={`h-4 bg-surface animate-pulse ${line === 4 ? "w-1/2" : "w-full"}`}
            />
          ))}
        </div>
        <div className="border border-line bg-surface p-6 md:col-span-4 md:col-start-9">
          <div className="h-3 w-16 bg-line animate-pulse" />
          <div className="mt-6 h-8 w-24 bg-line animate-pulse" />
          <div className="mt-4 h-8 w-32 bg-line animate-pulse" />
        </div>
      </div>
    </div>
  );
}
