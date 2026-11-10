"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { contact, navigation } from "@/data/site";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-300 md:pt-0",
          scrolled || open
            ? "border-b border-line bg-background/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between gap-6 transition-[height] duration-300 ease-out md:h-16",
            open ? "h-16" : scrolled ? "h-14" : "h-16",
          )}
        >
          <Link
            href="/"
            prefetch={false}
            className="group -m-1 flex items-center gap-3 p-1"
            aria-label="Aldo Moroseto — kembali ke beranda"
          >
            <Image
              src={profile.photo}
              alt={`Foto ${profile.name}`}
              width={72}
              height={72}
              priority
              className="h-8 w-8 border border-line object-cover transition-colors group-hover:border-foreground/40"
            />
            <span className="label-mono hidden text-foreground transition-colors group-hover:text-muted sm:block">
              Aldo Moroseto
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigasi utama">
            {navigation.map((item, index) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className="label-mono group relative flex items-baseline gap-1.5 py-2"
                >
                  <span
                    aria-hidden="true"
                    className="text-[9px] text-faint transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "transition-colors duration-200",
                      active ? "text-foreground" : "text-muted group-hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </span>
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-foreground"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground/60 transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/kontak"
              prefetch={false}
              className="hidden h-10 items-center gap-2 border border-foreground bg-foreground px-4 font-mono text-[10px] font-medium tracking-[0.14em] text-background uppercase transition-colors hover:bg-transparent hover:text-foreground sm:inline-flex"
            >
              Hubungi saya
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-label={open ? "Tutup menu" : "Buka menu"}
              className="hidden h-10 w-10 items-center justify-center border border-line text-foreground transition-colors hover:border-foreground/40 md:flex lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-foreground/40" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-background pt-[calc(4rem+env(safe-area-inset-top))] md:pt-[4rem] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav
              className="container-page my-auto flex flex-col py-8"
              aria-label="Navigasi mobile"
            >
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.05 + index * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={item.href}
                    prefetch={false}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 border-b border-line py-4"
                  >
                    <span aria-hidden="true" className="label-mono w-6 shrink-0 text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-2xl font-normal tracking-tight text-foreground text-balance">
                      {item.label}
                    </span>
                    <span className="max-w-[45%] text-right text-[11px] leading-snug text-faint transition-colors group-hover:text-muted">
                      {item.description}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container-page flex flex-col gap-3 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
              <Link
                href="/kontak"
                prefetch={false}
                onClick={() => setOpen(false)}
                className="inline-flex h-12 items-center justify-center border border-foreground bg-foreground font-mono text-[11px] font-medium tracking-[0.14em] text-background uppercase"
              >
                Hubungi saya
              </Link>
              <a
                href={`mailto:${contact.email}`}
                className="py-2 text-center font-mono text-[11px] tracking-[0.06em] text-muted"
              >
                {contact.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
