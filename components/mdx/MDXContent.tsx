import Link from "next/link";
import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Callout from "./Callout";
import { cn } from "@/lib/cn";

function Heading({
  children,
  className,
  level,
}: {
  children?: ReactNode;
  className?: string;
  level: 2 | 3 | 4;
}) {
  const Tag = `h${level}` as "h2" | "h3" | "h4";

  return (
    <Tag
      className={cn(
        "scroll-mt-24 tracking-tight text-balance",
        level === 2 && "mt-12 mb-4 border-t border-line pt-6 text-2xl font-medium md:text-3xl",
        level === 3 && "mt-9 mb-3 text-xl font-medium md:text-2xl",
        level === 4 && "mt-7 mb-2 text-lg font-medium",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

function MdxLink({ href = "", children }: { href?: string; children?: ReactNode }) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground underline decoration-accent underline-offset-4 transition-colors hover:decoration-foreground"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-foreground underline decoration-accent underline-offset-4 transition-colors hover:decoration-foreground"
    >
      {children}
    </Link>
  );
}

const components = {
  h2: (props: { children?: ReactNode }) => <Heading {...props} level={2} />,
  h3: (props: { children?: ReactNode }) => <Heading {...props} level={3} />,
  h4: (props: { children?: ReactNode }) => <Heading {...props} level={4} />,
  p: ({ children }: { children?: ReactNode }) => (
    <p className="my-5 break-words text-base leading-[1.8] text-muted md:text-[1.0625rem]">{children}</p>
  ),
  a: MdxLink,
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="my-5 space-y-2.5 pl-1">{children}</ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="my-5 list-decimal space-y-2.5 pl-5 marker:text-faint">{children}</ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="relative break-words pl-6 text-base leading-[1.8] text-muted before:absolute before:left-0 before:top-[0.95em] before:h-px before:w-3 before:bg-faint before:content-[''] [&>strong]:text-foreground">
      {children}
    </li>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="my-8 border-l border-accent pl-5 text-lg leading-relaxed text-foreground italic md:text-xl">
      {children}
    </blockquote>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-medium text-foreground">{children}</strong>
  ),
  em: ({ children }: { children?: ReactNode }) => <em className="italic">{children}</em>,
  hr: () => <hr className="my-10 border-line" />,
  code: ({ children, className }: { children?: ReactNode; className?: string }) => {
    const isBlock = Boolean(className?.includes("language-"));

    if (isBlock) {
      return <code className={className}>{children}</code>;
    }

    return (
      <code className="border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.875em] text-accent-2">
        {children}
      </code>
    );
  },
  pre: ({ children, className }: { children?: ReactNode; className?: string }) => (
    <pre
      className={cn(
        "my-7 overflow-x-auto border border-line bg-surface p-4 font-mono text-[0.8125rem] leading-relaxed text-foreground md:p-5",
        className,
      )}
    >
      {children}
    </pre>
  ),
  table: ({ children }: { children?: ReactNode }) => (
    <div className="my-7 overflow-x-auto border border-line">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }: { children?: ReactNode }) => (
    <th className="border-b border-line bg-surface px-4 py-3 font-mono text-[10px] font-medium tracking-[0.12em] text-foreground uppercase">
      {children}
    </th>
  ),
  td: ({ children }: { children?: ReactNode }) => (
    <td className="border-b border-line px-4 py-3 text-muted last:border-b-0">{children}</td>
  ),
  Callout,
};

export default function MDXContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
