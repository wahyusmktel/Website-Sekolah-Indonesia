import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Users, Building, Briefcase, Award, Heart, ArrowUpRight } from "lucide-react";
import { keunggulan } from "@/lib/dummy-data";

const iconMap: { [key: string]: React.ElementType } = {
  GraduationCap,
  Users,
  Building,
  Briefcase,
  Award,
  Heart,
};

export function KeunggulanSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Why SMK Nusantara
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-[1.1]">
              Investasi Terbaik untuk <br />
              <span className="text-gradient">Masa Depanmu</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed">
              Kami menggabungkan kurikulum akademik yang kuat dengan pengalaman praktis langsung dari industri terkemuka.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="w-32 h-32 rounded-3xl bg-foreground text-background flex flex-col items-center justify-center -rotate-12 hover:rotate-0 transition-transform duration-500 cursor-help">
              <span className="text-4xl font-black">100%</span>
              <span className="text-[10px] uppercase font-bold tracking-widest">Quality</span>
            </div>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {keunggulan.map((item, index) => {
            const Icon = iconMap[item.icon] || GraduationCap;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-10 rounded-[2.5rem] bg-white/40 dark:bg-foreground/5 backdrop-blur-sm border border-border group-hover:border-primary/20 transition-all duration-500 h-full flex flex-col items-start overflow-hidden">
                  {/* Decorative Geometric Shape */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />

                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-foreground/10 shadow-soft flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Icon className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-light mb-8 flex-1">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                    Siswa Unggul <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Geometric background element */}
                  <div className="absolute bottom-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                    <Icon className="w-32 h-32 rotate-12" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
