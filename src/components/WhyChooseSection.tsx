import { motion } from "framer-motion";
import { Check } from "lucide-react";

const reasons = [
  "15+ years of design excellence",
  "500+ successful projects delivered",
  "End-to-end project management",
  "Premium material sourcing",
  "On-time delivery guarantee",
  "Post-project support & warranty",
];

const WhyChooseSection = () => (
  <section className="py-20 md:py-28 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="aspect-[4/5] rounded-2xl overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
          className="w-full h-full object-cover"
          alt="Why choose Home Decorative Interior — premium interior design Hyderabad"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      <div>
        <span className="inline-block px-3 py-1 rounded-full bg-coral-light text-primary text-xs font-sans font-medium mb-4">
          Why Us
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-8">
          Why Choose Us
        </h2>
        <div className="space-y-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-coral-light flex items-center justify-center flex-shrink-0">
                <Check className="text-primary" size={16} />
              </div>
              <span className="font-sans text-foreground text-sm font-medium">{reason}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WhyChooseSection;
