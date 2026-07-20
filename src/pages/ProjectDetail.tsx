import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Play,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Calendar,
  User,
  Tag,
  Quote,
  ArrowRight,
  Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { SEO } from "@/components/SEO";
import ProgressiveImage from "@/components/ProgressiveImage";
import { SITE, getOrganizationSchema, getImageObjectSchema } from "@/lib/seo-config";
import { getResponsiveImageProps, getWebPUrl } from "@/lib/utils";
import { useProjectDetail, useReviews } from "@/hooks/use-site-data";

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const staggerDelay = (i: number) => ({ ...fadeUp, transition: { delay: i * 0.1, duration: 0.5 } });

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading } = useProjectDetail(id);
  const { data: reviews = [] } = useReviews();
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [comparePos, setComparePos] = useState(50);
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <SEO
          title="Loading Project | Home Decorative Interior"
          description="Loading interior design project details..."
          path={id ? `/project/${id}` : undefined}
          schemas={[getOrganizationSchema()]}
          noindex
        />
        <Navbar />
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <span className="font-sans text-muted-foreground text-sm">Loading project...</span>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <SEO
          title="Project Not Found | Home Decorative Interior"
          description="The requested project could not be found."
          path={id ? `/project/${id}` : undefined}
          noindex
        />
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-gold font-sans text-sm underline">Return to Projects</Link>
        </div>
      </div>
    );
  }

  const gallery = project.galleryImages?.length ? [project.img, ...project.galleryImages] : [project.img];
  const projectReviews = reviews.filter(
    (review: any) => review.projectName && review.projectName === project.title
  );
  const displayReviews = projectReviews.slice(0, 4);
  const avgRating = displayReviews.length
    ? Math.round(displayReviews.reduce((sum: number, review: any) => sum + (review.stars || 0), 0) / displayReviews.length)
    : 0;

  const projectTitle = `${project.title} — ${project.category} Interior Design in ${project.location}`;
  const projectDescription = `${project.title} — ${project.category} interior design project in ${project.location} by ${SITE.name}.`;

  return (
    <>
      <SEO
        title={projectTitle}
        description={projectDescription}
        keywords={`${project.category.toLowerCase()} interior design, ${project.location}, ${project.title}, home interiors, luxury design`}
        canonical={`${SITE.url}/project/${id}`}
        image={project.img}
        breadcrumbs={[
          { name: "Home", url: SITE.url },
          { name: "Projects", url: `${SITE.url}/projects` },
          { name: project.title, url: `${SITE.url}/project/${id}` },
        ]}
        schemas={[
          getOrganizationSchema(),
          getImageObjectSchema(project.img, `${project.title} — ${project.category} interior design`),
        ]}
      />
      <div className="bg-background">
        <Navbar />

        {/* ===== HERO SECTION ===== */}
        <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-charcoal/20 z-10" />
            <ProgressiveImage
              src={getWebPUrl(project.img)}
              className="w-full h-full object-cover"
              alt={`${project.title} — ${project.category} interior design in ${project.location}`}
              fetchPriority="high"
              showSkeleton
              style={{ position: "absolute", inset: 0 }}
            />
          </motion.div>

          <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-16 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/projects" className="flex items-center gap-2 text-cream/60 font-sans text-sm mb-6 hover:text-gold transition-colors w-fit group" aria-label="Back to projects">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-2 mb-3"
            >
              <span className="px-3 py-1 rounded-full bg-gold/20 backdrop-blur-md border border-gold/40 text-gold text-xs font-sans font-medium uppercase tracking-wider">
                {project.category}
              </span>
              {project.video && (
                <span className="px-3 py-1 rounded-full bg-cream/10 backdrop-blur-md border border-cream/20 text-cream/80 text-xs font-sans font-medium flex items-center gap-1.5">
                  <Play size={10} fill="currentColor" /> Video Tour
                </span>
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display text-3xl md:text-5xl lg:text-7xl text-cream font-bold mb-4 max-w-4xl leading-tight"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-5 text-cream/60 font-sans text-sm"
            >
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {project.location}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {project.year}</span>
              <span className="flex items-center gap-1.5"><User size={14} /> {project.client}</span>
              {avgRating > 0 && (
                <span className="flex items-center gap-1">
                  {Array.from({ length: avgRating }).map((_, i) => (
                    <Star key={i} className="text-gold fill-gold" size={14} />
                  ))}
                  <span className="ml-1 text-cream/60">({avgRating}.0)</span>
                </span>
              )}
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ChevronDown className="text-cream/40" size={20} />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== PROJECT INFO CARDS ===== */}
        <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: User, label: "Client", value: project.client },
              { icon: MapPin, label: "Location", value: project.location },
              { icon: Calendar, label: "Year Completed", value: project.year },
              { icon: Tag, label: "Category", value: project.category },
            ].map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                {...staggerDelay(i)}
                className="group bg-card rounded-2xl border border-border/60 p-5 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-500"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-3 group-hover:from-gold/30 group-hover:to-gold/10 group-hover:scale-105 transition-all duration-500">
                  <Icon className="text-gold" size={18} />
                </div>
                <p className="font-sans text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">{label}</p>
                <p className="font-display text-sm font-semibold text-foreground">{value}</p>
              </motion.div>
            ))}
          </div>

          {/* ===== GALLERY SECTION ===== */}
          <motion.div {...fadeUp} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">Project Gallery</h2>
              <span className="font-sans text-xs text-muted-foreground">{galleryIdx + 1} / {gallery.length}</span>
            </div>

            {/* Main gallery image */}
            <motion.div
              key={galleryIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-4 cursor-pointer group"
              onClick={() => setLightbox(galleryIdx)}
            >
              <ProgressiveImage
                src={getWebPUrl(gallery[galleryIdx])}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={`${project.title} gallery image ${galleryIdx + 1}`}
                showSkeleton
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-3 rounded-full bg-cream/90 text-charcoal">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </div>
              </div>
            </motion.div>

            {/* Gallery thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setGalleryIdx(i)}
                  className={`relative w-24 h-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    i === galleryIdx
                      ? "border-gold shadow-md shadow-gold/10 ring-1 ring-gold/30"
                      : "border-transparent hover:border-border/60 opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`View gallery image ${i + 1}`}
                >
                  <ProgressiveImage
                    src={getWebPUrl(img)}
                    className="w-full h-full object-cover"
                    alt={`Gallery thumbnail ${i + 1}`}
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* ===== LIGHTBOX ===== */}
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-[200] bg-charcoal/95 flex items-center justify-center"
              onClick={() => setLightbox(null)}
              role="dialog"
              aria-label="Image lightbox"
            >
              {/* Close button */}
              <button
                className="absolute top-6 right-6 text-cream/60 hover:text-cream z-20 transition-colors"
                onClick={() => setLightbox(null)}
                aria-label="Close lightbox"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>

              {/* Counter */}
              <span className="absolute top-6 left-6 font-sans text-sm text-cream/60 z-20">
                {lightbox + 1} / {gallery.length}
              </span>

              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream z-20 p-3 hover:bg-cream/5 rounded-full transition-all"
                onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }}
                aria-label="Previous image"
              >
                <ChevronLeft size={28} />
              </button>

              <motion.img
                key={lightbox}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                src={gallery[lightbox]}
                {...getResponsiveImageProps(gallery[lightbox])}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
                loading="lazy"
                alt={`${project.title} gallery image ${lightbox + 1}`}
                onClick={(e) => e.stopPropagation()}
              />

              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream z-20 p-3 hover:bg-cream/5 rounded-full transition-all"
                onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }}
                aria-label="Next image"
              >
                <ChevronRight size={28} />
              </button>
            </motion.div>
          )}

          {/* ===== VIDEO SECTION ===== */}
          <motion.div {...fadeUp} className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">Video Tour</h2>
            {project.video ? (
              <div className="aspect-video bg-charcoal rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src={getYouTubeEmbedUrl(project.video)}
                  title={`${project.title} video tour`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="relative aspect-video bg-gradient-to-br from-charcoal to-charcoal/80 rounded-2xl overflow-hidden shadow-xl group">
                <ProgressiveImage
                  src={getWebPUrl(project.img)}
                  className="w-full h-full object-cover absolute opacity-30 group-hover:opacity-40 transition-opacity duration-700"
                  alt=""
                  style={{ position: "absolute", inset: 0 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/20" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-gold transition-all duration-300 shadow-2xl shadow-gold/30 group-hover:shadow-gold/50">
                    <Play className="text-charcoal ml-1" size={28} fill="currentColor" />
                  </div>
                  <p className="font-sans text-cream/70 text-sm mt-4">Video walkthrough coming soon</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* ===== BEFORE & AFTER ===== */}
          {project.galleryImages?.length > 0 && (
            <motion.div {...fadeUp} className="mb-16">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">Before & After</h2>
              <div
                className="relative aspect-[16/9] overflow-hidden rounded-2xl select-none cursor-ew-resize shadow-xl group"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setComparePos(((e.clientX - rect.left) / rect.width) * 100);
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const touch = e.touches[0];
                  setComparePos(((touch.clientX - rect.left) / rect.width) * 100);
                }}
              >
                {/* Before image */}
                <ProgressiveImage
                  src={getWebPUrl(project.galleryImages[0] || project.img)}
                  className="absolute inset-0 w-full h-full object-cover grayscale"
                  alt="Before renovation"
                  style={{ position: "absolute", inset: 0 }}
                />

                {/* After image */}
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${comparePos}%` }}>
                  <img src={getWebPUrl(project.img)} {...getResponsiveImageProps(project.img)} className="w-full h-full object-cover" style={{ width: `${10000 / comparePos}%`, maxWidth: "none" }} alt="After renovation" loading="lazy" />
                </div>

                {/* Slider handle */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-gold z-10 shadow-lg" style={{ left: `${comparePos}%` }}>
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-gold rounded-full flex items-center justify-center shadow-xl shadow-gold/40 ring-4 ring-background">
                    <ChevronLeft size={16} className="text-charcoal" />
                    <ChevronRight size={16} className="text-charcoal" />
                  </div>
                </div>

                {/* Labels */}
                <span className="absolute top-4 left-4 font-sans text-xs text-cream bg-charcoal/70 backdrop-blur-md px-3 py-1.5 rounded-full z-20 border border-cream/10">After</span>
                <span className="absolute top-4 right-4 font-sans text-xs text-cream bg-charcoal/70 backdrop-blur-md px-3 py-1.5 rounded-full z-20 border border-cream/10">Before</span>
              </div>
            </motion.div>
          )}

          {/* ===== ABOUT THIS PROJECT ===== */}
          <motion.div {...fadeUp} className="mb-16 max-w-4xl">
            <div className="flex items-start gap-6">
              <div className="hidden md:block flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Quote className="text-gold" size={28} />
                </div>
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">About This Project</h2>
                <p className="font-sans text-muted-foreground leading-relaxed text-base mb-4">
                  {project.description || "This project embodies our design philosophy — architectural precision joined with warm, artful living."}
                </p>
                {/* Decorative divider */}
                <div className="flex items-center gap-3 my-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
                  <div className="w-2 h-2 rounded-full bg-gold/40" />
                  <div className="h-px flex-1 bg-gradient-to-l from-gold/30 via-gold/10 to-transparent" />
                </div>
                <p className="font-sans text-muted-foreground leading-relaxed text-base italic">
                  "In collaboration with {project.client}, we transformed this {project.category.toLowerCase()} into a refined environment where natural light, bespoke furnishings, and curated art come together."
                </p>
              </div>
            </div>
          </motion.div>

          {/* ===== CLIENT REVIEWS ===== */}
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">Client Reviews</h2>
              {avgRating > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full border border-gold/20">
                  <div className="flex gap-0.5">
                    {Array.from({ length: avgRating }).map((_, i) => (
                      <Star key={i} className="text-gold fill-gold" size={12} />
                    ))}
                  </div>
                  <span className="font-sans text-sm font-semibold text-gold">{avgRating}.0</span>
                  <span className="font-sans text-xs text-muted-foreground">({displayReviews.length})</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {displayReviews.length > 0 ? (
                displayReviews.map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-card rounded-2xl p-6 md:p-7 border border-border/60 hover:border-gold/20 hover:shadow-lg transition-all duration-500"
                  >
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: review.stars }).map((_, s) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + s * 0.05 }}
                        >
                          <Star className="text-gold fill-gold" size={14} />
                        </motion.span>
                      ))}
                    </div>
                    <p className="font-sans text-foreground text-sm leading-relaxed mb-5 italic">
                      "{review.text}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                        <span className="font-display text-sm font-semibold text-gold">
                          {review.name?.charAt(0) || "?"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-display text-sm font-semibold text-foreground">{review.name}</h4>
                        <p className="font-sans text-xs text-muted-foreground">{review.city}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 bg-card rounded-2xl border border-border/60">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-gold" size={24} />
                  </div>
                  <p className="font-sans text-muted-foreground text-sm">No client reviews yet for this project.</p>
                  <p className="font-sans text-xs text-muted-foreground mt-1">Be the first to share your experience.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* ===== BOTTOM CTA ===== */}
          <motion.div {...fadeUp} className="mt-20">
            <div className="relative bg-gradient-to-br from-charcoal to-charcoal/90 rounded-3xl overflow-hidden p-8 md:p-14">
              {/* Decorative pattern */}
              <div className="absolute inset-0 opacity-[0.04]">
                <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(42 45% 52%) 1px, transparent 0)", backgroundSize: "30px 30px" }} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-2">
                    Let's Create Something{" "}
                    <span className="text-gold italic">Beautiful</span>
                  </h3>
                  <p className="font-sans text-cream/60 text-sm max-w-lg">
                    Ready to transform your space? Share your vision with us and we'll bring it to life with the same passion and precision.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-charcoal font-sans text-sm font-semibold rounded-xl hover:bg-cream transition-all duration-300 shadow-xl shadow-gold/20 hover:shadow-gold/30 group flex-shrink-0"
                >
                  Start Your Project
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
};

export default ProjectDetail;
