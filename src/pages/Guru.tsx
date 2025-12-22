import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
    GraduationCap, Award, BookOpen, Star,
    Instagram, Linkedin, Search, Sparkles,
    CheckCircle2, Globe, Cpu, Users
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { getImageUrl } from "@/lib/image-utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Guru {
    id: number;
    name: string;
    subject: string;
    image: string;
    bio?: string;
    education?: string;
    experience?: string;
    instagram_url?: string;
    linkedin_url?: string;
    is_pioneer: boolean;
}

const TeacherCard = ({ teacher }: { teacher: Guru }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative"
    >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-white dark:bg-foreground border border-primary/10 rounded-[2.5rem] overflow-hidden shadow-soft transition-all duration-500 group-hover:-translate-y-2">
            {/* Image Section */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={getImageUrl(teacher.image)}
                    alt={teacher.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <div className="flex gap-4">
                        {teacher.instagram_url && (
                            <a href={teacher.instagram_url} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary transition-colors text-white">
                                <Instagram className="w-5 h-5" />
                            </a>
                        )}
                        {teacher.linkedin_url && (
                            <a href={teacher.linkedin_url} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary transition-colors text-white">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>
                {teacher.is_pioneer && (
                    <div className="absolute top-6 right-6">
                        <Badge className="bg-primary text-white border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px] shadow-glow flex gap-2">
                            <Star className="w-3 h-3 fill-current" /> PIONEER
                        </Badge>
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="p-8">
                <div className="mb-4">
                    <Badge variant="outline" className="border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                        {teacher.subject}
                    </Badge>
                    <h3 className="text-xl font-black text-foreground italic group-hover:text-primary transition-colors leading-tight">
                        {teacher.name}
                    </h3>
                </div>

                <div className="space-y-3 mb-6">
                    {teacher.education && (
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                <GraduationCap className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-xs font-bold italic">{teacher.education}</span>
                        </div>
                    )}
                    {teacher.experience && (
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-xs font-bold italic">{teacher.experience} Pengalaman</span>
                        </div>
                    )}
                </div>

                <p className="text-muted-foreground text-xs leading-relaxed italic line-clamp-2">
                    {teacher.bio}
                </p>
            </div>
        </div>
    </motion.div>
);

const Guru = () => {
    const [teachers, setTeachers] = useState<Guru[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchGuru = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/guru");
                setTeachers(response.data);
            } catch (error) {
                console.error("Error fetching guru:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGuru();
    }, []);

    const filteredTeachers = teachers.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Helmet>
                <title>Tenaga Pendidik Profesional - SMK Nusantara</title>
                <meta name="description" content="Kenali jajaran guru profesional dan kompeten SMK Nusantara yang siap membimbing siswa." />
            </Helmet>
            <PublicLayout>
                {/* Hero Section */}
                <section className="relative pt-40 pb-24 overflow-hidden bg-foreground">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05]" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
                            >
                                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                                <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Qualified Educators</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none italic uppercase"
                            >
                                GURU <span className="text-primary text-stroke-white">PROFESIONAL</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-white/40 text-xl md:text-2xl font-light leading-relaxed italic"
                            >
                                Didukung oleh tenaga pendidik ahli bersertifikasi industri yang berdedikasi tinggi dalam mencetak generasi digital masa depan.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Filter & Stats Section */}
                <section className="py-12 bg-background border-y border-border relative z-20">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-8 text-foreground">
                                <div className="text-center">
                                    <div className="text-3xl font-black italic">{teachers.length}+</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-primary">Tenaga Ahli</div>
                                </div>
                                <div className="h-10 w-px bg-border hidden md:block" />
                                <div className="text-center">
                                    <div className="text-3xl font-black italic">100%</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-primary">Sertifikasi Industri</div>
                                </div>
                            </div>

                            <div className="relative w-full max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    placeholder="Cari nama guru atau mata pelajaran..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-12 h-14 rounded-2xl bg-muted/30 border-none shadow-soft text-sm font-bold placeholder:italic"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Teachers Grid */}
                <section className="py-24 bg-background relative overflow-hidden">
                    <div className="container mx-auto px-4">
                        {loading ? (
                            <div className="flex items-center justify-center min-h-[400px]">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                                {filteredTeachers.map((teacher) => (
                                    <TeacherCard key={teacher.id} teacher={teacher} />
                                ))}
                            </div>
                        )}

                        {/* CTA Section at bottom */}
                        <div className="mt-40 relative">
                            {/* Decorative Background for CTA area */}
                            <div className="absolute inset-0 pointer-events-none -z-10">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-20 -right-20 w-80 h-80 border-2 border-primary/10 rounded-[3rem] opacity-50"
                                />
                                <motion.div
                                    animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
                                    transition={{ duration: 12, repeat: Infinity }}
                                    className="absolute bottom-0 -left-20 w-64 h-64 border border-primary/20 rounded-full opacity-30"
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-16 lg:p-24 rounded-[5rem] bg-foreground text-center relative overflow-hidden shadow-soft"
                            >
                                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/50 blur-[150px] rounded-full" />
                                </div>
                                <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] bg-center pointer-events-none" />

                                <div className="relative z-10 max-w-3xl mx-auto">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
                                    >
                                        <Sparkles className="w-4 h-4 text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Management Team</span>
                                    </motion.div>

                                    <h2 className="text-5xl md:text-7xl font-black text-white italic mb-10 uppercase leading-[0.9] tracking-tighter">
                                        Lihat <span className="text-primary text-stroke-white">Struktur Sekolah?</span>
                                    </h2>
                                    <p className="text-white/40 text-lg md:text-xl mb-12 italic font-light leading-relaxed max-w-2xl mx-auto">
                                        "Pelajari bagaimana jajaran pimpinan dan manajemen kami berkolaborasi untuk menciptakan standar pendidikan terbaik."
                                    </p>
                                    <Button asChild size="lg" className="rounded-2xl bg-primary hover:bg-primary-dark font-black tracking-widest px-12 py-8 h-auto shadow-glow transition-all hover:scale-105 active:scale-95">
                                        <Link to="/tentang-kami/struktur-organisasi" className="flex gap-4 items-center uppercase tracking-widest">
                                            <Users className="w-6 h-6" />
                                            STRUKTUR ORGANISASI
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Expertise Categories */}
                <section className="py-24 bg-muted/20 relative overflow-hidden">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: "IT Specialist", icon: Cpu, desc: "Ekspertise dalam programming, jaringan, dan keamanan siber." },
                                { title: "Creative Industry", icon: BookOpen, desc: "Ahli desain komunikasi visual, multimedia, dan animasi." },
                                { title: "Global Skills", icon: Globe, desc: "Pendidik yang fokus pada kemampuan bahasa dan soft skills internasional." }
                            ].map((cat, i) => (
                                <div key={i} className="p-10 rounded-[3rem] bg-white dark:bg-foreground/5 border border-border hover:border-primary/50 transition-all duration-500">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                                        <cat.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-black italic mb-4">{cat.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed italic">{cat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
};

export default Guru;
