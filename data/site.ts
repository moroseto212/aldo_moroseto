export type NavItem = {
  href: string;
  label: string;
  description: string;
};

export const site = {
  name: "Aldo Moroseto",
  tagline: "Website Developer",
  description:
    "Website portfolio Aldo Moroseto — website developer yang membangun website cepat, responsif, dan bermakna.",
  url: "https://moroseto212.github.io/aldo_moroseto",
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
  { label: "Instagram", href: "https://www.instagram.com/ku_setoo/" },
];

export const contact = {
  email: "aldomoroseto668@gmail.com",
  phone: "+62 814-1359-7455",
  phoneHref: "6281413597455",
  location: "Bekasi, Jawa Barat, Indonesia",
  timezone: "GMT+7 (WIB)",
  availability: "Tersedia untuk proyek freelance",
  responseTime: "Biasanya membalas dalam 1×24 jam",
};
