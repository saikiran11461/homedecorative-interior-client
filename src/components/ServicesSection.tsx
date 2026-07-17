import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { Sofa, BedDouble, ChefHat, Building2, Bath, Trees } from "lucide-react";
import { useHomeContent } from "@/hooks/use-site-data";

const icons = [Sofa, BedDouble, ChefHat, Building2, Bath, Trees];

const ServicesSection = () => {
  const { data } = useHomeContent();
  const services = data?.services ?? [];

  return (
  <section id="services" className="py-20 md:py-28 px-6 bg-secondary">
    <div className="max-w-7xl mx-auto">
      <SectionHeading title="What We Create" subtitle="Our Services" centered />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group bg-background rounded-xl p-7 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20"
            >
              <div className="w-12 h-12 rounded-xl bg-coral-light flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon size={22} className="text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default ServicesSection;
