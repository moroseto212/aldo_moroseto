const tools = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Motion",
  "Figma",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Prisma",
  "Vercel",
  "Storybook",
];

function ToolItems() {
  return (
    <>
      {tools.map((tool) => (
        <li
          key={tool}
          className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase"
        >
          {tool}
        </li>
      ))}
    </>
  );
}

export default function ToolList() {
  return (
    <section
      className="border-t border-line py-8 md:py-10"
      aria-label="Teknologi yang digunakan"
    >
      <div className="container-page">
        <div className="grid gap-4 md:grid-cols-12 md:items-baseline md:gap-8">
          <p className="label-mono font-semibold text-faint md:col-span-3">
            Alat yang dipakai sehari-hari
          </p>

          {/* Desktop: daftar statis rata kanan seperti sebelumnya. */}
          <ul className="hidden flex-wrap gap-x-5 gap-y-2 md:col-span-9 md:flex md:justify-end">
            <ToolItems />
          </ul>

          {/* Mobile: satu baris berjalan (marquee). Salinan kedua hanya untuk
              visual loop dan disembunyikan dari pembaca layar. */}
          <div className="marquee-viewport md:hidden">
            <div className="marquee-track">
              <ul className="marquee-copy">
                <ToolItems />
              </ul>
              <ul className="marquee-copy" aria-hidden="true">
                <ToolItems />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
