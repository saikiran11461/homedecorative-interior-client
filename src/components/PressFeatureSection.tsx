import { motion } from "framer-motion";

const publications = [
  { name: "Architectural Digest", tier: "Featured in" },
  { name: "Elle Decor India", tier: "Top 50 Designers" },
  { name: "Vogue Living", tier: "Design Spotlight" },
  { name: "Wallpaper*", tier: "Best Interior" },
  { name: "India Today Home", tier: "Cover Story" },
  { name: "Living etc.", tier: "Project Featured" },
];

const PressFeatureSection = () => (
  <section className="py-20 md:py-28 px-6 bg-charcoal relative overflow-hidden">
    {/* Subtle pattern overlay */}
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
          Press & Recognition
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-cream">
          As Featured In <span className="text-gold italic">Leading Publications</span>
        </h2>
        <p className="font-sans text-cream/60 text-base mt-4 max-w-2xl mx-auto">
          Our work has been recognized by the world's most prestigious design and lifestyle media.
        </p>
      </motion.div>

      {/* Publication grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {publications.map((pub, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative bg-background/5 backdrop-blur-sm border border-cream/10 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-gold/40 hover:bg-gold/5 transition-all duration-500"
          >
            {/* Logo placeholder */}
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-500">
              <span className="font-display text-xl font-bold text-gold/60 group-hover:text-gold transition-colors">
                {pub.name.charAt(0)}
              </span>
            </div>
            <h3 className="font-display text-sm font-semibold text-cream/80 group-hover:text-gold transition-colors">
              {pub.name}
            </h3>
            <p className="font-sans text-xs text-cream/40 mt-1">{pub.tier}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center font-sans text-cream/30 text-xs mt-10"
      >
        And many more publications across India and internationally
      </motion.p>
    </div>
  </section>
);

export default PressFeatureSection;
