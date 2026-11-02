import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { contact, navigation, site, socials } from "@/data/site";
import { getCurrentYear } from "@/lib/time";

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="z-0 border-t border-line bg-surface md:sticky md:bottom-0">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-2xl font-medium tracking-tight md:text-3xl">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-5 inline-block py-2 font-mono text-[11px] tracking-[0.06em] text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {contact.email}
            </a>
          </div>

          <nav className="md:col-span-3" aria-label="Navigasi footer">
            <p className="label-mono text-faint">Halaman</p>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="inline-block py-2.5 text-sm text-muted transition-colors hover:text-foreground sm:inline sm:py-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="label-mono text-faint">Terhubung</p>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-2.5 text-sm text-muted transition-colors hover:text-foreground sm:py-0"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-faint">{contact.location}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-[0.08em] text-faint uppercase">
            © {year} {site.name}. Semua hak dilindungi.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="font-mono text-[10px] tracking-[0.08em] text-faint uppercase">
              Dibangun dengan Next.js &amp; Motion
            </p>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 py-3.5 font-mono text-[10px] tracking-[0.08em] text-muted uppercase transition-colors hover:text-foreground sm:py-0"
            >
              Kembali ke atas
              <ArrowUp size={11} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
