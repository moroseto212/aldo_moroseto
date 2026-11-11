export type ProjectCategory =
  | "Web App"
  | "Company Profile"
  | "E-Commerce"
  | "Dashboard"
  | "Social Media"
  | "Game";

export type Project = {
  slug: string;
  title: string;
  client: string;
  categories: ProjectCategory[];
  year: number;
  role: string;
  stack: string[];
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  results: { value: string; label: string }[];
  accent: "violet" | "teal" | "amber" | "rose" | "sky" | "lime";
  cover?: string;
  /** screenshot halaman admin — dipakai di kartu daftar/beranda (bergantian saat hover) */
  coverAlt?: string;
  coverFull?: boolean;
  /**
   * Cara menampilkan cover di kartu daftar. `blur` menampilkan gambar utuh
   * (object-contain) di atas latar gambar yang sama, diperbesar dan diblur.
   */
  coverFit?: "blur";
  /** dimensi asli cover & coverAlt (agar rasio benar di halaman detail) */
  coverWidth?: number;
  coverHeight?: number;
  coverAltWidth?: number;
  coverAltHeight?: number;
  link?: string;
  /** akses panel admin, ditampilkan sebagai catatan di halaman detail */
  admin?: { path: string; email: string; password: string };
};

export const projectCategories: ProjectCategory[] = [
  "Web App",
  "Company Profile",
  "E-Commerce",
  "Dashboard",
  "Social Media",
  "Game",
];

export const projects: Project[] = [
  {
    slug: "burungin",
    title: "Burungin — Game",
    client: "Personal Project",
    categories: ["Game"],
    year: 2026,
    role: "Developer",
    stack: ["HTML", "CSS", "JavaScript"],
    summary:
      "Game Burungin sederhana berbasis browser. Terinspirasi dari game klasik dengan mekanik lompat, skor, dan tantangan yang adiktif.",
    problem:
      "Mencoba menerapkan logika game sederhana di browser untuk melatih pemahaman JavaScript, event handling, dan animasi.",
    solution:
      "Saya membangun Burungin berbasis HTML, CSS, dan JavaScript dengan kontrol klik/spacebar, deteksi tabrakan, sistem skor, serta tampilan responsif.",
    features: [
      "Kontrol klik atau tekan spasi untuk terbang",
      "Sistem skor otomatis",
      "Deteksi tabrakan",
      "Animasi halus berbasis canvas",
      "Dapat dimainkan langsung di browser",
    ],
    results: [
      { value: "100%", label: "berjalan di browser" },
      { value: "Vanilla JS", label: "tanpa framework" },
      { value: "Playable", label: "langsung bisa dimainkan" },
    ],
    accent: "lime",
    cover: "/burungin-cover.jpeg",
    coverFull: true,
    coverWidth: 1312,
    coverHeight: 816,
    link: "https://moroseto212.github.io/Flappy-Bird/",
  },
  {
    slug: "dish-drink",
    title: "Dish Drink — Company Profile & Social Media",
    client: "Dish Drink",
    categories: ["Social Media"],
    year: 2026,
    role: "Desainer & Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Supabase"],
    summary:
      "Website profil untuk brand makanan & minuman, lengkap dengan katalog menu, galeri konten sosial, dan halaman admin.",
    problem:
      "Dish Drink hanya mengandalkan media sosial sehingga belum punya kanal resmi: menu, kontak, dan identitas brand tercerai-berai dan sulit ditemukan calon pelanggan.",
    solution:
      "Saya membangun website profil yang merangkum brand dalam satu alur: hero yang menggugah selera, katalog menu dengan foto menggoda, sorotan konten sosial, serta panel admin agar tim bisa memperbarui menu dan konten sendiri.",
    features: [
      "Halaman profil, menu, dan kontak",
      "Katalog menu dengan filter kategori",
      "Galeri sorotan konten media sosial",
      "Panel admin untuk mengelola menu & konten",
      "Desain responsif mobile-first",
    ],
    results: [
      { value: "100%", label: "konten dikelola mandiri via admin" },
      { value: "1,3s", label: "waktu muat halaman menu" },
      { value: "97", label: "skor Lighthouse mobile" },
    ],
    accent: "rose",
    cover: "/dish-drink-pic.png",
    coverAlt: "/dish-drink-admin-pic.png",
    coverFull: true,
    coverWidth: 1920,
    coverHeight: 4403,
    coverAltWidth: 1920,
    coverAltHeight: 948,
    link: "https://dish-drink.vercel.app/",
  },
  {
    slug: "alat-berat",
    title: "Alat Berat — Company Profile & Dashboard",
    client: "Alat Berat",
    categories: ["Company Profile", "E-Commerce", "Dashboard", "Web App"],
    year: 2026,
    role: "Desainer & Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Supabase"],
    summary:
      "Website profil perusahaan alat berat lengkap dengan katalog unit, halaman admin, dan dashboard pengelolaan data.",
    problem:
      "Perusahaan alat berat belum punya kanal digital resmi: calon pembeli sulit melihat daftar unit dan spesifikasinya, sementara tim internal masih mencatat data secara manual sehingga sulit diperbarui.",
    solution:
      "Saya membangun website profil dengan katalog unit yang rapi, halaman detail spesifikasi, serta panel admin untuk mengelola konten dan data. Tim internal bisa memperbarui daftar unit sendiri tanpa menyentuh kode, dan pengunjung mendapat informasi yang selalu terbaru.",
    features: [
      "Halaman profil, layanan, dan kontak perusahaan",
      "Katalog unit alat berat dengan filter kategori",
      "Halaman detail unit lengkap dengan spesifikasi",
      "Panel admin untuk mengelola konten & data",
      "Dashboard ringkasan data dengan visualisasi",
    ],
    results: [
      { value: "100%", label: "konten dikelola mandiri via admin" },
      { value: "1,4s", label: "waktu muat halaman katalog" },
      { value: "96", label: "skor Lighthouse mobile" },
    ],
    accent: "amber",
    cover: "/alat-berat-pic.png",
    coverAlt: "/alat-berat-admin-pic.png",
    coverFull: true,
    coverWidth: 1920,
    coverHeight: 8622,
    coverAltWidth: 1920,
    coverAltHeight: 948,
    link: "https://penyewaan-berat.vercel.app/",
    admin: {
      path: "/admin",
      email: "admin123@gmail.com",
      password: "admin123",
    },
  },
  {
    slug: "noxen",
    title: "Noxen — Company Profile",
    client: "Noxen",
    categories: ["Company Profile", "Web App", "E-Commerce"],
    year: 2026,
    role: "Desainer & Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    summary:
      "Website company profile yang tegas dan modern: memperkenalkan brand, layanan, dan nilai perusahaan dalam satu alur yang jelas.",
    problem:
      "Noxen belum punya kehadiran online yang meyakinkan, sehingga calon klien sulit menilai kredibilitas dan cakupan layanannya dari satu sumber.",
    solution:
      "Saya membangun website profil dengan struktur yang bersih: hero yang menonjolkan positioning, halaman layanan yang mudah dipindai, bukti sosial, dan jalur kontak yang jelas — semuanya responsif dan cepat di ponsel.",
    features: [
      "Struktur halaman yang jelas & mudah dipindai",
      "Desain responsif mobile-first",
      "Animasi halus tanpa mengorbankan performa",
      "SEO teknis: metadata, sitemap, schema",
      "Form kontak yang siap menerima lead",
    ],
    results: [
      { value: "1,2s", label: "waktu muat halaman utama" },
      { value: "98", label: "skor Lighthouse mobile" },
      { value: "+31%", label: "kunjungan ke halaman kontak" },
    ],
    accent: "sky",
    cover: "/noxen-pic.png",
    coverFull: true,
    coverWidth: 1920,
    coverHeight: 6637,
    link: "https://noxen-three.vercel.app",
  },
  {
    slug: "periodiklab",
    title: "PeriodikLab — Tabel Periodik & Laboratorium Kimia",
    client: "Personal Project",
    categories: ["Web App"],
    year: 2026,
    role: "Developer",
    stack: ["Vite", "React", "Zustand", "Zod"],
    summary:
      "Tabel periodik interaktif berbahasa Indonesia: 118 unsur, laboratorium reaksi virtual, dan tantangan kimia — tanpa akun dan tanpa backend.",
    problem:
      "Belajar kimia butuh data unsur, ruang mencoba reaksi, dan latihan soal sekaligus. Tanpa satu alat terpadu, prosesnya berpindah-pindah dan sulit diulang.",
    solution:
      "PeriodikLab menyatukan 118 unsur, 128 reaksi, dan 40 soal dalam satu aplikasi React. Tabel bisa dicari dan difilter, tiap unsur punya panel sifat dan tren, laboratorium mencocokkan rasio atom dengan kondisi reaksi, dan tantangan memberi umpan balik langsung. Semua progres tersimpan lokal di perangkat.",
    features: [
      "Tabel 118 unsur dengan pencarian Ctrl K dan 10 filter kategori",
      "Panel detail unsur: sifat, kulit elektron, tren, dan peringatan bahaya",
      "Laboratorium reaksi: susun atom, atur kondisi, bagikan eksperimen lewat tautan",
      "Tantangan tiga tingkat dengan umpan balik dan pembahasan tiap soal",
      "PWA dengan tema gelap/terang dan progres tersimpan lokal tanpa akun",
    ],
    results: [
      { value: "118", label: "unsur & 120 spesies" },
      { value: "128", label: "reaksi terkurasi" },
      { value: "40", label: "soal tantangan" },
    ],
    accent: "violet",
    cover: "/periodiklab-pic.png",
    coverFull: true,
    coverFit: "blur",
    coverWidth: 1918,
    coverHeight: 946,
    link: "https://table-periodic-moroseto.vercel.app/",
  },
];

export const testimonials = [
  {
    quote:
      "Komunikasinya jelas, jadwalnya tepat, dan animasi yang dibuat terasa mahal tanpa mengorbankan kecepatan situs. Klien kami puas sejak versi pertama.",
    name: "Bagas Nugroho",
    role: "Founder, Kreasi Studio",
  },
];
