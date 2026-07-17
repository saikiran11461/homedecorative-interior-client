import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
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

  return (
    <div className="bg-background">
      <Navbar />

      <section className="relative pt-32 pb-12 px-6 bg-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-sans font-medium uppercase tracking-widest mb-4">
            Portfolio
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cream mb-3">
            Our <span className="text-gold italic font-medium">Projects</span>
          </h1>
          <p className="font-sans text-cream/70 text-base max-w-xl mx-auto">
            Explore our collection of interior designs across residential, commercial, and outdoor spaces.
          </p>
        </div>
      </section>

      <section className="px-6 sticky top-[64px] z-30 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2 py-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => changeCategory(cat)}
              className={`px-4 py-2 text-sm font-sans font-medium rounded-lg transition-all duration-200 ${
                active === cat
                  ? "bg-gold text-charcoal shadow-sm"
                  : "bg-secondary text-muted-foreground hover:bg-gold/10 hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:border-gold/40 transition-all"
                >
                  <Link to={`/project/${project.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-charcoal/70 backdrop-blur-sm text-cream text-xs font-medium">
                        {project.category}
                      </span>
                      {project.video && (
                        <div className="absolute top-3 right-3 p-1.5 rounded-full bg-gold text-charcoal">
                          <Play size={12} fill="currentColor" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-gold transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="text-muted-foreground group-hover:text-gold transition-colors flex-shrink-0 mt-1" size={18} />
                      </div>
                      <p className="font-sans text-sm text-muted-foreground">{project.location} · {project.year}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {pageCount > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2.5 rounded-lg border border-border text-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-lg font-sans text-sm font-semibold transition-colors ${
                    p === page
                      ? "bg-gold text-charcoal"
                      : "border border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className="p-2.5 rounded-lg border border-border text-foreground hover:bg-secondary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default ProjectsPage;
