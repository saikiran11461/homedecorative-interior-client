import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import { motion } from "framer-motion";

const ServicesPage = () => (
  <div className="bg-background">
    <Navbar />
    <section className="relative pt-32 pb-16 px-6 bg-charcoal overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="relative max-w-7xl mx-auto text-center">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-sans font-medium uppercase tracking-widest mb-4">
          Our Services
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-6xl font-bold text-cream mb-4">
          What <span className="text-gold italic font-medium">We Create</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-sans text-cream/70 text-base max-w-2xl mx-auto">
          End-to-end interior design and execution for residences, hospitality, and commercial spaces.
        </motion.p>
      </div>
    </section>
    <ServicesSection />
    <ProcessSection />
    <WhyChooseSection />
    <Footer />
    <FloatingButtons />
  </div>
);

export default ServicesPage;
