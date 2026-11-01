import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  dot?: boolean;
};

export default function Badge({ children, className, dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-2 border border-line bg-transparent px-2.5 py-1.5 text-faint",
        className,
      )}
    >
      {dot && <span className="h-1.5 w-1.5 bg-success animate-pulse-dot" />}
      {children}
    </span>
  );
}
