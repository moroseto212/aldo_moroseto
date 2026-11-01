import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center pt-28 md:pt-36">
      <div className="container-page py-24">
        <Reveal>
          <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
            <span className="label-mono text-foreground">Error</span>
            <span className="label-mono text-faint">Arsip — Aldo Moroseto</span>
          </div>

          <p className="mt-10 font-mono text-[clamp(4rem,16vw,9rem)] leading-none tracking-tight text-gradient">
            404
          </p>
          <h1 className="mt-8 text-heading">Halaman tidak ditemukan</h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
            Halaman yang Anda cari mungkin sudah dipindahkan atau alamatnya salah ketik.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/">Kembali ke beranda</Button>
            <Button href="/portofolio" variant="secondary">
              Lihat portofolio
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
