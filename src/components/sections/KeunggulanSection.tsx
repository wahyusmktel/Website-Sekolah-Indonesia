import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Users, Building, Briefcase, Award, Heart } from "lucide-react";
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
    <section className="py-20 bg-gradient-soft" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            Kenapa Pilih Kami?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Keunggulan <span className="text-gradient">SMK Nusantara</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kami berkomitmen memberikan pendidikan berkualitas dengan fasilitas modern dan kurikulum berbasis industri
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keunggulan.map((item, index) => {
            const Icon = iconMap[item.icon] || GraduationCap;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:bg-gradient-primary transition-all duration-300">
                  <Icon className="w-7 h-7 text-accent-foreground group-hover:text-primary-foreground transition-colors" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
