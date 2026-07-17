import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 500, suffix: "+", label: "Projects Done" },
  { value: 98, suffix: "%", label: "Happy Clients" },
  { value: 32, suffix: "", label: "Design Awards" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
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
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <span className="font-display text-4xl md:text-5xl font-bold text-primary">
        {count}{suffix}
      </span>
    </div>
  );
};

const AboutSection = () => (
  <section id="about" className="py-20 md:py-28 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="aspect-[4/5] rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200"
            className="w-full h-full object-cover"
            alt="Our design process"
          />
        </div>
        <div className="absolute -bottom-6 -right-6 w-48 h-64 rounded-2xl overflow-hidden border-4 border-background shadow-xl hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=600"
            className="w-full h-full object-cover"
            alt="Interior detail"
          />
        </div>
      </motion.div>

      <div>
        <SectionHeading title="We Design Spaces That Tell Your Story" subtitle="About Us" />
        <p className="font-sans text-muted-foreground leading-relaxed mb-10 text-base">
          Founded in Milan and headquartered in London, we believe that a home is
          a living gallery of one's soul. Our approach combines modern design thinking
          with artisanal craftsmanship, creating spaces that are both
          timeless and deeply personal.
        </p>
        <div className="grid grid-cols-2 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="p-4 rounded-xl bg-secondary">
              <Counter target={s.value} suffix={s.suffix} />
              <p className="font-sans text-xs text-muted-foreground mt-1 font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
