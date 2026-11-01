import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";
import Reveal from "@/components/motion/Reveal";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Section({ id, children, className, as: Tag = "section" }: SectionProps) {
  return (
    <Tag id={id} className={cn("relative py-16 md:py-24", className)}>
      <div className="container-page">{children}</div>
    </Tag>
  );
}

type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-3 md:mb-14",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {label && (
        <span className="label-mono flex items-center gap-2.5 text-faint">
          <span aria-hidden="true" className="h-px w-6 bg-foreground/30" />
          {label}
        </span>
      )}
      <h2 className="text-display-sm max-w-3xl text-balance">{title}</h2>
      {description && (
        <p
          className={cn(
            "max-w-xl text-base leading-relaxed text-muted md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
