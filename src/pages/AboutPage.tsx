import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import { motion } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";

const PageHeader = ({ label, title, italic, subtitle, img }: { label: string; title: string; italic: string; subtitle: string; img: string }) => (
  <section className="relative pt-32 pb-16 px-6 bg-charcoal overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <img src={img} className="w-full h-full object-cover" alt="" />
    </div>
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
        className="font-display text-4xl md:text-6xl font-bold text-cream mb-4"
      >
        {title} <span className="text-gold italic font-medium">{italic}</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-sans text-cream/70 text-base max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </div>
  </section>
);

const AboutPage = () => {
  useSEO({
    title: "About",
    description:
      "Meet Home Decorative Interior — an award-winning interior design studio crafting elegant, functional living spaces for homes and commercial projects.",
    path: "/about",
  });

  return (
  <div className="bg-background">
    <Navbar />
    <PageHeader
      label="About Us"
      title="Designing Spaces"
      italic="That Inspire"
      subtitle="A globally recognized interior design studio blending architectural craft with warm, artful living."
      img="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000"
    />
    <AboutSection />
    <ProcessSection />
    <WhyChooseSection />
    <Footer />
    <FloatingButtons />
  </div>
);

};

export default AboutPage;
