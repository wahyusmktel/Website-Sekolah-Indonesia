import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
    Users, UserCheck, ShieldCheck, Briefcase,
    GraduationCap, ChevronDown, Sparkles
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { strukturOrganisasi } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";

const StrukturOrganisasi = () => {
    const { kepalaSekolah, wakilKepalaSekolah, ketuaJurusan } = strukturOrganisasi;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <Helmet>
                <title>Struktur Organisasi - SMK Nusantara</title>
                <meta name="description" content="Struktur organisasi dan jajaran kepemimpinan SMK Nusantara yang berdedikasi tinggi." />
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
                                <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">Leadership Team</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight italic">
                                STRUKTUR <span className="text-primary text-stroke-white">ORGANISASI</span>
                            </h1>
                            <p className="text-white/40 text-xl font-light leading-relaxed mb-6 italic">
                                Sinergi kepemimpinan yang berfokus pada inovasi pendidikan dan pengembangan karakter siswa.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Hierarchy Section */}
                <section className="py-24 bg-background relative overflow-hidden">
                    <div className="container mx-auto px-4">

                        {/* 1. KEPALA SEKOLAH (THE TOP) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex justify-center mb-24 relative"
                        >
                            <div className="absolute top-full left-1/2 w-px h-24 bg-gradient-to-b from-primary to-transparent -translate-x-1/2 hidden lg:block" />
                            <div className="relative group max-w-sm w-full">
                                <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl group-hover:bg-primary/30 transition-all duration-700" />
                                <div className="relative p-10 rounded-[3rem] bg-white dark:bg-foreground/5 border-2 border-primary/50 backdrop-blur-xl text-center shadow-glow">
                                    <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden mx-auto mb-6 border-4 border-primary/20">
                                        <img src={kepalaSekolah.image} alt={kepalaSekolah.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <Badge className="mb-4 rounded-full bg-primary py-1 px-4 text-[10px] font-black uppercase tracking-widest">{kepalaSekolah.role}</Badge>
                                    <h3 className="text-2xl font-black text-foreground mb-4 tracking-tight italic">{kepalaSekolah.name}</h3>
                                    <p className="text-muted-foreground text-sm font-light italic leading-relaxed">
                                        "{kepalaSekolah.description}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. WAKIL KEPALA SEKOLAH (THE MIDDLE) */}
                        <div className="mb-32">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 text-primary mb-4">
                                    <ShieldCheck className="w-5 h-5" />
                                    <span className="text-xs font-black uppercase tracking-[0.3em]">Vice Principals</span>
                                </div>
                                <h2 className="text-3xl font-black italic tracking-tighter">Jajaran Wakil Kepala Sekolah</h2>
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            >
                                {wakilKepalaSekolah.map((waka, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        className="p-8 rounded-[2.5rem] bg-white dark:bg-foreground/5 border border-border hover:border-primary/50 transition-all duration-500 text-center group shadow-soft"
                                    >
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 mt-2">
                                            <img src={waka.image} alt={waka.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <Badge variant="outline" className="mb-4 rounded-full border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest">{waka.role}</Badge>
                                        <h4 className="text-lg font-black tracking-tight mb-2 italic">{waka.name}</h4>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* 3. KETUA JURUSAN (THE DEPT HEADS) */}
                        <div>
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-2 text-primary mb-4">
                                    <Briefcase className="w-5 h-5" />
                                    <span className="text-xs font-black uppercase tracking-[0.3em]">Department Heads</span>
                                </div>
                                <h2 className="text-3xl font-black italic tracking-tighter">Ketua Program Keahlian</h2>
                            </div>

                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            >
                                {ketuaJurusan.map((kajur, i) => (
                                    <motion.div
                                        key={i}
                                        variants={itemVariants}
                                        className="group p-8 rounded-[2.5rem] bg-foreground/5 dark:bg-white/5 border border-border hover:bg-foreground transition-all duration-500"
                                    >
                                        <div className="flex items-center gap-6 mb-6">
                                            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-transparent group-hover:border-primary transition-colors">
                                                <img src={kajur.image} alt={kajur.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                                            </div>
                                            <div className="text-left">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary block mb-1">{kajur.role}</span>
                                                <h4 className="font-bold text-foreground group-hover:text-white transition-colors leading-tight italic">{kajur.name}</h4>
                                            </div>
                                        </div>
                                        <div className="pt-6 border-t border-border/10 flex items-center justify-between">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-white/40">Expertise Verified</span>
                                            <GraduationCap className="w-4 h-4 text-primary opacity-20 group-hover:opacity-100" />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
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
                                    <h2 className="text-4xl font-black text-white italic tracking-tighter leading-none mb-8">
                                        Komitmen <br /> <span className="text-primary tracking-widest uppercase text-base not-italic font-black">Management System</span>
                                    </h2>
                                    <p className="text-white/40 text-lg font-light leading-relaxed italic mb-8">
                                        "Kepemimpinan di SMK Nusantara berlandaskan pada transparansi dan orientasi hasil, memastikan setiap instruksi kurikulum tersampaikan dengan presisi tinggi ke setiap ruang kelas."
                                    </p>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        "Integrasi Kurikulum Industri 100%",
                                        "Sistem Monitoring Pembelajaran Real-time",
                                        "Pengembangan Talent Guru & Staff Berkelanjutan",
                                        "Standarisasi Manajemen Mutu ISO 9001:2015"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-white/80">
                                            <div className="w-2 h-2 rounded-full bg-primary" />
                                            <span className="text-sm font-bold tracking-tight uppercase tracking-[0.1em]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
};

export default StrukturOrganisasi;
