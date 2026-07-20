import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { SEO } from "@/components/SEO";
import ProgressiveImage from "@/components/ProgressiveImage";
import { pages, getOrganizationSchema, getWebsiteSchema, SITE } from "@/lib/seo-config";
import { getResponsiveImageProps, getWebPUrl } from "@/lib/utils";
import { useProjectsContent } from "@/hooks/use-site-data";

const PAGE_SIZE = 6;

const ProjectsPage = () => {
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);
  const { data } = useProjectsContent();
  const categories = data?.categories ?? [];
  const projects = data?.projects ?? [];

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changeCategory = (cat: string) => {
    setActive(cat);
    setPage(1);
  };

  const imageSchemas = visible.map((project) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    url: project.img,
    caption: `${project.title} — ${project.category} interior design in ${project.location} by ${SITE.name}`,
    contentLocation: `${project.location}`,
    author: { "@type": "Organization", name: SITE.name },
  }));

  return (
    <>
      <SEO
        page={pages.projects}
        breadcrumbs={[
          { name: "Home", url: "https://www.homedecorativeinterior.com/" },
          { name: "Projects", url: "https://www.homedecorativeinterior.com/projects" },
        ]}
        schemas={[getOrganizationSchema(), getWebsiteSchema(), ...imageSchemas]}
      />
      <div className="bg-background">
        <Navbar />

        {/* ===== HERO SECTION ===== */}
        <section className="relative pt-32 pb-16 px-6 bg-charcoal overflow-hidden min-h-[50vh] flex items-center">
          {/* Background image */}
          <div className="absolute inset-0 opacity-15">
            <img src={getWebPUrl("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000")} className="w-full h-full object-cover" alt="" loading="lazy" />
          </div>
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/95" />
          {/* Decorative pattern dots */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(42 45% 52%) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          </div>

          <div className="relative max-w-7xl mx-auto text-center w-full">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-sans font-medium uppercase tracking-widest mb-4"
            >
              Portfolio
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-4 leading-tight"
            >
              Our <span className="text-gold italic font-medium">Projects</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-sans text-cream/60 text-base md:text-lg max-w-xl mx-auto"
            >
              Explore our carefully curated collection of residential, commercial, and hospitality interiors — each space tells a unique story.
            </motion.p>
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-6 h-10 rounded-full border border-cream/30 flex items-start justify-center pt-2"
              >
                <div className="w-1 h-2 rounded-full bg-gold" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== FILTER BAR ===== */}
        <section className="px-6 sticky top-[64px] z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 py-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => changeCategory(cat)}
                className={`relative px-5 py-2.5 text-sm font-sans font-medium rounded-full transition-all duration-300 ${
                  active === cat
                    ? "bg-gold text-charcoal shadow-md shadow-gold/20 scale-105"
                    : "bg-secondary/50 text-muted-foreground hover:bg-gold/10 hover:text-gold border border-transparent hover:border-gold/20"
                }`}
                aria-label={`Filter by ${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ===== PROJECTS GRID ===== */}
        <section className="px-6 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {visible.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: idx * 0.05 }}
                    className="group relative bg-card rounded-2xl overflow-hidden border border-border/60 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500"
                  >
                    <Link to={`/project/${project.id}`} aria-label={`View project: ${project.title}`}>
                      {/* Image container */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <ProgressiveImage
                          src={getWebPUrl(project.img)}
                          alt={`${project.title} — ${project.category} interior design in ${project.location}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          showSkeleton
                        />
                        {/* Hover overlay - glassmorphism */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        
                        {/* Top badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                          <span className="px-3 py-1.5 rounded-full bg-charcoal/70 backdrop-blur-md text-cream text-xs font-sans font-medium border border-cream/10">
                            {project.category}
                          </span>
                          {project.video && (
                            <span className="px-3 py-1.5 rounded-full bg-gold/90 backdrop-blur-md text-charcoal text-xs font-sans font-medium flex items-center gap-1.5">
                              <Play size={10} fill="currentColor" />
                              Video
                            </span>
                          )}
                        </div>

                        {/* Hover info panel - slides up from bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                          <div className="flex items-center gap-3 text-cream/80 text-xs font-sans">
                            <span className="flex items-center gap-1"><MapPin size={12} /> {project.location}</span>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {project.year}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card footer */}
                      <div className="p-5 flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-gold transition-colors truncate">
                            {project.title}
                          </h3>
                          <p className="font-sans text-sm text-muted-foreground mt-0.5">
                            {project.location} · {project.year}
                          </p>
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:text-charcoal transition-all duration-300 mt-0.5">
                          <ArrowUpRight size={16} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* ===== PAGINATION ===== */}
            {pageCount > 1 && (
              <nav aria-label="Projects pagination" className="mt-16">
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-3 rounded-xl border border-border text-foreground hover:bg-secondary hover:border-gold/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`relative w-11 h-11 rounded-xl font-sans text-sm font-semibold transition-all duration-300 ${
                          p === page
                            ? "bg-gold text-charcoal shadow-md shadow-gold/20 scale-105"
                            : "border border-border/60 text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-gold/20"
                        }`}
                        aria-label={`Page ${p}`}
                        aria-current={p === page ? "page" : undefined}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                    disabled={page === pageCount}
                    className="p-3 rounded-xl border border-border text-foreground hover:bg-secondary hover:border-gold/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Page info */}
                <p className="text-center font-sans text-xs text-muted-foreground mt-4">
                  Page {page} of {pageCount} · {filtered.length} projects
                </p>
              </nav>
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="font-sans text-muted-foreground">No projects found in this category.</p>
              </motion.div>
            )}
          </div>
        </section>

        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
};

export default ProjectsPage;
