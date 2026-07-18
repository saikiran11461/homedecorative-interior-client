import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AwardsMarquee from "@/components/AwardsMarquee";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import SpotlightSection from "@/components/SpotlightSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Home",
    description:
      "Home Decorative Interior — premium interior design studio crafting elegant living spaces for homes & commercial projects. Explore award-winning residential and commercial interiors.",
    path: "/",
  });

  return (
  <div className="bg-background">
    <Navbar />
    <main>
      <Hero />
      <AwardsMarquee />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <SpotlightSection />
      <TestimonialsSection />
      <WhyChooseSection />
    </main>
    <Footer />
    <FloatingButtons />
  </div>
);

};

export default Index;
