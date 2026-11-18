export type NavItem = {
  href: string;
  label: string;
  description: string;
};

export const site = {
  name: "Aldo Moroseto",
  tagline: "Website Developer",
  description:
    "Portofolio Aldo Moroseto, website developer di Bekasi yang membangun website cepat, responsif, dan mudah dirawat, mulai dari company profile dan landing page hingga web application.",
  url: "https://aldomoroseto.my.id",
  locale: "id_ID",
  author: "Aldo Moroseto",
};

export const navigation: NavItem[] = [
  { href: "/", label: "Beranda", description: "Ringkasan profil dan karya" },
  { href: "/tentang", label: "Tentang", description: "Perjalanan, nilai, dan keahlian" },
  { href: "/layanan", label: "Layanan", description: "Jasa yang ditawarkan" },
  { href: "/portofolio", label: "Portofolio", description: "Studi kasus proyek pilihan" },
  { href: "/blog", label: "Blog", description: "Tulisan seputar web & desain" },
  { href: "/kontak", label: "Kontak", description: "Mari mulai proyek bersama" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/moroseto212" },
  { label: "LinkedIn", href: "https://id.linkedin.com/in/aldo-moroseto" },
  { label: "Freelancer", href: "https://www.freelancer.com/u/aldomoroseto" },
  { label: "YouTube", href: "https://www.youtube.com/@Ocelly212" },
  { label: "Instagram", href: "https://www.instagram.com/ku_setoo/" },
];

// Dipakai oleh structured data `Person` supaya mesin pencari memahami bahwa
// semua profil ini adalah satu orang yang sama.
export const sameAs = socials.map((social) => social.href);

export const contact = {
  email: "aldomoroseto668@gmail.com",
  phone: "+62 814-1359-7455",
  phoneHref: "6281413597455",
  location: "Bekasi, Jawa Barat, Indonesia",
  timezone: "GMT+7 (WIB)",
  availability: "Tersedia untuk proyek freelance",
  responseTime: "Biasanya membalas dalam 1×24 jam",
};
