import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Image as ImageIcon, X, ChevronLeft, ChevronRight, Share2, Download } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { albumList } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";
import NotFound from "./NotFound";

export default function AlbumDetail() {
    const { slug } = useParams();
    const album = albumList.find((a) => a.slug === slug);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    if (!album) {
        return <NotFound />;
    }

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + album.items.length) % album.items.length);
        }
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % album.items.length);
        }
    };

    return (
        <>
            <Helmet>
                <title>{album.title} - Galeri SMK Nusantara</title>
                <meta name="description" content={album.description} />
            </Helmet>
            <PublicLayout>
                {/* Gallery Hero */}
                <section className="relative pt-40 pb-20 overflow-hidden bg-foreground">
                    <div className="absolute inset-0 opacity-30">
                        <img src={album.coverImage} className="w-full h-full object-cover blur-md scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground to-transparent" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Link to="/galeri" className="inline-flex items-center gap-2 text-primary-light text-xs font-black uppercase tracking-[0.2em] mb-12 hover:gap-4 transition-all">
                                <ArrowLeft className="w-4 h-4" /> Kembali ke Galeri
                            </Link>

                            <div className="flex flex-wrap items-center gap-6 mb-8 text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    {new Date(album.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                                    <ImageIcon className="w-4 h-4 text-primary" />
                                    {album.items.length} Dokumentasi
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                                {album.title}
                            </h1>
                            <p className="text-white/60 text-xl font-light max-w-3xl leading-relaxed">
                                {album.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Masonry-like Grid */}
                <section className="py-24 bg-white dark:bg-foreground/[0.02]">
                    <div className="container mx-auto px-4">
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                            {album.items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="relative group rounded-[2.5rem] overflow-hidden cursor-pointer bg-muted border border-border shadow-soft hover:shadow-glow transition-all duration-500"
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                                            <div className="flex gap-4">
                                                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors">
                                                    <Share2 size={16} />
                                                </button>
                                                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors">
                                                    <Download size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Lightbox / Overlay */}
                <AnimatePresence>
                    {selectedImageIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                            onClick={() => setSelectedImageIndex(null)}
                        >
                            {/* Top Bar */}
                            <div className="absolute top-0 inset-x-0 p-8 flex justify-between items-center z-10">
                                <div className="text-white/60 text-xs font-black uppercase tracking-widest whitespace-nowrap">
                                    {selectedImageIndex + 1} / {album.items.length} — {album.items[selectedImageIndex].title}
                                </div>
                                <button
                                    className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
                                    onClick={() => setSelectedImageIndex(null)}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Navigation */}
                            <button
                                className="absolute left-8 w-16 h-16 rounded-full bg-white/5 text-white hidden md:flex items-center justify-center hover:bg-white/10 transition-all border border-white/10"
                                onClick={handlePrev}
                            >
                                <ChevronLeft size={32} />
                            </button>
                            <button
                                className="absolute right-8 w-16 h-16 rounded-full bg-white/5 text-white hidden md:flex items-center justify-center hover:bg-white/10 transition-all border border-white/10"
                                onClick={handleNext}
                            >
                                <ChevronRight size={32} />
                            </button>

                            {/* Image Container */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative max-w-5xl w-full h-full flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={album.items[selectedImageIndex].image}
                                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                                    alt={album.items[selectedImageIndex].title}
                                />
                            </motion.div>

                            {/* Bottom Info */}
                            <div className="absolute bottom-8 inset-x-0 text-center px-4">
                                <h3 className="text-white text-xl font-bold mb-2">{album.items[selectedImageIndex].title}</h3>
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">SMK Nusantara Press Dokumentasi</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </PublicLayout>
        </>
    );
}
