import type { ReactNode } from "react";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

type CalloutProps = {
  type?: "info" | "tip" | "warning";
  title?: string;
  children: ReactNode;
};

const styles = {
  info: "border-line bg-surface text-muted",
  tip: "border-accent/40 bg-surface text-muted",
  warning: "border-danger/40 bg-surface text-muted",
};

const icons = {
  info: Info,
  tip: Lightbulb,
  warning: TriangleAlert,
};

const iconColors = {
  info: "text-accent-2",
  tip: "text-accent",
  warning: "text-danger",
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div className={cn("my-8 flex gap-3 border p-4 md:p-5", styles[type])}>
      <Icon
        size={16}
        className={cn("mt-0.5 shrink-0", iconColors[type])}
        aria-hidden="true"
      />
      <div className="text-sm leading-relaxed [&_a]:underline [&_p]:m-0 [&_p+p]:mt-2">
        {title && <p className="mb-1.5 font-medium text-foreground">{title}</p>}
        {children}
      </div>
    </div>
  );
}
