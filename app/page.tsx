import Hero from "@/components/sections/home/Hero";
import ToolList from "@/components/sections/home/ToolList";
import StatsSection from "@/components/sections/home/StatsSection";
import FeaturedProjects from "@/components/sections/home/FeaturedProjects";
import ServicesPreview from "@/components/sections/home/ServicesPreview";
import AboutPreview from "@/components/sections/home/AboutPreview";
import Testimonials from "@/components/sections/Testimonials";
import CtaSection from "@/components/sections/CtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolList />
      <StatsSection />
      <FeaturedProjects />
      <ServicesPreview />
      <AboutPreview />
      <Testimonials />
      <CtaSection />
    </>
  );
}
