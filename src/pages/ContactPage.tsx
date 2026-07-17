import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import ContactSection from "@/components/ContactSection";
import { motion } from "framer-motion";

const ContactPage = () => (
  <div className="bg-background">
    <Navbar />
    <section className="relative pt-32 pb-16 px-6 bg-charcoal overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="relative max-w-7xl mx-auto text-center">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-sans font-medium uppercase tracking-widest mb-4">
          Contact Us
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-6xl font-bold text-cream mb-4">
          Let's Design <span className="text-gold italic font-medium">Together</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-sans text-cream/70 text-base max-w-2xl mx-auto">
          Share your vision and our studio will be in touch within 24 hours.
        </motion.p>
      </div>
    </section>
    <ContactSection />
    <Footer />
    <FloatingButtons />
  </div>
);

export default ContactPage;
