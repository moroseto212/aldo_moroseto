import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { formatDate } from "@/lib/format";
import type { PostMeta } from "@/lib/posts";

type PostRowProps = {
  post: PostMeta;
  index?: number;
};

export default function PostRow({ post, index = 0 }: PostRowProps) {
  return (
    <Reveal delay={Math.min(index * 0.05, 0.2)}>
      <Link
        href={`/blog/${post.slug}`}
        className="group grid gap-4 border-b border-line py-6 focus-visible:outline-none md:grid-cols-12 md:gap-8 md:py-7"
      >
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5 md:col-span-3 md:flex-col md:items-start md:gap-2">
          <span className="label-mono text-faint">{String(index + 1).padStart(2, "0")}</span>
          <time className="font-mono text-[11px] tracking-[0.08em] text-faint">
            {formatDate(post.date)}
          </time>
          <span className="label-mono text-muted md:mt-1">{post.category}</span>
        </div>

        <div className="min-w-0 md:col-span-7">
          <h2 className="text-lg font-medium tracking-tight text-balance transition-colors duration-200 group-hover:text-accent md:text-xl">
            {post.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted line-clamp-2 md:text-base">
            {post.description}
          </p>
          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {post.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] tracking-[0.08em] text-faint">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-baseline justify-between gap-3 md:col-span-2 md:flex-col md:items-end md:justify-start">
          <span className="label-mono text-faint">{post.readingTime}</span>
          <span className="flex items-center gap-1.5 text-muted transition-colors group-hover:text-foreground">
            <span className="label-mono">Baca</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
