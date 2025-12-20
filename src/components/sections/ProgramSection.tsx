import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Code, Network, Palette, Calculator, TrendingUp, FileText, ArrowRight } from "lucide-react";
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
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Program Keahlian
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pilih <span className="text-gradient">Jurusan</span> Impianmu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            6 program keahlian dengan kurikulum berbasis industri dan prospek karir yang menjanjikan
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programKeahlian.map((program, index) => {
            const Icon = iconMap[program.icon] || Code;
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-primary relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-20 h-20 text-primary-foreground/30" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-background/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-6 h-6 text-background" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {program.shortDesc}
                  </p>
                  <Link
                    to={`/program#${program.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-medium text-sm group/link"
                  >
                    Pelajari Selengkapnya
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="gradient" size="lg" asChild>
            <Link to="/program">
              Lihat Semua Program
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
