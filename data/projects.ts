export type ProjectCategory =
  | "Web App"
  | "Landing Page"
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
  "Landing Page",
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
    cover: "/burungin-pic.jpeg",
    coverFull: true,
    coverWidth: 896,
    coverHeight: 1183,
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
    slug: "nusa-finance-dashboard",
    title: "Nusa Finance Dashboard",
    client: "Nusa Fintech",
    categories: ["Dashboard"],
    year: 2026,
    role: "Lead Web Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Supabase"],
    summary:
      "Dashboard analitik untuk tim risk: memantau portofolio pinjaman, tren keterlambatan, dan anomali dalam satu layar.",
    problem:
      "Tim keuangan membuka 6 tools berbeda dan menyusun laporan manual tiap pagi. Data terlambat, kesalahan input sering terjadi, dan keputusan tertunda berhari-hari.",
    solution:
      "Saya membangun satu dashboard terpadu dengan laporan otomatis, filter interaktif, dan sistem peringatan dini. Setiap grafik bisa dibuka detailnya tanpa meninggalkan halaman, dan ekspor laporan tersedia dalam satu klik.",
    features: [
      "Grafik tren interaktif dengan filter rentang waktu",
      "Sistem skor risiko real-time per nasabah",
      "Ekspor laporan PDF & CSV",
      "Notifikasi otomatis untuk anomali keterlambatan",
      "Mode gelap untuk kerja malam",
    ],
    results: [
      { value: "4 jam", label: "hemat waktu laporan harian" },
      { value: "72%", label: "reduksi kesalahan input" },
      { value: "1,1s", label: "waktu muat halaman utama" },
    ],
    accent: "violet",
  },
  {
    slug: "kopi-senja-landing",
    title: "Kopi Senja — Landing Page",
    client: "Kopi Senja",
    categories: ["Landing Page"],
    year: 2026,
    role: "Desainer & Developer",
    stack: ["Next.js", "Tailwind CSS", "Motion", "Vercel"],
    summary:
      "Halaman peluncuran gerai kopi specialty dengan cerita brand, menu andalan, dan reservasi meja.",
    problem:
      "Gerai baru butuh kehadiran online cepat sebelum grand opening, dengan informasi lengkap tanpa terasa berat di ponsel pengunjung.",
    solution:
      "Satu halaman panjang dengan navigasi lengket: cerita brand, menu, lokasi, galeri, dan form reservasi. Animasi scroll dipakai untuk memperkenalkan tiap bagian tanpa memperlambat pembacaan.",
    features: [
      "Hero dengan video loop terkompresi",
      "Daftar menu lengkap dengan filter kategori",
      "Reservasi meja terhubung WhatsApp",
      "Peta lokasi & jam operasional",
      "Skor performa Lighthouse 98",
    ],
    results: [
      { value: "+38%", label: "reservasi via WhatsApp" },
      { value: "98", label: "skor Lighthouse mobile" },
      { value: "12 hari", label: "dari brief sampai live" },
    ],
    accent: "amber",
  },
  {
    slug: "tumbuh-inventory",
    title: "Tumbuh Inventory",
    client: "Tumbuh Retail",
    categories: ["Web App"],
    year: 2025,
    role: "Web Developer",
    stack: ["React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    summary:
      "Aplikasi pengelolaan stok multi-gudang dengan barcode scanning dan prediksi restock.",
    problem:
      "Stok tidak pernah cocok antar gudang, dan tim sering kehabisan barang laris karena tidak ada peringatan dini.",
    solution:
      "Aplikasi web dengan pemindaian barcode dari ponsel, sinkronisasi langsung antar gudang, dan prediksi restock berdasarkan laju penjualan 30 hari terakhir.",
    features: [
      "Pindai barcode langsung dari browser ponsel",
      "Riwayat perpindahan barang antar gudang",
      "Peringatan stok minimum otomatis",
      "Prediksi restock berbasis laju penjualan",
      "Laporan abis-pakai bulanan",
    ],
    results: [
      { value: "99,4%", label: "akurasi stok" },
      { value: "-41%", label: "barang kehabisan stok" },
      { value: "3 gudang", label: "tersinkronisasi real-time" },
    ],
    accent: "teal",
  },
  {
    slug: "sentra-karya-profile",
    title: "Sentra Karya — Company Profile",
    client: "Sentra Karya",
    categories: ["Company Profile"],
    year: 2025,
    role: "Desainer & Developer",
    stack: ["Next.js", "MDX", "Tailwind CSS", "Motion"],
    summary:
      "Website profil perusahaan konsultan arsitektur dengan katalog proyek dan artikel insight.",
    problem:
      "Profil perusahaan terlihat usang dan tidak menampilkan portofolio secara meyakinkan kepada calon klien korporat.",
    solution:
      "Struktur ulang total: hero yang tegas, katalog proyek dengan detail studi kasus, profil tim, dan blog insight yang dikelola lewat MDX.",
    features: [
      "Katalog proyek dengan filter tipe & tahun",
      "Halaman studi kasus lengkap",
      "Blog insight berbasis MDX",
      "Halaman karier dengan form lamaran",
      "Metadata & Open Graph untuk setiap halaman",
    ],
    results: [
      { value: "2,4×", label: "kunjungan ke halaman kontak" },
      { value: "31%", label: "lead baru dari organik" },
      { value: "100%", label: "skor aksesibilitas halaman utama" },
    ],
    accent: "sky",
  },
  {
    slug: "lautan-toko",
    title: "Lautan Toko",
    client: "Lautan Pescatarian",
    categories: ["E-Commerce"],
    year: 2024,
    role: "Web Developer",
    stack: ["Next.js", "Stripe", "Tailwind CSS", "Sanity CMS"],
    summary:
      "Toko online produk laut segar dengan langganan mingguan dan checkout dua langkah.",
    problem:
      "Penjualan hanya lewat WhatsApp, pesanan sering tertukar, dan pelanggan tidak bisa melihat ketersediaan harian.",
    solution:
      "Katalog harian yang diperbarui dari CMS, keranjang dengan estimasi pengiriman, checkout dua langkah via Stripe, serta opsi langganan mingguan otomatis.",
    features: [
      "Katalog stok harian dari headless CMS",
      "Checkout dua langkah dengan Stripe",
      "Langganan mingguan & penagihan berulang",
      "Notifikasi status pesanan via email",
      "Halaman produk dengan galeri responsif",
    ],
    results: [
      { value: "+57%", label: "pesanan bulanan" },
      { value: "2,1%", label: "konversi checkout" },
      { value: "46%", label: "pelanggan langganan" },
    ],
    accent: "rose",
  },
  {
    slug: "jejak-travel-booking",
    title: "Jejak Travel — Booking Trip",
    client: "Jejak Travel",
    categories: ["Web App"],
    year: 2024,
    role: "Web Developer",
    stack: ["React", "Vite", "Express", "MySQL", "Framer Motion"],
    summary:
      "Platform pemesanan tur lokal dengan ketersediaan slot real-time dan ulasan terverifikasi.",
    problem:
      "Pemesanan masih manual lewat telepon, slot sering dobel, dan ulasan tidak terkurasi.",
    solution:
      "Sistem pemesanan dengan kalender ketersediaan langsung, pengaturan kapasitas per keberangkatan, dan ulasan yang hanya bisa ditulis setelah trip selesai.",
    features: [
      "Kalender ketersediaan real-time",
      "Kapasitas otomatis per jadwal",
      "Ulasan terverifikasi peserta",
      "Voucher digital via email",
      "Panel admin untuk operator tur",
    ],
    results: [
      { value: "0", label: "booking dobel dalam 6 bulan" },
      { value: "+64%", label: "pemesanan online" },
      { value: "4,8/5", label: "rating rata-rata trip" },
    ],
    accent: "lime",
  },
];

export const testimonials = [
  {
    quote:
      "Aldo tidak hanya menerjemahkan desain kami ke kode — ia menemukan celah di alur pengguna yang bahkan belum kami sadari. Hasilnya bersih dan cepat.",
    name: "Dinda Rahmawati",
    role: "Product Lead, Nusa Fintech",
  },
  {
    quote:
      "Komunikasinya jelas, jadwalnya tepat, dan animasi yang dibuat terasa mahal tanpa mengorbankan kecepatan situs. Klien kami puas sejak versi pertama.",
    name: "Bagas Nugroho",
    role: "Founder, Kreasi Studio",
  },
  {
    quote:
      "Website kami selesai sebelum deadline dan tim internal bisa mengedit konten sendiri. Itu yang paling kami butuhkan.",
    name: "Sari Halim",
    role: "Marketing Manager, Sentra Karya",
  },
];
