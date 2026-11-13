import { projects } from "./projects";

export const profile = {
  name: "Aldo Moroseto",
  shortName: "Aldo",
  initials: "AM",
  photo: "/foto-profil.jpg",
  heroPhoto: "/foto-profil-hero-2.png",
  role: "Website Developer",
  location: "Bekasi, Indonesia",
  yearsOfExperience: 3.5,
  heroRole: "website cepat, indah, dan siap tumbuh",
  intro:
    "Saya membangun website dan aplikasi web yang ringan, responsif, dan enak dipakai — dari landing page sampai dashboard kompleks.",
  bio: [
    "Saya Aldo Moroseto, mahasiswa semester akhir jurusan Teknologi Informasi di Universitas Bina Sarana Informatika dengan latar belakang pendidikan Teknik Komputer dan Jaringan dari SMK Binakarya Mandiri 2. Perjalanan akademis ini memberikan saya pemahaman yang kokoh, mulai dari pondasi infrastruktur jaringan dan sistem komputer hingga arsitektur perangkat lunak modern. Pemahaman menyeluruh tentang bagaimana sistem bekerja secara mendasar memperkuat kemampuan analisis teknis saya, sehingga saya mampu melihat pengembangan teknologi tidak hanya dari sisi kode aplikasi, tetapi juga dari efisiensi infrastruktur dan integrasi sistem pendukungnya.",
    "Memiliki ketertarikan yang sangat besar pada dunia web development, saya terus mengasah keahlian dalam merancang dan merawat aplikasi web modern yang responsif, interaktif, serta berorientasi pada pengalaman pengguna. Melalui berbagai proyek pengembangan web dan pengalaman berkolaborasi dalam tim, saya terbiasa menerapkan framework dan teknologi terkini untuk menghadirkan solusi digital yang efisien dan fungsional.",
    "Dengan kombinasi latar belakang teknis yang kuat, semangat belajar yang tinggi, serta komitmen pada kualitas, saya siap berkontribusi secara profesional dalam menghadapi tantangan pengembangan teknologi web di industri digital.",
  ],
  principles: [
    {
      title: "Konten dulu, animasi kemudian",
      description:
        "Animasi harus memperjelas pesan, bukan menutupinya. Setiap gerakan punya tujuan.",
    },
    {
      title: "Mobile-first, selalu",
      description:
        "Layout dirancang dari layar terkecil lebih dulu, lalu tumbuh dengan anggun ke desktop.",
    },
    {
      title: "Performa adalah fitur",
      description:
        "Core Web Vitals hijau, gambar teroptimasi, dan JavaScript seperlunya saja.",
    },
    {
      title: "Kode yang bisa dilanjutkan",
      description:
        "Struktur rapi, komponen terpakai ulang, dan dokumentasi singkat untuk tim berikutnya.",
    },
  ],
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    period: "2023 — Sekarang",
    role: "Website Developer (Freelance)",
    company: "Mandiri",
    location: "Bekasi",
    highlights: [
      "Menangani website company profile, landing page, toko online, dan portal UMKM",
      "Membangun relasi jangka panjang dengan klien berulang dan menangani proyek end-to-end: desain, kode, dan optimasi",
      "Menjaga Core Web Vitals hijau dan pengalaman mobile yang rapi di setiap proyek",
    ],
  },
];

export type SkillGroup = {
  name: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    name: "Pengembangan Web",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML & CSS"],
  },
  {
    name: "Backend",
    items: ["Node.js", "REST & GraphQL", "PostgreSQL", "Supabase", "Firebase", "Prisma"],
  },
  {
    name: "Desain",
    items: ["Figma", "Design System", "Prototyping", "Aksesibilitas", "Desain Responsif"],
  },
  {
    name: "Alat & Praktik",
    items: ["Git & GitHub", "CI/CD", "Playwright", "Core Web Vitals", "SEO Teknis", "Agile"],
  },
];

export type Stat = {
  value: number;
  suffix: string;
  label: string;
  description: string;
};

// Jumlah klien nyata (proyek personal tidak dihitung) — dihitung dari data
// proyek supaya angka di beranda tidak perlu diperbarui manual.
const clientCount = new Set(
  projects
    .filter((project) => project.client !== "Personal Project")
    .map((project) => project.client),
).size;

export const stats: Stat[] = [
  {
    value: projects.length,
    suffix: "",
    label: "Proyek selesai",
    description: "Proyek klien & personal yang tuntas",
  },
  {
    value: profile.yearsOfExperience,
    suffix: " thn",
    label: "Pengalaman",
    description: "Industri web dan produk digital",
  },
  { value: clientCount, suffix: "", label: "Klien", description: "Brand & bisnis yang bekerja sama" },
  { value: 1, suffix: " s", label: "Target LCP", description: "Standar performa di tiap proyek" },
];
