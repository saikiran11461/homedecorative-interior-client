import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import AboutSection from "@/components/AboutSection";
import AwardsMarquee from "@/components/AwardsMarquee";
import PressFeatureSection from "@/components/PressFeatureSection";
import StudioValuesSection from "@/components/StudioValuesSection";
import StudioMilestoneShowcase from "@/components/StudioMilestoneShowcase";
import { SEO } from "@/components/SEO";
import { pages, getAboutPageSchema, getOrganizationSchema } from "@/lib/seo-config";
import { motion } from "framer-motion";

const PageHeader = ({ label, title, italic, subtitle, img }: { label: string; title: string; italic: string; subtitle: string; img: string }) => (
  <section className="relative pt-32 pb-20 px-6 bg-charcoal overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <img src={img} className="w-full h-full object-cover" alt="About Home Decorative Interior" loading="lazy" />
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/90" />
    <div className="relative max-w-7xl mx-auto text-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-block px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-sans font-medium uppercase tracking-widest mb-4"
      >
        {label}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-4"
      >
        {title} <span className="text-gold italic font-medium">{italic}</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-sans text-cream/70 text-base md:text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  </section>
);

const AboutPage = () => {
  return (
    <>
      <SEO
        page={pages.about}
        breadcrumbs={[
          { name: "Home", url: "https://www.homedecorativeinterior.com/" },
          { name: "About", url: "https://www.homedecorativeinterior.com/about" },
        ]}
        schemas={[getAboutPageSchema(), getOrganizationSchema()]}
      />
      <div className="bg-background">
        <Navbar />
        <PageHeader
          label="About Us"
          title="Designing Spaces"
          italic="That Inspire"
          subtitle="A globally recognized interior design studio blending architectural craft with warm, artful living."
          img="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000"
        />

        {/* Section 1: Studio Philosophy & Stats */}
        <AboutSection />

        {/* Section 2: Press & Recognition - replaces Meet Our Team */}
        <PressFeatureSection />

        {/* Section 3: Journey Timeline - replaces Testimonials */}
        <StudioMilestoneShowcase />

        {/* Section 4: Awards & Recognition */}
        <AwardsMarquee />

        {/* Section 5: Studio Values / Design Philosophy */}
        <StudioValuesSection />

        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
};

export default AboutPage;
