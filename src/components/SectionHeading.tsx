import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  centered?: boolean;
}

const SectionHeading = ({ title, subtitle, centered = false }: SectionHeadingProps) => (
  <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-block px-3 py-1 rounded-full bg-coral-light text-primary text-xs font-sans font-medium mb-4"
    >
      {subtitle}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="font-display text-3xl md:text-5xl font-semibold text-foreground"
    >
      {title}
    </motion.h2>
  </div>
);

export default SectionHeading;
