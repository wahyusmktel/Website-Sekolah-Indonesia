import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, GraduationCap, Building, Award, Briefcase, Trophy } from "lucide-react";
import { statistik } from "@/lib/dummy-data";

const stats = [
  { icon: Users, value: statistik.siswa, label: "Siswa Aktif", suffix: "+" },
  { icon: GraduationCap, value: statistik.guru, label: "Guru & Staff", suffix: "" },
  { icon: Building, value: statistik.jurusan, label: "Program Keahlian", suffix: "" },
  { icon: Trophy, value: statistik.prestasi, label: "Prestasi", suffix: "+" },
  { icon: Briefcase, value: statistik.perusahaanMitra, label: "Mitra Industri", suffix: "+" },
  { icon: Award, value: statistik.alumni, label: "Alumni Sukses", suffix: "+" },
];

export function StatistikSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 bg-gradient-primary" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <Icon className="w-8 h-8 text-primary-foreground/80 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-primary-foreground/80 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
