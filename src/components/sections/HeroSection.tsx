import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg1 from "@/assets/hero-1.jpg";
import heroImg2 from "@/assets/hero-2.jpg";
import heroImg3 from "@/assets/hero-3.jpg";

const slides = [
  {
    id: 1,
    title: "Selamat Datang di SMK Nusantara",
    subtitle: "Mencetak Generasi Unggul, Berkarakter, dan Siap Kerja",
    image: heroImg1,
    cta: "Daftar Sekarang",
    ctaLink: "/ppdb",
  },
  {
    id: 2,
    title: "Fasilitas Modern & Lengkap",
    subtitle: "Laboratorium, Workshop, dan Ruang Praktik Standar Industri",
    image: heroImg2,
    cta: "Lihat Fasilitas",
    ctaLink: "/profil",
  },
  {
    id: 3,
    title: "Raih Masa Depan Cerah",
    subtitle: "Alumni Sukses di Berbagai Perusahaan Ternama",
    image: heroImg3,
    cta: "Lihat Program",
    ctaLink: "/program",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />

                {/* Content */}
                <div className="relative h-full container mx-auto px-4 flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="max-w-2xl"
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-lg md:text-xl text-background/90 mb-8"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="flex flex-wrap gap-4"
                    >
                      <Button size="xl" variant="hero" asChild>
                        <Link to={slide.ctaLink}>{slide.cta}</Link>
                      </Button>
                      <Button size="xl" variant="hero-outline" asChild>
                        <Link to="/kontak">Hubungi Kami</Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/30 transition-colors z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-background/30 transition-colors z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-8 h-3 bg-primary"
                : "w-3 h-3 bg-background/50 hover:bg-background/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
