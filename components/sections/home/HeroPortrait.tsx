import Image from "next/image";
import { profile } from "@/data/profile";

/**
 * Foto hero statis. Caption berada di bawah garis hairline, tanpa efek
 * mengikuti kursor.
 */
export default function HeroPortrait() {
  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={profile.heroPhoto}
          alt={`Foto ${profile.name}`}
          fill
          priority
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-3">
        <span className="label-mono text-foreground">{profile.name}</span>
        <span className="label-mono text-right text-faint">{profile.role}</span>
      </figcaption>
    </figure>
  );
}
