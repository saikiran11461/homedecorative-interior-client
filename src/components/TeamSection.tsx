import { motion } from "framer-motion";
import { teamMembers } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const TeamSection = () => (
  <section className="py-20 md:py-28 px-6 bg-secondary">
    <div className="max-w-7xl mx-auto">
      <SectionHeading
        title="Meet Our Creative Studio"
        subtitle="The Team"
        centered
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group relative bg-background rounded-2xl overflow-hidden border border-border hover:border-gold/40 hover:shadow-xl transition-all duration-500"
          >
            {/* Image container */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Social hover links */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                <span className="px-3 py-1.5 bg-gold/90 backdrop-blur-sm text-charcoal text-xs font-sans font-medium rounded-full">
                  View Profile
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="font-display text-base font-semibold text-foreground group-hover:text-gold transition-colors">
                {member.name}
              </h3>
              <p className="font-sans text-xs text-gold font-medium uppercase tracking-wider mt-0.5 mb-2">
                {member.title}
              </p>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {member.bio}
              </p>
            </div>

            {/* Decorative accent line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold/0 group-hover:bg-gold/80 transition-colors duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
