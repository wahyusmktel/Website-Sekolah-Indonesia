import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/use-site-settings";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: settings } = useSiteSettings();
  const schoolName = settings?.school_name || "SMK Nusantara";

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[3rem] bg-foreground p-12 md:p-24 text-center border border-white/10"
        >
          {/* Intense Geometric Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            {/* Lines */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, 20, 0],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute h-full w-px bg-white"
                  style={{ left: `${20 * i}%` }}
                />
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-black uppercase tracking-widest mb-10"
            >
              <Sparkles className="w-4 h-4" />
              Enrollment 2024 is Open
            </motion.div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 leading-[1.1] tracking-tight">
              Siap Menjadi Bagian dari <br />
              <span className="text-primary italic">Masa Depan?</span>
            </h2>

            <p className="text-white/60 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-16 leading-relaxed">
              Bergabunglah dengan ribuan alumni sukses kami dan mulailah perjalanan karirmu di {schoolName}.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="xl" variant="gradient" asChild className="rounded-full px-12 h-16 shadow-glow">
                <Link to="/ppdb" className="flex items-center gap-4">
                  Daftar PPDB Online
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </Button>
              <Button size="xl" variant="hero-outline" asChild className="rounded-full px-12 h-16 border-white/10 hover:bg-white/5 backdrop-blur-sm">
                <Link to="/kontak">Konsultasi Karir</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Abstract geometric element outside the card */}
      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <div className="w-[800px] h-[800px] border-[100px] border-foreground rounded-full" />
      </div>
    </section>
  );
}
