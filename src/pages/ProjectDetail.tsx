import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Play, ChevronLeft, ChevronRight, MapPin, Calendar, User, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
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
        <span className="font-sans text-muted-foreground text-sm">Loading project…</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
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

  return (
    <div className="bg-background">
      <Navbar />

      <section className="relative h-[65vh] md:h-[75vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/30 z-10" />
        <img src={project.img} className="w-full h-full object-cover" alt={project.title} />
        <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-16 max-w-7xl mx-auto">
          <Link to="/projects" className="flex items-center gap-2 text-cream/70 font-sans text-sm mb-6 hover:text-gold transition-colors">
            <ArrowLeft size={14} /> Back to Projects
          </Link>
            <span className="inline-block px-3 py-1 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/40 text-gold text-xs font-sans font-medium w-fit mb-3 uppercase tracking-wider">
            {project.category}
          </span>
          <h1 className="font-display text-3xl md:text-6xl text-cream font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-cream/70 font-sans text-sm">
            <span className="flex items-center gap-1.5"><MapPin size={14} /> {project.location}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {project.year}</span>
            <span className="flex items-center gap-1.5"><User size={14} /> {project.client}</span>
            <span className="flex items-center gap-1">
              {Array.from({ length: avgRating }).map((_, i) => (
                <Star key={i} className="text-gold fill-gold" size={14} />
              ))}
              <span className="ml-1">({avgRating}.0)</span>
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { icon: User, label: "Client", value: project.client },
            { icon: MapPin, label: "Location", value: project.location },
            { icon: Calendar, label: "Year Completed", value: project.year },
            { icon: Tag, label: "Category", value: project.category },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-card rounded-xl border border-border p-4">
              <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center mb-3">
                <Icon className="text-gold" size={16} />
              </div>
              <p className="font-sans text-xs text-muted-foreground mb-0.5 uppercase tracking-wider">{label}</p>
              <p className="font-display text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        <div className="mb-14">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-5">Project Gallery</h2>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl mb-4 cursor-pointer" onClick={() => setLightbox(galleryIdx)}>
            <img src={gallery[galleryIdx]} className="w-full h-full object-cover" alt={`Gallery ${galleryIdx + 1}`} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setGalleryIdx(i)}
                className={`w-20 h-14 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${i === galleryIdx ? "border-gold" : "border-transparent hover:border-border"}`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Thumb ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {lightbox !== null && (
          <div className="fixed inset-0 z-[200] bg-charcoal/95 flex items-center justify-center" onClick={() => setLightbox(null)}>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-cream z-10 p-2" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }}>
              <ChevronLeft size={32} />
            </button>
            <img src={gallery[lightbox]} className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg" alt="Lightbox" onClick={(e) => e.stopPropagation()} />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-cream z-10 p-2" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }}>
              <ChevronRight size={32} />
            </button>
          </div>
        )}

        <div className="mb-14">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-5">Project Video Tour</h2>
          {project.video ? (
            <div className="aspect-video bg-charcoal rounded-2xl overflow-hidden">
              <iframe
                src={getYouTubeEmbedUrl(project.video)}
                title={`${project.title} video tour`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video bg-charcoal rounded-2xl relative flex items-center justify-center overflow-hidden">
              <img src={project.img} className="w-full h-full object-cover absolute opacity-40" alt="" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl shadow-gold/40">
                  <Play className="text-charcoal ml-1" size={28} fill="currentColor" />
                </div>
                <p className="font-sans text-cream text-sm mt-4">Watch Full Walkthrough</p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-14">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-5">Before & After</h2>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl select-none cursor-ew-resize" onMouseMove={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setComparePos(((e.clientX - rect.left) / rect.width) * 100); }}>
            <img src={project.galleryImages?.[0] || project.img} className="absolute inset-0 w-full h-full object-cover grayscale" alt="Before" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${comparePos}%` }}>
              <img src={project.img} className="w-full h-full object-cover" style={{ width: `${10000 / comparePos}%`, maxWidth: "none" }} alt="After" />
            </div>
            <div className="absolute top-0 bottom-0 w-[2px] bg-gold z-10" style={{ left: `${comparePos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg">
                <ChevronLeft size={14} className="text-charcoal" />
                <ChevronRight size={14} className="text-charcoal" />
              </div>
            </div>
            <span className="absolute top-4 left-4 font-sans text-xs text-cream bg-charcoal/60 backdrop-blur-sm px-3 py-1 rounded-full z-20">After</span>
            <span className="absolute top-4 right-4 font-sans text-xs text-cream bg-charcoal/60 backdrop-blur-sm px-3 py-1 rounded-full z-20">Before</span>
          </div>
        </div>

        <div className="mb-14 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-5">About This Project</h2>
          <p className="font-sans text-muted-foreground leading-relaxed mb-4">
            {project.description || "This project embodies our design philosophy — architectural precision joined with warm, artful living."}
          </p>
          <p className="font-sans text-muted-foreground leading-relaxed">
            In collaboration with {project.client}, we transformed this {project.category.toLowerCase()} into a refined environment where natural light, bespoke furnishings, and curated art come together.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-display text-2xl font-semibold text-foreground">Client Reviews</h2>
            <div className="flex items-center gap-1 px-3 py-1 bg-gold/10 rounded-full">
              <Star className="text-gold fill-gold" size={14} />
              <span className="font-sans text-sm font-semibold text-gold">{avgRating}.0</span>
              <span className="font-sans text-xs text-muted-foreground">({displayReviews.length})</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayReviews.length > 0 ? (
              displayReviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-6 border border-border"
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: review.stars }).map((_, s) => (
                      <Star key={s} className="text-gold fill-gold" size={14} />
                    ))}
                  </div>
                  <p className="font-sans text-foreground text-sm leading-relaxed mb-5 italic">"{review.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <div>
                      <h4 className="font-display text-sm font-semibold text-foreground">{review.name}</h4>
                      <p className="font-sans text-xs text-muted-foreground">{review.city}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="font-sans text-sm text-muted-foreground">No client reviews yet for this project.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default ProjectDetail;
