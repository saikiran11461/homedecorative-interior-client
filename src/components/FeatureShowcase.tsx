import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  "Award-winning design team",
  "End-to-end project management",
  "Premium material sourcing",
  "On-time delivery guaranteed",
];

const FeatureShowcase = () => (
  <section className="py-0 overflow-hidden bg-background">
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
      {/* Image side - Left */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="relative h-[50vh] lg:h-auto overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-charcoal/30 z-10" />
        <motion.img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200"
          className="w-full h-full object-cover"
          alt="Premium interior design showcase"
          loading="lazy"
          decoding="async"
          whileInView={{ scale: 1.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />
        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-6 left-6 z-20 bg-charcoal/90 backdrop-blur-md rounded-xl px-5 py-3 border border-gold/30"
        >
          <p className="font-display text-2xl font-bold text-gold">15+</p>
          <p className="font-sans text-xs text-cream/70">Years of Excellence</p>
        </motion.div>
      </motion.div>

      {/* Content side - Right */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex items-center px-8 py-16 lg:px-16 lg:py-20 bg-gradient-to-br from-secondary/80 to-background"
      >
        <div className="max-w-lg">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-block px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-sans font-medium mb-6 uppercase tracking-widest"
          >
            Why Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-6 leading-tight"
          >
            Crafting Extraordinary{" "}
            <span className="text-gold italic">Spaces</span> That Reflect Your Story
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="font-sans text-muted-foreground text-base leading-relaxed mb-8"
          >
            Every project begins with a conversation. We take the time to understand your lifestyle, 
            preferences, and aspirations — transforming them into interiors that are as functional 
            as they are beautiful.
          </motion.p>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="space-y-3 mb-10"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle className="text-gold flex-shrink-0" size={18} />
                <span className="font-sans text-foreground text-sm">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gold text-charcoal font-sans text-sm font-semibold rounded-xl hover:bg-gold-dark hover:text-cream transition-all duration-300 group"
            >
              Explore Our Work
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default FeatureShowcase;
