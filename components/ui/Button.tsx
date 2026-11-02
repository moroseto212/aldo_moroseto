import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  external?: boolean;
  className?: string;
};

const variants = {
  primary:
    "border border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground",
  secondary:
    "border border-line text-foreground hover:border-foreground/40 hover:bg-white/[0.04]",
  ghost: "border border-transparent text-muted hover:text-foreground",
};

const sizes = {
  sm: "h-9 gap-2 px-3.5 text-[10px]",
  md: "h-11 gap-2 px-5 text-[11px]",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  external = false,
  className,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center rounded-none font-mono font-medium uppercase tracking-[0.14em] transition-colors duration-200",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      {children}
      <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <svg
          width="12"
          height="12"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          className="hidden sm:block"
        >
          <path
            d="M3 11L11 3M11 3H5M11 3V9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={false} className={classes}>
      {content}
    </Link>
  );
}
