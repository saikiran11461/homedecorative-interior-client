import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AwardsMarquee from "@/components/AwardsMarquee";
import FeatureShowcase from "@/components/FeatureShowcase";
import StatsAchievementsSection from "@/components/StatsAchievementsSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ProcessSection from "@/components/ProcessSection";
import ParallaxBanner from "@/components/ParallaxBanner";
import SpotlightSection from "@/components/SpotlightSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { SEO } from "@/components/SEO";
import { pages, getOrganizationSchema, getLocalBusinessSchema, getWebsiteSchema, getInteriorDesignerSchema, faqData } from "@/lib/seo-config";

const Index = () => {
  return (
    <>
      <SEO
        page={pages.home}
        breadcrumbs={[{ name: "Home", url: "https://www.homedecorativeinterior.com/" }]}
        schemas={[
          getOrganizationSchema(),
          getLocalBusinessSchema(),
          getWebsiteSchema(),
          getInteriorDesignerSchema(),
        ]}
        faqs={faqData}
      />
      <div className="bg-background">
        <Navbar />
        <main>
          {/* Immersive Hero with slideshow */}
          <Hero />

          {/* Impact Stats - eye-catching numbers */}
          <StatsAchievementsSection />

          {/* Awards & recognition */}
          <AwardsMarquee />

          {/* Split-screen feature showcase - visual wow */}
          <FeatureShowcase />

          {/* What we offer */}
          <ServicesSection />

          {/* Dramatic parallax quote break */}
          <ParallaxBanner
            quote="Architecture should speak of its time and place, but yearn for timelessness."
            author="Frank Gehry"
            bgImage="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=2000"
          />

          {/* Our portfolio */}
          <ProjectsSection />

          {/* Our process */}
          <ProcessSection />

          {/* Featured project spotlight */}
          <SpotlightSection />

          {/* Client testimonials */}
          <TestimonialsSection />

          {/* Why choose us - final call */}
          <WhyChooseSection />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
};

export default Index;
