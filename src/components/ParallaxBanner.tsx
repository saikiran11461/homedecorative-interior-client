import { motion } from "framer-motion";

interface ParallaxBannerProps {
  quote: string;
  author?: string;
  bgImage?: string;
  variant?: "gold" | "dark";
}

const ParallaxBanner = ({
  quote,
  author,
  bgImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000",
  variant = "dark",
}: ParallaxBannerProps) => (
  <section className="relative py-28 md:py-36 overflow-hidden">
    {/* Background with parallax effect */}
    <div className="absolute inset-0">
      <div
        className={`absolute inset-0 z-10 ${
          variant === "gold"
            ? "bg-gradient-to-r from-gold/90 via-gold/85 to-gold/80"
            : "bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-charcoal/75"
        }`}
      />
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="w-full h-full"
      >
        <img
          src={bgImage}
          className="w-full h-full object-cover"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </motion.div>
    </div>

    {/* Content */}
    <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {variant === "gold" ? (
          <>
            <span className="text-6xl md:text-8xl font-display text-charcoal/20 leading-none block mb-4">
              “
            </span>
            <blockquote className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold text-charcoal leading-tight">
              {quote}
            </blockquote>
            {author && (
              <cite className="font-sans text-base text-charcoal/70 not-italic mt-6 block font-medium">
                — {author}
              </cite>
            )}
          </>
        ) : (
          <>
            <span className="text-6xl md:text-8xl font-display text-gold/30 leading-none block mb-4">
              “
            </span>
            <blockquote className="font-display text-2xl md:text-4xl lg:text-5xl font-semibold text-cream leading-tight">
              {quote}
            </blockquote>
            {author && (
              <cite className="font-sans text-base text-cream/60 not-italic mt-6 block font-medium">
                — {author}
              </cite>
            )}
          </>
        )}
      </motion.div>
    </div>
  </section>
);

export default ParallaxBanner;
