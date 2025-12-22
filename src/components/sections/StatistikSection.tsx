import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Users, GraduationCap, Building, Award, Briefcase, Trophy, Loader2, HelpCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";

const iconMap: { [key: string]: React.ElementType } = {
  Users,
  GraduationCap,
  Building,
  Trophy,
  Briefcase,
  Award
};

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <span ref={ref}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export function StatistikSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: stats = [], isLoading } = useQuery({
    queryKey: ['statistik'],
    queryFn: async () => {
      const response = await apiClient.get('/statistik');
      return response.data;
    }
  });

  return (
    <section className="py-24 bg-foreground relative overflow-hidden" ref={ref}>
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-white" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-white)" />
        </svg>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
            {stats.map((stat: any, index: number) => {
              const Icon = iconMap[stat.icon] || HelpCircle;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="flex flex-col items-center group relative"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                      <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>

                  <div className="text-white/40 group-hover:text-primary transition-colors text-xs font-bold uppercase tracking-[0.2em] text-center">
                    {stat.label}
                  </div>

                  {/* Connector line */}
                  {index < stats.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-[-1px] w-[1px] h-12 bg-white/10 -translate-y-1/2" />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
