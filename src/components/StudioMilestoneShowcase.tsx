import { motion } from "framer-motion";
import { Award, Building2, Users, Globe, Trophy, Sparkles } from "lucide-react";

const milestones = [
  {
    year: "2010",
    title: "Studio Founded",
    description:
      "Home Decorative Interior was established in Hyderabad with a vision to transform spaces through thoughtful design and artisanal craftsmanship.",
    icon: Sparkles,
    color: "from-gold/20 to-gold/5",
  },
  {
    year: "2013",
    title: "First Major Project",
    description:
      "Completed our first flagship residential project — a 5,000 sq ft villa in Jubilee Hills that established our reputation for luxury interiors.",
    icon: Building2,
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    year: "2016",
    title: "Expanded to Commercial",
    description:
      "Launched our commercial interior division, delivering office spaces, retail stores, and hospitality venues across Hyderabad and beyond.",
    icon: Globe,
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    year: "2019",
    title: "500+ Projects Milestone",
    description:
      "Reached the landmark of 500 completed projects with a 98% client satisfaction rate. Our team grew to include 15+ dedicated designers and architects.",
    icon: Users,
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    year: "2022",
    title: "National Recognition",
    description:
      "Received multiple design awards and were featured in leading publications. Our portfolio expanded to include projects across India and internationally.",
    icon: Trophy,
    color: "from-amber-500/20 to-amber-500/5",
  },
  {
    year: "2024+",
    title: "Continuing the Journey",
    description:
      "Today we continue to push boundaries, embracing sustainable luxury and innovative design solutions for every project we undertake.",
    icon: Award,
    color: "from-gold/30 to-gold/10",
  },
];

const StudioMilestoneShowcase = () => (
  <section className="py-20 md:py-28 px-6 bg-background relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-coral-light text-primary text-xs font-sans font-medium mb-4">
          Our Journey
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
          A Decade of{" "}
          <span className="text-gold italic">Design Excellence</span>
        </h2>
        <p className="font-sans text-muted-foreground text-base mt-4 max-w-2xl mx-auto">
          From a small studio to one of Hyderabad's most sought-after interior design firms — our story is written in the spaces we transform.
        </p>
      </motion.div>

      {/* Timeline layout */}
      <div className="relative">
        {/* Central line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/60 via-gold/30 to-gold/10" />

        {milestones.map((milestone, i) => {
          const Icon = milestone.icon;
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                isLeft
                  ? "md:flex-row md:pr-[calc(50%+20px)]"
                  : "md:flex-row-reverse md:pl-[calc(50%+20px)]"
              }`}
            >
              {/* Content Card */}
              <div
                className={`flex-1 bg-card rounded-2xl p-6 border border-border hover:border-gold/30 hover:shadow-lg transition-all duration-500 ${
                  !isLeft ? "md:text-right" : ""
                }`}
              >
                <span className="font-display text-sm font-bold text-gold tracking-wider">
                  {milestone.year}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground mt-1 mb-2">
                  {milestone.title}
                </h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                  {milestone.description}
                </p>
              </div>

              {/* Timeline Node */}
              <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                <div className="w-12 h-12 rounded-full bg-background border-2 border-gold/50 flex items-center justify-center shadow-lg shadow-gold/10">
                  <Icon className="text-gold" size={18} />
                </div>
              </div>

              {/* Spacer for opposite side on desktop */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default StudioMilestoneShowcase;
