import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Code, Network, Palette, Calculator, TrendingUp, FileText, ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { programKeahlian } from "@/lib/dummy-data";

const iconMap: { [key: string]: React.ElementType } = {
  Code,
  Network,
  Palette,
  Calculator,
  TrendingUp,
  FileText,
};

export function ProgramSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative" ref={ref}>
      {/* Background Geometric Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="px-6 py-2 rounded-2xl bg-foreground text-background text-xs font-black tracking-[0.3em] uppercase">
              Curriculum 2024
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-black text-foreground mb-8"
          >
            Spesialisasi <span className="text-gradient underline decoration-primary/20 underline-offset-8">Masa Depan</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground text-xl font-light"
          >
            Kurikulum kami dirancang bersama mitra industri global untuk memastikan lulusan siap menghadapi tantangan ekonomi digital yang dinamis.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {programKeahlian.map((program, index) => {
            const Icon = iconMap[program.icon] || Code;
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-foreground/5 rounded-[2.5rem] overflow-hidden border border-border group-hover:border-primary/50 transition-all duration-500 shadow-soft group-hover:shadow-glow h-full flex flex-col">
                  {/* Image/Visual Area */}
                  <div className="h-64 relative overflow-hidden bg-foreground/5 group-hover:bg-primary transition-colors duration-500">
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`pattern-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="currentColor" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#pattern-${index})`} className="text-foreground group-hover:text-white" />
                      </svg>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center p-12">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="relative z-10 w-24 h-24 rounded-3xl bg-white dark:bg-foreground shadow-elevated flex items-center justify-center text-primary group-hover:text-white group-hover:bg-primary-dark transition-all duration-500"
                      >
                        <Icon className="w-12 h-12" />

                        {/* Abstract floating shapes */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-[2px] animate-float group-hover:bg-white/20" />
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-primary/10 rounded-lg rotate-12 blur-[1px] animate-float group-hover:bg-white/10" style={{ animationDelay: "1s" }} />
                      </motion.div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 group-hover:text-white/60">Program ID: 0{program.id}</span>
                      <Layers className="w-4 h-4 text-foreground/20 group-hover:text-white/20" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-10 flex flex-col flex-1">
                    <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                      {program.name}
                    </h3>
                    <p className="text-muted-foreground font-light leading-relaxed mb-8 flex-1">
                      {program.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {program.prospects.slice(0, 2).map((job, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider">
                          {job}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/program#${program.slug}`}
                      className="inline-flex items-center gap-2 group/btn"
                    >
                      <span className="text-sm font-black uppercase tracking-widest text-primary">Detail Profil</span>
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center group-hover/btn:translate-x-2 transition-transform duration-300">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Explore More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 flex flex-col items-center"
        >
          <div className="mb-8 w-px h-20 bg-gradient-to-b from-border to-transparent" />
          <Button variant="hero" size="xl" asChild className="rounded-full px-12 border border-foreground/5 hover:border-primary/20 group">
            <Link to="/program" className="flex items-center gap-4">
              Jelajahi Semua Jurusan
              <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center group-hover:bg-primary transition-colors">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
