import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ServicesSection from "@/components/ServicesSection";
import ProcessTimelineSection from "@/components/ProcessTimelineSection";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import SpotlightSection from "@/components/SpotlightSection";
import { SEO } from "@/components/SEO";
import { pages, getServiceSchema } from "@/lib/seo-config";
import { motion } from "framer-motion";

const servicesFAQ = [
  {
    question: "What interior design services do you offer in Hyderabad?",
    answer:
      "We offer comprehensive interior design services in Hyderabad including modular kitchen design, bedroom interiors, living room design, wardrobe design, false ceiling, TV unit design, dining room interiors, office interiors, villa interiors, apartment interiors, commercial interiors, and complete home renovation.",
  },
  {
    question: "How much does modular kitchen design cost in Hyderabad?",
    answer:
      "Our modular kitchen design costs vary based on size, materials, and customization. We work with various budgets and provide detailed quotes during the free consultation. Contact us to discuss your requirements.",
  },
  {
    question: "Do you offer commercial interior design services in Hyderabad?",
    answer:
      "Yes, we specialize in commercial interior design including office spaces, restaurants, retail stores, and hospitality venues in Hyderabad. Our commercial design solutions enhance brand identity and optimize workspace functionality.",
  },
];

const ServicesPage = () => {
  return (
    <>
      <SEO
        page={pages.services}
        breadcrumbs={[
          { name: "Home", url: "https://www.homedecorativeinterior.com/" },
          { name: "Services", url: "https://www.homedecorativeinterior.com/services" },
        ]}
        schemas={[getServiceSchema()]}
        faqs={servicesFAQ}
      />
      <div className="bg-background">
        <Navbar />

        {/* Section 1: Hero */}
        <section className="relative pt-32 pb-20 px-6 bg-charcoal overflow-hidden">
          <div className="absolute inset-0 opacity-15">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
              className="w-full h-full object-cover"
              alt="Interior Design Services Hyderabad"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/90" />
          <div className="relative max-w-7xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-sans font-medium uppercase tracking-widest mb-4"
            >
              Our Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-4"
            >
              What <span className="text-gold italic font-medium">We Create</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-sans text-cream/70 text-base md:text-lg max-w-2xl mx-auto"
            >
              End-to-end interior design and execution for residences, hospitality, and commercial spaces in Hyderabad.
            </motion.p>
          </div>
        </section>

        {/* Section 2: Services Grid */}
        <ServicesSection />

        {/* Section 3: Process Timeline */}
        <ProcessTimelineSection />

        {/* Section 4: FAQ Accordion */}
        <FAQSection />

        {/* Section 5: CTA Banner */}
        <CTABanner />

        {/* Section 6: Featured Project Spotlight */}
        <SpotlightSection />

        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
};

export default ServicesPage;
