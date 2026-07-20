import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Award, Building2, Smile, Star, MapPin, Headphones } from "lucide-react";

const achievements = [
  { value: 15, suffix: "+", label: "Years of Experience", icon: Award },
  { value: 500, suffix: "+", label: "Projects Delivered", icon: Building2 },
  { value: 98, suffix: "%", label: "Client Satisfaction", icon: Smile },
  { value: 32, suffix: "", label: "Design Awards", icon: Star },
  { value: 50, suffix: "+", label: "Cities Served", icon: MapPin },
  { value: 24, suffix: "/7", label: "Client Support", icon: Headphones },
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-4xl md:text-5xl font-bold text-gold">
        {count}{suffix}
      </span>
    </div>
  );
};

const StatsAchievementsSection = () => (
  <section className="relative py-20 md:py-28 px-6 bg-charcoal overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute inset-0 opacity-[0.04]">
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(42 45% 52%) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
    </div>
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-sans font-medium mb-4 uppercase tracking-widest">
          By the Numbers
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-cream">
          Our Impact in{" "}
          <span className="text-gold italic">Numbers</span>
        </h2>
        <p className="font-sans text-cream/60 text-base mt-4 max-w-2xl mx-auto">
          Every number represents a space transformed, a client delighted, and a standard of excellence maintained.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {achievements.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group bg-background/5 backdrop-blur-sm border border-cream/10 rounded-2xl p-6 md:p-8 text-center hover:border-gold/40 hover:bg-gold/5 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-400">
                <Icon className="text-gold" size={22} />
              </div>
              <AnimatedCounter target={item.value} suffix={item.suffix} />
              <p className="font-sans text-xs text-cream/60 mt-2 font-medium uppercase tracking-wider">
                {item.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default StatsAchievementsSection;
