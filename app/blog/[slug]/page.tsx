import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MDXContent from "@/components/mdx/MDXContent";
import Reveal from "@/components/motion/Reveal";
import CtaSection from "@/components/sections/CtaSection";
import { formatDate } from "@/lib/format";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/posts";

type PostParams = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: PostParams;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Artikel tidak ditemukan" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

async function getPost(params: PostParams) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return post;
}

/**
 * Shell bersama untuk semua link ke /blog/[slug] — tidak membaca `params`,
 * jadi shell-nya bisa dipakai ulang oleh setiap navigasi.
 */
export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <>
      <article>
        <header className="border-b border-line pb-14 pt-28 md:pb-20 md:pt-36">
          <div className="container-page">
            <Reveal>
              <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
                <Link
                  href="/blog"
                  prefetch={false}
                  className="label-mono group inline-flex items-center gap-2 py-1 text-foreground transition-colors hover:text-muted"
                >
                  <ArrowLeft
                    size={12}
                    className="transition-transform duration-200 group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                  Semua artikel
                </Link>
                <span className="label-mono hidden text-faint sm:block">Blog — Arsip</span>
              </div>
            </Reveal>

            <Suspense fallback={<PostHeadingSkeleton />}>
              <PostHeading params={params} />
            </Suspense>
          </div>
        </header>

        <Suspense fallback={<PostBodySkeleton />}>
          <PostBody params={params} />
        </Suspense>
      </article>

      <CtaSection />
    </>
  );
}

async function PostHeading({ params }: { params: PostParams }) {
  const post = await getPost(params);
  const posts = await getAllPosts();
  const position = posts.findIndex((item) => item.slug === post.slug) + 1;

  return (
    <>
      <Reveal delay={0.06}>
        <div className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="label-mono text-faint">
            {String(position).padStart(2, "0")} / {String(posts.length).padStart(2, "0")}
          </span>
          <span aria-hidden="true" className="text-faint">
            —
          </span>
          <span className="label-mono text-muted">
            {post.category}
            {post.tags.length > 0 && ` · ${post.tags.join(" · ")}`}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <h1 className="text-display mt-6 max-w-4xl text-balance">{post.title}</h1>
      </Reveal>

      <Reveal delay={0.18}>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {post.description}
        </p>
        <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-line pt-4 text-faint">
          <span className="label-mono">{formatDate(post.date)}</span>
          <span aria-hidden="true" className="text-faint">
            ·
          </span>
          <span className="label-mono">{post.readingTime}</span>
        </div>
      </Reveal>
    </>
  );
}

async function PostBody({ params }: { params: PostParams }) {
  const post = await getPost(params);

  const posts = await getAllPosts();
  const index = posts.findIndex((item) => item.slug === post.slug);
  const previous = index > 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <div className="container-page py-12 md:py-16">
      <Reveal className="mx-auto max-w-3xl">
        <div className="border-t border-line pt-8 md:pt-10">
          <MDXContent source={post.content} />
        </div>
      </Reveal>

      <nav
        className="mx-auto mt-14 grid max-w-3xl gap-3 border-t border-line pt-8 sm:grid-cols-2 sm:gap-6"
        aria-label="Navigasi artikel"
      >
        {previous ? (
          <Link
            href={`/blog/${previous.slug}`}
            prefetch={false}
            className="group border border-line p-5 transition-colors duration-300 hover:border-foreground/30 focus-visible:outline-none"
          >
            <span className="label-mono flex items-center gap-2 text-faint transition-colors group-hover:text-muted">
              <ArrowLeft size={11} aria-hidden="true" />
              Artikel sebelumnya
            </span>
            <p className="mt-3 text-sm font-medium text-balance transition-colors group-hover:text-accent">
              {previous.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/blog/${next.slug}`}
            prefetch={false}
            className="group border border-line p-5 text-right transition-colors duration-300 hover:border-foreground/30 focus-visible:outline-none sm:col-start-2"
          >
            <span className="label-mono flex items-center justify-end gap-2 text-faint transition-colors group-hover:text-muted">
              Artikel berikutnya
              <ArrowRight size={11} aria-hidden="true" />
            </span>
            <p className="mt-3 text-sm font-medium text-balance transition-colors group-hover:text-accent">
              {next.title}
            </p>
          </Link>
        )}
      </nav>
    </div>
  );
}

function PostHeadingSkeleton() {
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
      <div className="mt-7 h-4 w-48 border-t border-line bg-surface animate-pulse" />
    </div>
  );
}

function PostBodySkeleton() {
  return (
    <div className="container-page py-12 md:py-16" aria-hidden="true">
      <div className="mx-auto max-w-3xl">
        <div className="border-t border-line pt-8 md:pt-10">
          <div className="space-y-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((line) => (
              <div
                key={line}
                className={`h-4 bg-surface animate-pulse ${line === 7 ? "w-1/3" : line % 4 === 3 ? "w-4/5" : "w-full"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <nav className="mx-auto mt-14 grid max-w-3xl gap-3 border-t border-line pt-8 sm:grid-cols-2 sm:gap-6">
        <div className="h-24 border border-line bg-surface animate-pulse" />
        <div className="hidden h-24 border border-line bg-surface animate-pulse sm:col-start-2 sm:block" />
      </nav>
    </div>
  );
}
