import { motion } from "framer-motion";
import { useHomeContent } from "@/hooks/use-site-data";
import { MessageSquare, Palette, Gem, Hammer, Sparkles } from "lucide-react";

const icons = [MessageSquare, Palette, Gem, Hammer, Sparkles];

const ProcessTimelineSection = () => {
  const { data } = useHomeContent();
  const processSteps = data?.processSteps ?? [];

  return (
    <section className="py-20 md:py-28 px-6 bg-charcoal relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(42 45% 52%) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-sans font-medium mb-4 uppercase tracking-widest">
            Our Process
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-cream">
            From Vision to <span className="text-gold italic">Reality</span>
          </h2>
          <p className="font-sans text-cream/60 text-base mt-4 max-w-2xl mx-auto">
            A seamless journey from our first conversation to the moment you step into your transformed space.
          </p>
        </motion.div>

        {/* Timeline - Desktop */}
        <div className="hidden lg:block relative">
          {/* Central line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

          {processSteps.map((step, i) => {
            const Icon = icons[i];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`relative flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"} mb-16 last:mb-0`}
              >
                {/* Content card */}
                <div className={`w-[calc(50%-40px)] ${isLeft ? "text-right" : "text-left"}`}>
                  <div className={`bg-background/10 backdrop-blur-sm border border-cream/10 rounded-2xl p-7 hover:border-gold/30 transition-all duration-300 ${
                    isLeft ? "mr-0" : "ml-0"
                  }`}>
                    <span className="font-display text-5xl font-bold text-gold/15 block mb-2">
                      {step.num}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-cream mb-2">
                      {step.title}
                    </h3>
                    <p className="font-sans text-cream/60 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Center node */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <div className="w-14 h-14 rounded-full bg-charcoal border-2 border-gold/50 flex items-center justify-center shadow-lg shadow-gold/10 group-hover:shadow-gold/30 transition-all">
                    <Icon className="text-gold" size={22} />
                  </div>
                </div>

                {/* Empty space for the other side */}
                <div className="w-[calc(50%-40px)]" />
              </motion.div>
            );
          })}
        </div>

        {/* Timeline - Mobile */}
        <div className="lg:hidden relative">
          {/* Left line */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent" />

          {processSteps.map((step, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-6 mb-10 last:mb-0 pl-0"
              >
                {/* Node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-charcoal border-2 border-gold/50 flex items-center justify-center shadow-lg">
                    <Icon className="text-gold" size={20} />
                  </div>
                </div>

                {/* Content */}
                <div className="bg-background/10 backdrop-blur-sm border border-cream/10 rounded-2xl p-5 flex-1 hover:border-gold/30 transition-all">
                  <span className="font-display text-3xl font-bold text-gold/15 block mb-1">
                    {step.num}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-cream mb-1">
                    {step.title}
                  </h3>
                  <p className="font-sans text-cream/60 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimelineSection;
