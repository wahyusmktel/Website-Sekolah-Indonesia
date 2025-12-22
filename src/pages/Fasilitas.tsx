import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
    Monitor, Cpu, Layers, BookOpen,
    Activity, Coffee, CheckCircle2,
    Sparkles, ArrowRight, Building2
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getImageUrl } from "@/lib/image-utils";

interface Facility {
    id: number;
    title: string;
    description: string;
    features: string[];
    image: string;
    icon: string;
}

const iconMap: Record<string, any> = {
    Monitor, Cpu, Layers, BookOpen, Activity, Coffee
};

const Fasilitas = () => {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/fasilitas");
                setFacilities(response.data);
            } catch (error) {
                console.error("Error fetching facilities:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFacilities();
    }, []);

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
                <title>Fasilitas Sekolah - SMK Nusantara</title>
                <meta name="description" content="Eksplorasi fasilitas modern berstandar industri di SMK Nusantara yang mendukung ekosistem belajar digital." />
            </Helmet>
            <PublicLayout>
                {/* Futurist Hero Section */}
                <section className="relative pt-32 pb-24 overflow-hidden bg-foreground">
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
                                <Building2 className="w-4 h-4 text-primary" />
                                <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">World-Class Infrastructure</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight italic">
                                MODERN <span className="text-primary text-stroke-white">FACILITIES</span>
                            </h1>
                            <p className="text-white/40 text-xl font-light leading-relaxed mb-12 italic">
                                Ekosistem fisik yang dirancang secara presisi untuk menunjang kreativitas dan akselerasi teknologi siswa.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Facilities Showcase - Alternating Layout */}
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="space-y-40">
                            {facilities.map((facility, index) => {
                                const Icon = iconMap[facility.icon] || Monitor;
                                const isEven = index % 2 === 0;

                                return (
                                    <motion.div
                                        key={facility.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8 }}
                                        className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center`}
                                    >
                                        {/* Image Side */}
                                        <div className="relative flex-1 group">
                                            <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-2xl group-hover:bg-primary/20 transition-all duration-700 -z-10" />
                                            <div className="rounded-[3rem] overflow-hidden border border-border shadow-elevated aspect-[4/3] relative">
                                                <img
                                                    src={getImageUrl(facility.image)}
                                                    alt={facility.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
                                                <div className="absolute bottom-8 left-8">
                                                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center text-white">
                                                        <Icon className="w-8 h-8" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Decorative Label */}
                                            <div className={`absolute -bottom-6 ${isEven ? '-right-6' : '-left-6'} bg-primary py-4 px-8 rounded-2xl shadow-glow hidden md:block`}>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-white">Verified Facility</span>
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div className="flex-1 space-y-8">
                                            <Badge variant="outline" className="rounded-full border-primary/20 text-primary px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
                                                Facility 0{index + 1}
                                            </Badge>
                                            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter italic">
                                                {facility.title}
                                            </h2>
                                            <p className="text-muted-foreground text-lg font-light leading-relaxed italic border-l-4 border-primary pl-6">
                                                {facility.description}
                                            </p>

                                            <div className="grid grid-cols-2 gap-4">
                                                {(() => {
                                                    const features = Array.isArray(facility.features)
                                                        ? facility.features
                                                        : (typeof facility.features === 'string' ? JSON.parse(facility.features || '[]') : []);

                                                    return features.map((feature: string, i: number) => (
                                                        <div key={i} className="flex items-center gap-3 group/feat">
                                                            <CheckCircle2 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                                            <span className="text-sm font-bold tracking-tight text-foreground/80">{feature}</span>
                                                        </div>
                                                    ));
                                                })()}
                                            </div>

                                            <div className="pt-8">
                                                <Button variant="hero-outline" className="rounded-full px-10 h-16 group/btn" asChild>
                                                    <Link to="/ppdb">
                                                        Bergabung Sekarang
                                                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Global Standard Promo */}
                <section className="py-24 bg-foreground relative overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto rounded-[4rem] bg-white/5 border border-white/10 p-16 lg:p-24 relative text-center lg:text-left">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <Sparkles className="w-16 h-16 text-primary mb-8 animate-pulse mx-auto lg:mx-0" />
                                    <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none mb-8">
                                        KOMITMEN <span className="text-primary">KUALITAS</span> FISIK
                                    </h2>
                                    <p className="text-white/40 text-xl font-light leading-relaxed italic mb-10">
                                        "Setiap sudut sekolah adalah ruang belajar. Kami tidak berkompromi dalam menyediakan infrastruktur kelas dunia untuk mendukung akselerasi digital putra-putri Anda."
                                    </p>
                                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                        <Badge className="bg-white/10 text-white border-none py-2 px-6 rounded-full font-black text-[10px] uppercase tracking-widest">ISO 9001 Certified</Badge>
                                        <Badge className="bg-white/10 text-white border-none py-2 px-6 rounded-full font-black text-[10px] uppercase tracking-widest">Eco-Friendly Campus</Badge>
                                        <Badge className="bg-white/10 text-white border-none py-2 px-6 rounded-full font-black text-[10px] uppercase tracking-widest">Digital First</Badge>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10">
                                        <img
                                            src="https://images.unsplash.com/photo-1541339907198-e08756dee9b8?auto=format&fit=crop&q=80&w=800"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5s]"
                                            alt="Facility highlight"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
};

export default Fasilitas;
