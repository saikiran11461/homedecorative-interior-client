import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { MessageSquare, Palette, Gem, Hammer, Sparkles } from "lucide-react";
import { useHomeContent } from "@/hooks/use-site-data";

const icons = [MessageSquare, Palette, Gem, Hammer, Sparkles];

const ProcessSection = () => {
  const { data } = useHomeContent();
  const processSteps = data?.processSteps ?? [];

  return (
  <section className="py-20 md:py-28 px-6 bg-secondary">
    <div className="max-w-7xl mx-auto">
      <SectionHeading title="How We Work" subtitle="Our Process" centered />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {processSteps.map((step, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center bg-background rounded-xl p-6"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-coral-light flex items-center justify-center">
                <Icon className="text-primary" size={20} />
              </div>
              <span className="font-display text-2xl font-bold text-primary/20 block mb-1">
                {step.num}
              </span>
              <h3 className="font-display text-base font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="font-sans text-muted-foreground text-xs leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default ProcessSection;
