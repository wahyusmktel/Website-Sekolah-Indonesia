import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
    Building2, Award, Briefcase, Target,
    ChevronRight, Globe2, Handshake,
    ArrowUpRight, Users2, Rocket
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import { getImageUrl } from "@/lib/image-utils";

interface IndustryData {
    partners: any[];
    programs: any[];
    stats: any[];
}

const iconMap: Record<string, any> = {
    Building2, Award, Briefcase, Target
};

const HubunganIndustri = () => {
    const [data, setData] = useState<IndustryData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get("/hubungan-industri");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching hubungan industri data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-foreground">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }
    return (
        <>
            <Helmet>
                <title>Hubungan Industri - SMK Nusantara</title>
                <meta name="description" content="Jejaring korporasi dan kemitraan strategis SMK Nusantara dengan industri global dan nasional." />
            </Helmet>
            <PublicLayout>
                {/* Industry Hero Section */}
                <section className="relative pt-32 pb-60 overflow-hidden bg-foreground">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/20 via-foreground to-foreground" />
                        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl mx-auto"
                        >
                            <Badge variant="outline" className="mb-6 rounded-full border-white/10 bg-white/5 text-primary px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
                                Bridging Education and Industry
                            </Badge>
                            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] italic">
                                STRATEGIC <span className="text-primary italic">PARTNERSHIP</span>
                            </h1>
                            <p className="text-white/40 text-xl md:text-2xl font-light italic leading-relaxed mb-12 max-w-2xl mx-auto">
                                Membangun sinergi berkelanjutan antara kurikulum pendidikan dan kebutuhan riil industri masa depan.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4">
                                <Button className="rounded-full px-10 h-16 text-lg font-bold group shadow-glow" size="lg">
                                    Menjadi Mitra
                                    <Handshake className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                                </Button>
                                <Button variant="outline" className="rounded-full px-10 h-16 text-lg font-bold border-white/20 text-white hover:bg-white/10" size="lg">
                                    Career Portal
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Floaters Decoration */}
                    <div className="absolute bottom-20 left-0 w-full overflow-hidden whitespace-nowrap opacity-20 pointer-events-none select-none">
                        <div className="inline-block animate-marquee text-[15rem] font-black text-white italic leading-none opacity-5 tracking-tighter">
                            LINK AND MATCH &nbsp; GLOBAL TALENT &nbsp; CAREER GROWTH &nbsp; INDUSTRY 4.0 &nbsp;
                        </div>
                    </div>
                </section>

                {/* Stats Section - Floating Over Hero */}
                <section className="relative z-20 -mt-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {data.stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white dark:bg-foreground p-8 rounded-[2.5rem] border border-border shadow-elevated text-center group hover:border-primary/50 transition-colors"
                                >
                                    <h3 className="text-5xl font-black text-primary mb-2 tracking-tighter italic">
                                        {stat.value}
                                    </h3>
                                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Partnership Programs */}
                <section className="py-32 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="lg:w-1/2 space-y-8">
                                <h2 className="text-4xl md:text-6xl font-black text-foreground italic tracking-tighter leading-none">
                                    PROGRAM <br /> <span className="text-primary italic"> UNGGULAN </span>
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed italic border-l-4 border-primary pl-6">
                                    Kami menciptakan ekosistem belajar yang tidak hanya bersifat teoritis, namun berorientasi penuh pada serapan kerja dan standar operasional perusahaan global.
                                </p>
                                <div className="pt-8">
                                    <Button variant="ghost" className="p-0 hover:bg-transparent group">
                                        <span className="text-foreground font-black text-xs uppercase tracking-widest border-b-2 border-primary pb-1 group-hover:pr-4 transition-all">Lihat Detail Program</span>
                                        <ChevronRight className="w-4 h-4 text-primary" />
                                    </Button>
                                </div>
                            </div>

                            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {data.programs.map((program, i) => {
                                    const Icon = iconMap[program.icon] || Rocket;
                                    return (
                                        <motion.div
                                            key={program.id}
                                            whileHover={{ y: -10 }}
                                            className="p-8 rounded-[3rem] bg-muted/30 border border-border group hover:bg-primary/5 transition-all"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-foreground shadow-elevated flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all">
                                                <Icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <h4 className="text-xl font-black mb-3 italic tracking-tight">{program.title}</h4>
                                            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 italic">
                                                {program.description}
                                            </p>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[10px] font-black uppercase text-primary">Explore Center</span>
                                                <ArrowUpRight className="w-3 h-3 text-primary" />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Partners Gallery */}
                <section className="py-24 bg-foreground overflow-hidden">
                    <div className="container mx-auto px-4 mb-16 text-center">
                        <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter mb-4">
                            TRUSTED BY <span className="text-primary">INDUSTRY GIANTS</span>
                        </h2>
                        <p className="text-white/40 text-lg font-light italic">Lebih dari 100+ perusahaan telah menandatangani MoU kemitraan strategis.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 lg:gap-12 px-4 max-w-6xl mx-auto">
                        {data.partners.map((partner, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, filter: "grayscale(0%)" }}
                                className="w-32 h-32 md:w-40 md:h-40 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center grayscale opacity-50 hover:opacity-100 hover:bg-white/10 transition-all cursor-crosshair"
                            >
                                <img
                                    src={getImageUrl(partner.logo)}
                                    alt={partner.name}
                                    className="w-full h-auto max-h-[60%] object-contain"
                                />
                                <span className="mt-4 text-[8px] font-black uppercase tracking-widest text-white/40 text-center">
                                    {partner.category}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Global Internship Map / Call to Action */}
                <section className="py-32 relative overflow-hidden bg-background">
                    <div className="absolute top-0 right-0 p-40 bg-primary/5 rounded-full blur-[100px] -z-10" />
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto bg-primary text-white rounded-[4rem] p-12 lg:p-24 relative overflow-hidden shadow-glow">
                            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                                <div className="flex-1 space-y-8">
                                    <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
                                        <Globe2 className="w-8 h-8 text-white animate-spin-slow" />
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter leading-none">
                                        SIAP UNTUK <br /> <span className="text-black/30">DIBUTUHKAN</span> DUNIA
                                    </h2>
                                    <p className="text-white/80 text-lg md:text-xl font-light italic">
                                        "Kami mencetak bukan sekedar operator, melainkan innovator yang siap bersaing dalam ekosistem digital global."
                                    </p>
                                </div>

                                <div className="flex-none flex flex-col gap-4">
                                    <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20">
                                        <div className="flex items-center gap-4 mb-2">
                                            <Users2 className="w-5 h-5" />
                                            <span className="text-[10px] font-black uppercase tracking-widest italic leading-none">Alumni Network</span>
                                        </div>
                                        <p className="text-3xl font-black">5000+</p>
                                    </div>
                                    <Button variant="outline" className="bg-white text-primary border-none rounded-full h-16 font-black text-lg hover:bg-white/90">
                                        Hubungi Humas
                                    </Button>
                                </div>
                            </div>

                            {/* Decorative Circle */}
                            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-white opacity-5 rounded-full" />
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
};

export default HubunganIndustri;
