import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Calendar, Eye, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { beritaList } from "@/lib/dummy-data";

export function NewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white dark:bg-foreground/[0.02]" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
              <TrendingUp className="w-4 h-4" />
              Latest Updates
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground">
              Wawasan <span className="text-gradient">& Berita</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Button variant="ghost" className="group text-primary hover:text-primary hover:bg-primary/5 px-0" asChild>
              <Link to="/berita" className="flex items-center gap-2">
                Lihat Semua Berita
                <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {beritaList.slice(0, 3).map((berita, index) => (
            <motion.article
              key={berita.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col"
            >
              <Link to={`/berita/${berita.slug}`} className="relative h-72 rounded-[2rem] overflow-hidden mb-6 block">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <Badge className="bg-white/90 backdrop-blur-md text-foreground border-none hover:bg-white px-4 py-1.5 rounded-full shadow-soft font-bold text-[10px] uppercase tracking-wider">
                    {berita.category}
                  </Badge>
                </div>

                {/* Geometric decoration */}
                <div className="absolute top-6 right-6 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
              </Link>

              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">
                <span className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-primary" />
                  {new Date(berita.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-border" />
                <span className="flex items-center gap-2">
                  <Eye className="w-3 h-3 text-primary" />
                  {berita.views} Views
                </span>
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                <Link to={`/berita/${berita.slug}`}>
                  {berita.title}
                </Link>
              </h3>

              <p className="text-muted-foreground font-light line-clamp-2 mb-6 text-lg">
                {berita.excerpt}
              </p>

              <div className="mt-auto pt-6 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-primary">
                    AN
                  </div>
                  <span className="text-sm font-bold text-foreground/70">{berita.author}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
