import type { LucideIcon } from "lucide-react";
import { Code2, LayoutTemplate } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: LucideIcon;
  deliverables: string[];
  process: { step: string; title: string; description: string }[];
  duration: string;
  priceFrom: string;
};

export const services: Service[] = [
  {
    slug: "website-company-profile",
    title: "Company Profile & Landing Page",
    summary:
      "Website bisnis yang cepat, rapi, dan siap meyakinkan pengunjung sejak layar pertama.",
    description:
      "Cocok untuk UMKM, startup, dan brand yang butuh website profesional dengan informasi lengkap: profil, layanan, portofolio, blog, dan kontak. Setiap halaman disusun agar pengunjung menemukan jawabannya tanpa harus berpikir keras.",
    icon: LayoutTemplate,
    deliverables: [
      "Struktur halaman & copywriting dasar",
      "Desain responsif mobile-first",
      "Form kontak & integrasi peta",
      "SEO teknis: metadata, sitemap, schema",
      "Pelatihan singkat pengelolaan konten",
    ],
    process: [
      { step: "01", title: "Brief & riset", description: "Memetakan tujuan bisnis, audiens, dan pesan utama website." },
      { step: "02", title: "Wireframe & desain", description: "Menyusun struktur halaman lalu dipoles menjadi desain final." },
      { step: "03", title: "Pengembangan", description: "Membangun website responsif dengan animasi halus dan performa tinggi." },
      { step: "04", title: "QA & peluncuran", description: "Uji lintas device, optimasi, lalu online dan serah terima." },
    ],
    duration: "2–4 minggu",
    priceFrom: "Rp 1 juta",
  },
  {
    slug: "web-application",
    title: "Web Application & Dashboard",
    summary:
      "Aplikasi web khusus: dashboard, portal klien, hingga produk SaaS dengan alur yang logis.",
    description:
      "Saya membangun aplikasi web dari sisi tampilan sampai integrasi API, termasuk autentikasi, tabel data kompleks, filter, dan visualisasi. Fokusnya selalu sama: antarmuka yang rumit terasa sederhana saat dipakai.",
    icon: Code2,
    deliverables: [
      "Arsitektur komponen & state management",
      "Halaman dashboard dan laporan",
      "Integrasi API / autentikasi",
      "Role & hak akses pengguna",
      "Pengujian alur inti (E2E)",
    ],
    process: [
      { step: "01", title: "Discovery", description: "Menyusun daftar fitur, prioritas, dan peta alur pengguna." },
      { step: "02", title: "Prototipe", description: "Prototipe interaktif untuk validasi alur sebelum coding." },
      { step: "03", title: "Iterasi", description: "Sprint dua mingguan dengan demo rutin bersama Anda." },
      { step: "04", title: "Rilis", description: "Deploy, monitoring, dan pendampingan pasca-peluncuran." },
    ],
    duration: "4–10 minggu",
    priceFrom: "Rp 3,5 juta",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Berapa lama satu proyek website selesai?",
    answer:
      "Landing page atau company profile umumnya 2–4 minggu, aplikasi web 4–10 minggu tergantung kompleksitas. Jadwal pasti disepakati setelah brief pertama.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "Umumnya 50% di muka saat brief disepakati dan 50% sebelum website diluncurkan. Untuk paket bulanan, dibayar di awal periode.",
  },
  {
    question: "Apakah bisa memakai desain dari Figma saya sendiri?",
    answer:
      "Bisa. Saya menerima file Figma dan menerjemakkannya ke kode produksi, termasuk komponen dan animasinya.",
  },
  {
    question: "Apakah website bisa saya edit sendiri setelah jadi?",
    answer:
      "Ya. Jika proyek memakai headless CMS atau CMS sederhana, saya beri pelatihan singkat plus dokumentasi agar tim Anda bisa mengelola konten.",
  },
  {
    question: "Apakah ada garansi setelah peluncuran?",
    answer:
      "Ada. Selama 30 hari setelah peluncuran, bug yang muncul dari pengerjaan saya saya perbaiki tanpa biaya tambahan.",
  },
  {
    question: "Bisakah mengerjakan proyek jarak jauh?",
    answer:
      "Bisa, saya terbiasa bekerja remote dengan klien di berbagai kota. Komunikasi lewat WhatsApp, email, dan sesi video terjadwal.",
  },
];
