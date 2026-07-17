import { Star, Quote } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useReviews } from "@/hooks/use-site-data";

const TestimonialsSection = () => {
  const { data: testimonials = [] } = useReviews();
  const row = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="py-20 md:py-28 overflow-hidden bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading title="What Our Clients Say" subtitle="Testimonials" centered />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-secondary to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-secondary to-transparent z-10" />

        <div className="flex gap-5 animate-marquee-slow" style={{ width: "max-content" }}>
          {row.map((t, i) => (
            <article
              key={i}
              className="w-[340px] md:w-[400px] flex-shrink-0 bg-background rounded-2xl p-7 border border-border shadow-sm hover:shadow-lg hover:border-gold/40 transition-all"
            >
              <Quote className="text-gold/50 mb-4" size={32} />
              <p className="font-sans text-foreground text-sm leading-relaxed mb-5 line-clamp-4">"{t.text}"</p>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <Star key={s} className="text-gold fill-gold" size={14} />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div>
                  <h4 className="font-display text-sm font-semibold text-foreground">{t.name}</h4>
                  <p className="font-sans text-xs text-muted-foreground">{t.city} · {t.type}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
