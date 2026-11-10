"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useTransform } from "motion/react";
import { profile } from "@/data/profile";
import { useMotionTilt } from "@/lib/use-motion-tilt";

/**
 * Foto hero yang bergerak halus mengikuti kursor (desktop). Caption bergerak
 * berlawanan arah dengan amplitudo lebih kecil supaya terbaca seperti lapisan
 * tipis.
 */
export default function HeroPortrait() {
  const frame = useRef<HTMLDivElement>(null);
  const { x, y, rotateX, rotateY } = useMotionTilt(frame, {
    translate: 5,
    rotate: 1.8,
    pointer: "viewport",
  });

  const captionX = useTransform(x, (value) => value * -0.4);
  const captionY = useTransform(y, (value) => value * -0.4);

  return (
    <figure>
      <motion.div
        ref={frame}
        data-hero-portrait
        style={{ x, y, rotateX, rotateY, transformPerspective: 1000 }}
        className="relative aspect-[4/5] overflow-hidden border border-line will-change-transform"
      >
        <Image
          src={profile.photo}
          alt={`Foto ${profile.name}`}
          fill
          priority
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-top"
        />
      </motion.div>
      <motion.figcaption
        style={{ x: captionX, y: captionY }}
        className="mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-3"
      >
        <span className="label-mono text-foreground">{profile.name}</span>
        <span className="label-mono text-right text-faint">{profile.role}</span>
      </motion.figcaption>
    </figure>
  );
}
