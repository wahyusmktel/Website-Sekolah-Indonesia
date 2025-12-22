import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
    Users, ShieldCheck, Briefcase, GraduationCap, Sparkles,
    ArrowRight, GitCommit, Settings, Database, Server
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import apiClient from "@/lib/api-client";
import { getImageUrl } from "@/lib/image-utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/use-site-settings";

interface Member {
    id: number;
    name: string;
    role: string;
    image: string;
    type: string;
    description?: string;
    parent_id?: number | null;
    connection_type?: 'subordinate' | 'coordination';
}

const MemberCard = ({ member, size = "md", dark = false }: { member: Member, size?: "sm" | "md" | "lg", dark?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`relative group ${size === 'lg' ? 'max-w-sm' : size === 'md' ? 'max-w-[280px]' : 'max-w-[220px]'} w-full`}
    >
        <div className={`relative p-6 rounded-[2rem] ${dark ? 'bg-foreground border-white/10' : 'bg-white border-primary/20'} border-2 backdrop-blur-xl text-center shadow-lg transition-all duration-500 hover:shadow-primary/20`}>
            <div className={`${size === 'lg' ? 'w-24 h-24' : 'w-16 h-16'} rounded-2xl overflow-hidden mx-auto mb-4 border-2 ${dark ? 'border-primary/50' : 'border-primary/20'}`}>
                <img src={getImageUrl(member.image)} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <Badge className={`mb-2 rounded-full ${dark ? 'bg-primary' : 'bg-primary/10 text-primary'} border-none py-0.5 px-3 text-[8px] font-black uppercase tracking-widest`}>
                {member.role}
            </Badge>
            <h3 className={`font-bold ${size === 'lg' ? 'text-lg' : 'text-sm'} ${dark ? 'text-white' : 'text-foreground'} leading-tight italic`}>
                {member.name}
            </h3>
            {member.description && size === 'lg' && (
                <p className="mt-3 text-white/40 text-[10px] italic leading-relaxed">"{member.description}"</p>
            )}
        </div>
    </motion.div>
);

const StrukturOrganisasi = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: settings } = useSiteSettings();
    const schoolName = settings?.school_name || "SMK Nusantara";

    useEffect(() => {
        const fetchStruktur = async () => {
            try {
                const response = await apiClient.get("/struktur");
                setMembers(response.data);
            } catch (error) {
                console.error("Error fetching struktur:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStruktur();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-foreground">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
            </div>
        );
    }

    // Helper to get children
    const getChildren = (parentId: number) => members.filter(m => m.parent_id === parentId && m.connection_type !== 'coordination');
    const getCoordinations = (parentId: number) => members.filter(m => m.parent_id === parentId && m.connection_type === 'coordination');

    const kepsek = members.find(m => m.type === 'kepala_sekolah');
    const komite = getCoordinations(kepsek?.id || 0).find(m => m.type === 'komite_sekolah');
    const quality = getCoordinations(kepsek?.id || 0).find(m => m.role.includes('Quality'));
    const kaAdmin = getChildren(kepsek?.id || 0).find(m => m.type === 'kepala_administrasi');
    const wakas = members.filter(m => m.type === 'wakil_kepala_sekolah');

    return (
        <>
            <Helmet>
                <title>Struktur Organisasi - {schoolName}</title>
                <meta name="description" content={`Struktur organisasi dan jajaran kepemimpinan ${schoolName} yang berdedikasi tinggi.`} />
            </Helmet>
            <PublicLayout>
                {/* Modern Hero Section */}
                <section className="relative pt-32 pb-20 overflow-hidden bg-foreground">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] translate-x-1/4 translate-y-1/4" />
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
                                <Users className="w-4 h-4 text-primary" />
                                <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">Leadership Tree</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight italic">
                                STRUKTUR <span className="text-primary text-stroke-white">ORGANISASI</span>
                            </h1>
                            <p className="text-white/40 text-xl font-light leading-relaxed italic">
                                Sinergi kepemimpinan yang berfokus pada inovasi pendidikan dan pengembangan karakter siswa.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* complex Tree Section */}
                <section className="py-24 bg-background relative overflow-hidden">
                    <div className="container mx-auto px-4">

                        {/* 1. TOP TIER (Komite - kepsek - KaAdmin) */}
                        <div className="flex flex-col items-center mb-32">
                            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 relative">
                                {/* Coordination Lines (Desktop) */}
                                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block -translate-y-1/2" />

                                {komite && (
                                    <div className="relative z-10">
                                        <MemberCard member={komite} dark />
                                        <div className="text-[10px] font-black uppercase tracking-widest text-primary mt-4 flex items-center justify-center gap-2">
                                            <GitCommit className="w-3 h-3" /> Garis Koordinasi
                                        </div>
                                    </div>
                                )}

                                {kepsek && (
                                    <div className="relative z-10">
                                        <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
                                        <MemberCard member={kepsek} size="lg" />
                                        <div className="mt-8 flex justify-center">
                                            <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
                                        </div>
                                    </div>
                                )}

                                {kaAdmin && (
                                    <div className="relative z-10">
                                        <MemberCard member={kaAdmin} dark />
                                        <div className="text-[10px] font-black uppercase tracking-widest text-primary mt-4 flex items-center justify-center gap-2">
                                            <ArrowRight className="w-3 h-3" /> Garis Instruksi
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Under Ka Admin */}
                            {kaAdmin && (
                                <div className="mt-12 flex flex-wrap justify-center gap-6">
                                    {getChildren(kaAdmin.id).map(kaur => (
                                        <div key={kaur.id} className="relative pt-12">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-border" />
                                            <MemberCard member={kaur} size="sm" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quality Development (Single below/aside) */}
                            {quality && (
                                <div className="mt-16 flex flex-col items-center">
                                    <div className="w-px h-12 bg-primary/20" />
                                    <MemberCard member={quality} size="sm" dark />
                                </div>
                            )}
                        </div>

                        {/* 2. WAKA TIER */}
                        <div className="space-y-32">
                            {wakas.map((waka) => (
                                <div key={waka.id} className="flex flex-col items-center">
                                    <div className="text-center mb-12">
                                        <MemberCard member={waka} size="md" />
                                        <div className="mt-8 flex justify-center">
                                            <div className="w-px h-12 bg-primary/30" />
                                        </div>
                                    </div>

                                    {/* Sub-roles under Waka */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                                        {/* Connecting Line (Desktop) */}
                                        <div className="absolute top-0 left-4 right-4 h-px bg-border hidden lg:block" />

                                        {getChildren(waka.id).map(sub => (
                                            <div key={sub.id} className="relative pt-8 flex flex-col items-center">
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-border hidden lg:block" />
                                                <MemberCard member={sub} size="sm" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Values Section */}
                <section className="py-24 bg-foreground relative overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto rounded-[4rem] bg-white/5 backdrop-blur-2xl border border-white/10 p-12 lg:p-20 relative">
                            <div className="absolute top-0 right-0 p-12 opacity-10">
                                <Sparkles className="w-40 h-40 text-primary" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h2 className="text-3xl font-black text-white italic tracking-tighter leading-none mb-8 uppercase">
                                        Core <br /> <span className="text-primary tracking-widest uppercase text-base not-italic font-black">Management System</span>
                                    </h2>
                                    <p className="text-white/40 text-lg font-light leading-relaxed italic mb-8">
                                        "Setiap struktur memiliki tanggung jawab yang terintegrasi, memastikan operasional sekolah berjalan sesuai standar keunggulan {schoolName}."
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        "Sinergi Antar Departemen",
                                        "Transparansi Alur Koordinasi",
                                        "Akuntabilitas Kinerja Staf",
                                        "Fokus Pengembangan Prestasi"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-white/80">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="text-xs font-black uppercase tracking-[0.2em]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* CTA Section to Guru */}
                <section className="pt-32 pb-40 bg-background relative overflow-hidden">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.2, 1]
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-primary/10 rounded-full"
                        />
                        <motion.div
                            animate={{
                                y: [0, 50, 0],
                                rotate: [0, -45, 0]
                            }}
                            transition={{ duration: 15, repeat: Infinity }}
                            className="absolute top-1/2 -right-24 w-64 h-64 border-2 border-primary/20 rotate-45"
                        />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-16 lg:p-24 rounded-[5rem] bg-foreground text-center relative overflow-hidden shadow-soft"
                        >
                            {/* Inner Geometric Shapes */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                <motion.div
                                    animate={{
                                        x: [-20, 20, -20],
                                        y: [-20, 20, -20]
                                    }}
                                    transition={{ duration: 10, repeat: Infinity }}
                                    className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"
                                />
                                <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] bg-center group-hover:opacity-[0.05] transition-opacity" />

                                {/* Floating Geometric Particles */}
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -30, 0],
                                            opacity: [0.1, 0.3, 0.1],
                                            rotate: [0, 180, 360]
                                        }}
                                        transition={{
                                            duration: 5 + i * 2,
                                            repeat: Infinity,
                                            delay: i
                                        }}
                                        className="absolute hidden lg:block"
                                        style={{
                                            top: `${20 + i * 30}%`,
                                            left: `${10 + i * 40}%`,
                                            width: '40px',
                                            height: '40px',
                                            border: '2px solid rgba(var(--primary), 0.2)',
                                            borderRadius: i % 2 === 0 ? '50%' : '8px'
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="relative z-10 max-w-3xl mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
                                >
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Professional Team</span>
                                </motion.div>

                                <h2 className="text-5xl md:text-7xl font-black text-white italic mb-8 uppercase leading-[0.9] tracking-tighter">
                                    Kenali <span className="text-primary text-stroke-white transition-all duration-500 hover:text-white">Tenaga Pendidik?</span>
                                </h2>
                                <p className="text-white/40 text-lg md:text-xl mb-12 italic font-light leading-relaxed max-w-2xl mx-auto">
                                    "Dibalik manajemen yang kuat, terdapat jajaran guru profesional yang siap membimbing langkah Anda menuju masa depan cemerlang."
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Button asChild size="lg" className="rounded-2xl bg-primary hover:bg-primary-dark font-black tracking-widest px-12 py-8 h-auto shadow-glow transition-all hover:scale-105 active:scale-95">
                                        <Link to="/tentang-kami/guru" className="flex gap-4 items-center uppercase tracking-widest">
                                            <GraduationCap className="w-6 h-6" />
                                            LIHAT DAFTAR GURU
                                        </Link>
                                    </Button>
                                    <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-foreground bg-muted/20" />
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">50+ Expert Teachers</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
};

export default StrukturOrganisasi;
