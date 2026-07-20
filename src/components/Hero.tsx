import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BEZIER } from "@/lib/data";
import { useHeroImages } from "@/hooks/use-site-data";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const { data } = useHeroImages();
  const heroImages = Array.isArray(data?.heroImages) ? data.heroImages : [];
  const next = useCallback(() => {
    if (!heroImages.length) return;
    setCurrent((c) => (c + 1) % heroImages.length);
  }, [heroImages.length]);

  useEffect(() => {
    if (!heroImages.length) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-svh w-full overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: BEZIER }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/85 z-10" />
          {/* First image is LCP candidate - use eager loading and high fetchpriority */}
          <img
            src={heroImages[current]}
            className="w-full h-full object-cover animate-ken-burns"
            alt="Home Decorative Interior — Premium Interior Design Studio Hyderabad"
            fetchPriority={current === 0 ? "high" : "auto"}
            loading={current === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: BEZIER }}
          className="mb-5"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-gold/15 backdrop-blur-md border border-gold/40 text-gold text-xs font-sans font-medium tracking-widest uppercase">
            ✦ Award-Winning Design Studio in Hyderabad
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: BEZIER }}
          className="font-display text-4xl md:text-6xl lg:text-8xl text-cream mb-6 leading-[1.05] font-bold max-w-5xl"
        >
          Designing Spaces
          <br />
          <span className="text-gold italic font-medium">That Inspire Living</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-sans text-cream/75 text-base md:text-lg mb-10 max-w-xl leading-relaxed"
        >
          Hyderabad's premier interior design studio — where architectural craft meets warm, artful living. We specialize in residential and commercial interiors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/projects"
            className="px-7 py-3.5 bg-gold text-charcoal font-sans text-sm font-semibold rounded-lg hover:bg-cream transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
          >
            Explore Projects <ArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="px-7 py-3.5 bg-cream/10 backdrop-blur-md border border-cream/30 text-cream font-sans text-sm font-medium rounded-lg hover:bg-cream/20 transition-colors"
          >
            Free Consultation
          </Link>
        </motion.div>
      </div>

      {/* Slide navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2" role="tablist" aria-label="Hero slides">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-300 ${i === current ? "bg-gold w-10" : "bg-cream/30 w-4"}`}
            aria-label={`Slide ${i + 1}`}
            role="tab"
            aria-selected={i === current}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
