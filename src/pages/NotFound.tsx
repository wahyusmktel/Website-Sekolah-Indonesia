import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Compass, Sparkles, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();
  const { data: settings } = useSiteSettings();
  const schoolName = settings?.school_name || "SMK Nusantara";

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Halaman Tidak Ditemukan | {schoolName}</title>
      </Helmet>

      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground font-sans">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 text-primary">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05]" />
        </div>

        {/* Content Container */}
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Glitch/Floating Effect */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative mb-8"
            >
              <h1 className="text-[12rem] md:text-[20rem] font-black text-white/5 leading-none select-none tracking-tighter italic">
                404
              </h1>
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_20px_50px_rgba(var(--primary-rgb),0.3)] mb-6 rotate-12">
                    <Ghost size={48} className="text-white animate-bounce" />
                  </div>
                  <Badge variant="glass" className="rounded-full px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em]">
                    Lost in Cyberspace
                  </Badge>
                </div>
              </motion.div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-tight">
                OOPS! KOORDINAT <br /> <span className="text-primary not-italic">TIDAK DITEMUKAN</span>
              </h2>
              <p className="text-white/40 text-lg md:text-xl font-light italic leading-relaxed max-w-2xl mx-auto">
                Sepertinya Anda telah menembus batas digital kami. Jalur yang Anda cari tidak tersedia di sistem <span className="text-white font-bold">{schoolName}</span>.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              <Button
                asChild
                size="xl"
                variant="gradient"
                className="rounded-2xl h-16 px-10 font-bold group shadow-[0_15px_30px_-5px_hsl(var(--primary)/0.4)]"
              >
                <Link to="/">
                  <Home className="mr-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                  Kembali ke Beranda
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="rounded-2xl h-16 px-10 font-bold border-white/10 text-white hover:bg-white/5 backdrop-blur-md group"
              >
                <Link to="/program">
                  Eksplorasi Program
                  <Compass className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            {/* Bottom Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-20 flex items-center justify-center gap-6"
            >
              <div className="w-12 h-px bg-white/10" />
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">
                <Sparkles size={12} className="text-primary" /> System Error 404
              </div>
              <div className="w-12 h-px bg-white/10" />
            </motion.div>
          </div>
        </div>

        {/* Decorative Floating Elements */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-4 h-4 bg-primary rounded-full blur-sm opacity-20"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white rounded-full blur-sm opacity-10"
        />
      </div>
    </>
  );
};

export default NotFound;
