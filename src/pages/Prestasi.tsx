import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Trophy, Search, Filter, Star, Medal,
    MapPin, Calendar, Award, Sparkles,
    ChevronRight, ExternalLink
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { getImageUrl } from "@/lib/image-utils";

const Prestasi = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [prestasiList, setPrestasiList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrestasi = async () => {
            try {
                const { data } = await apiClient.get("/prestasi");
                setPrestasiList(data);
            } catch (error) {
                console.error("Error fetching prestasi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPrestasi();
    }, []);

    const categories = ["Semua", ...new Set(prestasiList.map(item => item.category))];

    const filteredPrestasi = prestasiList.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.winner.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "Semua" || item.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-foreground">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Prestasi Siswa - SMK Nusantara</title>
                <meta name="description" content="Koleksi prestasi dan penghargaan yang diraih oleh siswa-siswi terbaik SMK Nusantara di tingkat kota, provinsi, hingga nasional." />
            </Helmet>
            <PublicLayout>
                {/* Modern Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-foreground">
                    {/* Geometric Background Elements */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center max-w-4xl mx-auto"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
                                <Trophy className="w-4 h-4 text-primary" />
                                <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">Wall of Excellence</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight italic">
                                JEJAK <span className="text-primary text-stroke-white">JUARA</span> <br /> SMK NUSANTARA
                            </h1>
                            <p className="text-white/40 text-xl font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                                Dedikasi, bakat, dan semangat pantang menyerah yang membuahkan hasil membanggakan di berbagai kancah kompetisi.
                            </p>

                            {/* Stats Bar */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5">
                                {[
                                    { label: "Total Juara", value: "200+", icon: Medal },
                                    { label: "Tingkat Nasional", value: "45", icon: Star },
                                    { label: "Tingkat Provinsi", value: "82", icon: Award },
                                    { label: "Gold Medals", value: "12", icon: Sparkles },
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col items-center">
                                        <stat.icon className="w-6 h-6 text-primary mb-3" />
                                        <span className="text-3xl font-black text-white tracking-tighter">{stat.value}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Search & Filter Bar */}
                <section className="sticky top-20 z-40 bg-white dark:bg-foreground/95 backdrop-blur-md border-b border-border py-6">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                            <div className="relative w-full lg:max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Cari nama siswa atau kompetisi..."
                                    className="pl-12 h-14 rounded-2xl bg-foreground/5 border-none focus-visible:ring-2 focus-visible:ring-primary/50 text-lg"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center">
                                {categories.map((cat) => (
                                    <Button
                                        key={cat}
                                        variant={activeCategory === cat ? "default" : "ghost"}
                                        className={`rounded-full px-6 py-6 text-xs font-black uppercase tracking-widest ${activeCategory === cat ? 'shadow-glow' : 'text-muted-foreground'
                                            }`}
                                        onClick={() => setActiveCategory(cat)}
                                    >
                                        {cat}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Achievements Grid */}
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            <AnimatePresence mode="popLayout">
                                {filteredPrestasi.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="group"
                                    >
                                        <div className="relative rounded-[2.5rem] bg-white dark:bg-foreground/5 border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 shadow-soft hover:shadow-card group-hover:-translate-y-2">
                                            {/* Image Preview */}
                                            <div className="aspect-[16/10] overflow-hidden relative">
                                                <img
                                                    src={getImageUrl(item.image)}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent opacity-60" />
                                                <Badge className="absolute top-6 left-6 rounded-full bg-primary/90 backdrop-blur-md px-4 py-2 text-[10px] font-black uppercase tracking-widest border-none">
                                                    {item.level}
                                                </Badge>
                                            </div>

                                            {/* Content */}
                                            <div className="p-8">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Badge variant="outline" className="rounded-full border-primary/20 text-primary uppercase text-[9px] font-black tracking-widest px-3 py-1">
                                                        {item.category}
                                                    </Badge>
                                                    <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest ml-auto flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" /> {item.date}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl font-black text-foreground mb-4 tracking-tighter leading-tight italic group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>

                                                <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-foreground/5 dark:bg-white/5 border border-border/50">
                                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                        <Star className="w-5 h-5 fill-primary" />
                                                    </div>
                                                    <div>
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground block leading-none mb-1">Pemenang</span>
                                                        <span className="font-bold text-sm tracking-tight">{item.winner}</span>
                                                    </div>
                                                </div>

                                                <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8 line-clamp-2 italic">
                                                    "{item.description}"
                                                </p>

                                                <div className="pt-6 border-t border-border flex items-center justify-between">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Achievement Details</span>
                                                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-primary hover:text-white transition-all group/btn" asChild>
                                                        <Link to={`/prestasi/${item.slug}`}>
                                                            Lihat Detail <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredPrestasi.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-40"
                            >
                                <Search className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
                                <h3 className="text-2xl font-black text-foreground/50 tracking-tighter italic">Data Tidak Ditemukan</h3>
                                <p className="text-muted-foreground font-light">Coba sesuaikan kata kunci atau kategori pencarian Anda.</p>
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Highlight Section (CTA) */}
                <section className="py-24 bg-foreground relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-half left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-5xl mx-auto rounded-[4rem] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl border border-white/10 p-16 lg:p-24 text-center">
                            <Sparkles className="w-16 h-16 text-primary mx-auto mb-10 animate-pulse" />
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8 italic">
                                INGIN MENJADI BAGIAN DARI <br />
                                <span className="text-primary">GENERASI JUARA?</span>
                            </h2>
                            <p className="text-white/40 text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed italic">
                                "Kemenangan bukan akhir, tapi awal dari perjalanan yang lebih besar. Mari asah bakatmu bersama ekosistem pendukung terbaik."
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <Button size="xl" variant="hero" className="rounded-full px-16 h-20 text-xs font-black uppercase tracking-[0.2em] shadow-glow" asChild>
                                    <Link to="/ppdb">Daftar Sekarang</Link>
                                </Button>
                                <Button size="xl" variant="ghost" className="text-white hover:text-primary text-xs font-black uppercase tracking-[0.2em] transition-colors" asChild>
                                    <a href="https://wa.me/628123456789">Konsultasi Bakat</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
};

export default Prestasi;
