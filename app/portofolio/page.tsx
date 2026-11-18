import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import ProjectFilter from "@/components/sections/ProjectFilter";
import CtaSection from "@/components/sections/CtaSection";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Portofolio",
  alternates: { canonical: "/portofolio" },
  description: `Kumpulan proyek pilihan ${profile.name}, studi kasus lengkap dengan masalah, solusi, dan hasil yang dicapai.`,
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        label="Portofolio"
        title="Studi kasus, bukan sekadar tangkapan layar"
        description="Setiap proyek dibahas lengkap: masalah yang dihadapi, pendekatan yang diambil, dan hasil yang benar-benar terukur."
      />

      <section className="py-16 md:py-24">
        <div className="container-page">
          <ProjectFilter />
        </div>
      </section>

      <CtaSection
        title="Ingin hasil seperti ini untuk bisnis Anda?"
        description="Ceritakan proyek yang sedang Anda bayangkan, saya bantu petakan lingkup dan estimasinya tanpa biaya."
      />
    </>
  );
}
