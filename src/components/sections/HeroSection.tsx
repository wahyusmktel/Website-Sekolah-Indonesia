import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useSiteSettings } from "@/hooks/use-site-settings";
import apiClient from "@/lib/api-client";
import { getImageUrl } from "@/lib/image-utils";
import heroImg1 from "@/assets/hero-1.jpg";
import heroImg2 from "@/assets/hero-2.jpg";
import heroImg3 from "@/assets/hero-3.jpg";

// Fallback slides while loading or if empty
const getFallbackSlides = (schoolName: string) => [
  {
    id: 1,
    title: "Masa Depan Digital Dimulai di Sini",
    subtitle: `${schoolName} menghadirkan pendidikan vokasi berbasis teknologi masa depan dengan standar industri global.`,
    image: heroImg1,
    cta: "Mulai Jelajahi",
    cta_link: "/program",
    tag: "Inovasi Pendidikan",
  },
  {
    id: 2,
    title: "Kembangkan Bakat Tanpa Batas",
    subtitle: "Fasilitas laboratorium kelas dunia dan pengajar praktisi siap membimbingmu menjadi ahli di bidangnya.",
    image: heroImg2,
    cta: "Lihat Fasilitas",
    cta_link: "/profil",
    tag: "Fasilitas Unggul",
  },
  {
    id: 3,
    title: "Siap Kerja & Siap Wirausaha",
    subtitle: "Kurikulum yang dirancang khusus untuk memenuhi kebutuhan dunia kerja modern dan ekosistem startup.",
    image: heroImg3,
    cta: "Daftar Sekarang",
    cta_link: "/ppdb",
    tag: "Karir Global",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { data: settings } = useSiteSettings();
  const schoolName = settings?.school_name || "SMK Nusantara";

  const { data: apiSlides, isLoading } = useQuery({
    queryKey: ['hero-slides'],
    queryFn: async () => {
      const response = await apiClient.get('/hero-slides');
      return response.data;
    }
  });

  const slides = apiSlides && apiSlides.length > 0 ? apiSlides : (isLoading ? [] : getFallbackSlides(schoolName));

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, slides.length]);

  if (isLoading && slides.length === 0) {
    return (
      <div className="h-screen w-full bg-foreground flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-foreground">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id || index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center scale-110"
                  style={{ backgroundImage: `url(${typeof slide.image === 'string' ? getImageUrl(slide.image) : slide.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-foreground via-foreground/40 to-transparent" />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
                </div>

                {/* Geometric Decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <motion.div
                    initial={{ x: -100, y: -100, rotate: -45, opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: -45, opacity: 0.1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary rounded-3xl"
                  />
                  <motion.div
                    initial={{ x: 100, y: 100, rotate: 15, opacity: 0 }}
                    animate={{ x: 0, y: 0, rotate: 15, opacity: 0.1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] border-[40px] border-primary rounded-full"
                  />
                </div>

                {/* Content */}
                <div className="relative h-full container mx-auto px-4 flex items-center">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-light text-sm font-bold mb-6"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      {slide.tag}
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="text-5xl md:text-7xl lg:text-8xl font-black text-background mb-8 leading-tight tracking-tight"
                    >
                      {slide.title.split(" ").map((word, i) => (
                        <span key={i} className="inline-block mr-[0.2em]">
                          {word}
                        </span>
                      ))}
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="text-xl md:text-2xl text-background/80 mb-10 leading-relaxed max-w-xl font-light"
                    >
                      {slide.subtitle}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="flex flex-wrap gap-6"
                    >
                      <Button size="xl" variant="gradient" asChild className="group">
                        <Link to={slide.cta_link}>
                          {slide.cta}
                          <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button size="xl" variant="hero-outline" asChild className="backdrop-blur-sm border-white/20 hover:bg-white/10">
                        <Link to="/kontak">Konsultasi Gratis</Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-12 right-12 z-20 flex items-center gap-6">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className="group relative h-12 w-1 flex items-end bg-background/20 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-x-0 bottom-0 bg-primary"
                  initial={{ height: 0 }}
                  animate={{ height: index === currentSlide ? "100%" : "0%" }}
                  transition={{ duration: index === currentSlide ? 7 : 0.3 }}
                />
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                prevSlide();
                setIsAutoPlaying(false);
              }}
              className="w-14 h-14 rounded-2xl bg-background/10 backdrop-blur-xl border border-background/20 flex items-center justify-center text-background hover:bg-primary hover:border-primary transition-all duration-300 group"
            >
              <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                nextSlide();
                setIsAutoPlaying(false);
              }}
              className="w-14 h-14 rounded-2xl bg-background/10 backdrop-blur-xl border border-background/20 flex items-center justify-center text-background hover:bg-primary hover:border-primary transition-all duration-300 group"
            >
              <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-background/50"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
