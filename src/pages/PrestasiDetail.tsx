import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
    Trophy, ArrowLeft, Calendar, User,
    MapPin, Share2, Award, Star, Sparkles,
    ChevronRight, Quote
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { getImageUrl } from "@/lib/image-utils";
import NotFound from "./NotFound";

const PrestasiDetail = () => {
    const { slug } = useParams();
    const [achievement, setAchievement] = useState<any>(null);
    const [relatedAchievements, setRelatedAchievements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/prestasi/${slug}`);
                setAchievement(data);

                // Fetch related (all for now then filter)
                const { data: all } = await axios.get("http://localhost:5000/api/prestasi");
                setRelatedAchievements(all.filter((p: any) => p.category === data.category && p.id !== data.id).slice(0, 2));
            } catch (error) {
                console.error("Error fetching achievement detail:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-foreground">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    if (!achievement) return <NotFound />;

    return (
        <>
            <Helmet>
                <title>{achievement.title} - SMK Nusantara</title>
                <meta name="description" content={achievement.description} />
            </Helmet>
            <PublicLayout>
                {/* Artistic Hero Header */}
                <section className="relative pt-32 pb-60 overflow-hidden bg-foreground">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={getImageUrl(achievement.image)}
                            alt={achievement.title}
                            className="w-full h-full object-cover opacity-30 scale-110 blur-sm"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/80 to-background" />
                        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12"
                        >
                            <Button variant="ghost" className="text-white hover:text-primary transition-colors group p-0" asChild>
                                <Link to="/prestasi">
                                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Kembali ke Galeri Prestasi
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-4xl"
                        >
                            <div className="flex flex-wrap gap-3 mb-8">
                                <Badge className="rounded-full bg-primary/20 text-primary border-primary/20 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                                    {achievement.level} Excellence
                                </Badge>
                                <Badge variant="outline" className="rounded-full border-white/20 text-white/60 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
                                    {achievement.category}
                                </Badge>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1] italic">
                                {achievement.title}
                            </h1>

                            <div className="flex flex-wrap gap-8 items-center py-8 border-y border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">Penerima</span>
                                        <span className="text-white font-bold">{achievement.winner}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">Tahun</span>
                                        <span className="text-white font-bold">{achievement.date}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="relative z-20 -mt-40 pb-32">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-12 gap-16">
                            {/* Main Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-8"
                            >
                                <div className="rounded-[3.5rem] overflow-hidden shadow-elevated mb-16 relative group">
                                    <img
                                        src={getImageUrl(achievement.image)}
                                        alt={achievement.title}
                                        className="w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-[3s]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                                </div>

                                <div className="prose prose-xl prose-invert max-w-none">
                                    <div className="flex gap-6 mb-12">
                                        <Quote className="w-16 h-16 text-primary/20 shrink-0" />
                                        <p className="text-2xl md:text-3xl font-light text-foreground leading-relaxed italic">
                                            {achievement.long_description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                                        <div className="p-8 rounded-[2.5rem] bg-foreground/[0.03] border border-border">
                                            <Award className="w-10 h-10 text-primary mb-6" />
                                            <h4 className="text-xl font-black mb-4 italic uppercase tracking-tighter">Makna Kemenangan</h4>
                                            <p className="text-muted-foreground font-light leading-relaxed">
                                                Prestasi ini bukan hanya sekadar medali atau piala, melainkan bukti nyata dari konsistensi siswa dalam mengasah kompetensi teknis dan soft-skill yang relevan dengan masa depan.
                                            </p>
                                        </div>
                                        <div className="p-8 rounded-[2.5rem] bg-foreground/[0.03] border border-border">
                                            <Sparkles className="w-10 h-10 text-primary mb-6" />
                                            <h4 className="text-xl font-black mb-4 italic uppercase tracking-tighter">Dukungan Sekolah</h4>
                                            <p className="text-muted-foreground font-light leading-relaxed">
                                                SMK Nusantara menyediakan fasilitas laboratorium mutakhir dan bimbingan mentor industri secara khusus untuk setiap siswa yang akan bertanding di kancah nasional maupun internasional.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Sidebar Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-4 space-y-10"
                            >
                                {/* Share Card */}
                                <div className="p-8 rounded-[2.5rem] bg-foreground text-white shadow-glow relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <h4 className="text-xl font-black mb-6 italic uppercase tracking-tighter relative z-10">Bagikan Prestasi</h4>
                                    <p className="text-white/40 text-sm mb-8 relative z-10">Beri tahu dunia tentang pencapaian luar biasa siswa-siswi SMK Nusantara.</p>
                                    <div className="flex gap-4 relative z-10">
                                        <Button variant="hero" size="icon" className="rounded-full w-14 h-14 shadow-none border-white/10">
                                            <Share2 className="w-5 h-5" />
                                        </Button>
                                        <Button variant="hero-outline" className="flex-1 rounded-full border-white/20 h-14 font-black uppercase tracking-widest text-[10px]">
                                            Download Sertifikat
                                        </Button>
                                    </div>
                                </div>

                                {/* Related Accomplishments */}
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8 ml-4">Prestasi Terkait</h4>
                                    <div className="grid gap-6">
                                        {relatedAchievements.map(rel => (
                                            <Link key={rel.id} to={`/prestasi/${rel.slug}`} className="group block">
                                                <div className="flex gap-5 items-center p-4 rounded-3xl bg-white dark:bg-foreground/5 border border-border group-hover:border-primary/50 transition-all">
                                                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                                        <img src={getImageUrl(rel.image)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={rel.title} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-black text-sm tracking-tight mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors italic">{rel.title}</h5>
                                                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{rel.winner}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Achievement Badge Trust */}
                                <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/10 text-center">
                                    <Trophy className="w-12 h-12 text-primary mx-auto mb-6 animate-bounce" />
                                    <h5 className="text-lg font-black italic mb-4 uppercase tracking-tighter">Center of Excellence</h5>
                                    <p className="text-sm text-muted-foreground font-light italic">"Memberikan apresiasi penuh kepada setiap individu yang berani berkompetisi."</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
};

export default PrestasiDetail;
