import { motion } from "framer-motion";
import { Sparkles, Palette, HeartHandshake, Shield, Lightbulb, Leaf } from "lucide-react";

const values = [
  {
    icon: Palette,
    title: "Artisanal Craftsmanship",
    description:
      "Every project is a handcrafted masterpiece. We source rare materials and collaborate with master artisans to create bespoke furnishings and finishes that can't be found anywhere else.",
    accent: "from-amber-200/30 to-amber-500/10",
  },
  {
    icon: Lightbulb,
    title: "Innovative Design Thinking",
    description:
      "We blend contemporary aesthetics with timeless principles. Our approach challenges conventions while respecting the architectural heritage of each space we transform.",
    accent: "from-blue-200/30 to-blue-500/10",
  },
  {
    icon: HeartHandshake,
    title: "Client-First Partnership",
    description:
      "Your vision guides our process. We invest time in understanding your lifestyle, preferences, and aspirations — ensuring every design decision reflects your unique personality.",
    accent: "from-rose-200/30 to-rose-500/10",
  },
  {
    icon: Shield,
    title: "Uncompromising Quality",
    description:
      "From concept to completion, we maintain the highest standards. Our rigorous quality control, premium material selection, and skilled execution guarantee exceptional results.",
    accent: "from-green-200/30 to-green-500/10",
  },
  {
    icon: Leaf,
    title: "Sustainable Luxury",
    description:
      "We believe true luxury is sustainable. Our designs incorporate eco-friendly materials, energy-efficient solutions, and responsible sourcing without compromising on elegance.",
    accent: "from-emerald-200/30 to-emerald-500/10",
  },
  {
    icon: Sparkles,
    title: "Attention to Every Detail",
    description:
      "The difference is in the details. From the grain of the marble to the fall of the curtains, we obsess over every element to create harmonious, thoughtfully composed interiors.",
    accent: "from-purple-200/30 to-purple-500/10",
  },
];

const StudioValuesSection = () => (
  <section className="py-20 md:py-28 px-6 bg-background">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-coral-light text-primary text-xs font-sans font-medium mb-4">
          Our Philosophy
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground max-w-3xl mx-auto">
          Design Philosophy Rooted in{" "}
          <span className="text-gold italic">Excellence</span>
        </h2>
        <p className="font-sans text-muted-foreground text-base mt-4 max-w-2xl mx-auto">
          Six core principles that guide every project we undertake, from a single room to an entire estate.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {values.map((value, i) => {
          const Icon = value.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-gold/30 transition-all duration-500 overflow-hidden"
            >
              {/* Accent background on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${value.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-400">
                  <Icon className="text-gold" size={26} />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                  {value.title}
                </h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>

              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold/0 group-hover:border-gold/30 transition-all duration-500 rounded-tr-2xl" />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default StudioValuesSection;
