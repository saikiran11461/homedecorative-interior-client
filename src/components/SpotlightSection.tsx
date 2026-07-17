import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SpotlightSection = () => (
  <section className="relative py-20 md:py-0 md:h-[80vh] overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent z-10" />
      <img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
        className="w-full h-full object-cover"
        alt="Featured Project"
      />
    </div>
    <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
      <div className="max-w-lg">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground text-xs font-sans font-medium mb-4"
        >
          ✦ Project of the Year
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl text-white font-semibold mb-4 leading-tight"
        >
          The Milan{" "}
          <span className="italic font-normal">Penthouse</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-sans text-white/70 text-base leading-relaxed mb-6"
        >
          A 450m² penthouse that redefines urban luxury through sculptural marble,
          bespoke bronze fixtures, and panoramic city views.
        </motion.p>
        <motion.a
          href="/project/1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-lg hover:bg-coral-dark transition-colors"
        >
          View Project <ArrowRight size={16} />
        </motion.a>
      </div>
    </div>
  </section>
);

export default SpotlightSection;
