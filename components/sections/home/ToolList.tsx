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

export default function ToolList() {
  return (
    <section
      className="border-t border-line py-8 md:py-10"
      aria-label="Teknologi yang digunakan"
    >
      <div className="container-page">
        <div className="grid gap-4 md:grid-cols-12 md:items-baseline md:gap-8">
          <p className="label-mono text-faint md:col-span-3">
            Alat yang dipakai sehari-hari
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-9 md:justify-end">
            {tools.map((tool) => (
              <li
                key={tool}
                className="font-mono text-[10px] tracking-[0.12em] text-muted uppercase"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
