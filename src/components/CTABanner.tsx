import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CTABanner = () => (
  <section className="relative py-24 md:py-32 px-6 overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-charcoal/70 z-10" />
      <img
        src="https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&q=80&w=2000"
        className="w-full h-full object-cover"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>

    {/* Decorative pattern */}
    <div className="absolute inset-0 z-10 opacity-[0.04]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, hsl(42 45% 52%) 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />
    </div>

    {/* Content */}
    <div className="relative z-20 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-sans font-medium uppercase tracking-widest mb-6">
          Start Your Journey
        </span>

        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-cream mb-6 leading-tight">
          Ready to Transform Your{" "}
          <span className="text-gold italic">Space?</span>
        </h2>

        <p className="font-sans text-cream/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Take the first step toward the home or office you've always dreamed of.
          Our design team is ready to bring your vision to life with a free,
          no-obligation consultation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-sans text-sm font-semibold rounded-xl hover:bg-cream hover:text-charcoal transition-all duration-300 shadow-xl shadow-gold/25 hover:shadow-gold/40 group"
          >
            Book Free Consultation
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <a
            href="tel:+918309324365"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cream/10 backdrop-blur-md border border-cream/30 text-cream font-sans text-sm font-medium rounded-xl hover:bg-cream/20 transition-all duration-300"
          >
            <Phone size={16} />
            Call +91 8309324365
          </a>
        </div>

        <p className="font-sans text-cream/40 text-xs mt-6">
          No commitment required. We'll discuss your ideas and provide expert guidance.
        </p>
      </motion.div>
    </div>

    {/* Bottom gradient fade */}
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />
  </section>
);

export default CTABanner;
