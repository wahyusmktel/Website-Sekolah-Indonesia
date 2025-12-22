import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ShieldCheck, Calendar, ArrowLeft, Lock, Eye, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/api-client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Helmet } from "react-helmet-async";
import { useSiteSettings } from "@/hooks/use-site-settings";

const PrivacyPolicy = () => {
    const { data: settings } = useSiteSettings();
    const schoolName = settings?.school_name || "SMK Nusantara";

    const { data: policy, isLoading } = useQuery({
        queryKey: ['privacy-policy'],
        queryFn: async () => {
            const response = await apiClient.get('/privacy-policy');
            return response.data;
        }
    });

    const baseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL?.replace('/api', '');
    const schoolLogo = settings?.school_logo ? `${baseUrl}${settings.school_logo}` : null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <PublicLayout>
            <Helmet>
                <title>Kebijakan Privasi | {schoolName}</title>
                <meta name="description" content={`Kebijakan privasi resmi ${schoolName}. Kami berkomitmen melindungi data pribadi Anda.`} />
            </Helmet>

            {/* Dark Theme Background Wrapper */}
            <div className="pt-40 pb-24 min-h-screen bg-foreground relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"
                    />
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05]" />
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 0.05, x: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute bottom-0 left-0 w-96 h-96 bg-primary rotate-45 rounded-[4rem] translate-y-1/2 -translate-x-1/2"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl mx-auto"
                    >
                        {/* Header */}
                        <motion.div variants={itemVariants} className="text-center mb-16">
                            <Link to="/">
                                <Button variant="ghost" className="mb-8 rounded-2xl hover:bg-white/5 text-white/60 hover:text-white gap-2 transition-all">
                                    <ArrowLeft size={18} /> Kembali ke Beranda
                                </Button>
                            </Link>
                            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-glow backdrop-blur-md">
                                <ShieldCheck size={14} /> Legal Documentation
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter leading-none mb-6">
                                KEBIJAKAN <span className="text-primary not-italic">PRIVASI</span>
                            </h1>
                            {policy?.last_updated && (
                                <div className="flex items-center justify-center gap-3 text-white/40 text-sm font-medium italic">
                                    <Calendar size={16} className="text-primary" />
                                    Terakhir diperbarui: {format(new Date(policy.last_updated), 'dd MMMM yyyy', { locale: id })}
                                </div>
                            )}
                        </motion.div>

                        {/* Quick Stats/Info */}
                        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {[
                                { icon: Lock, title: "Data Aman", desc: "Enkripsi standar industri" },
                                { icon: Eye, title: "Transparan", desc: "Penggunaan data yang jelas" },
                                { icon: FileText, title: "Kepatuhan", desc: "Sesuai regulasi pendidikan" }
                            ].map((stat, i) => (
                                <div key={i} className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col items-center text-center group hover:bg-primary transition-all duration-500 backdrop-blur-sm">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-primary transition-all duration-500 shadow-lg">
                                        <stat.icon size={28} />
                                    </div>
                                    <h4 className="font-black text-sm uppercase tracking-widest mb-1 text-white group-hover:text-white transition-colors">{stat.title}</h4>
                                    <p className="text-xs text-white/40 group-hover:text-white/70 transition-colors">{stat.desc}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Content Card */}
                        <motion.div variants={itemVariants}>
                            <div className="bg-white rounded-[4rem] p-10 md:p-20 shadow-2xl relative overflow-hidden text-slate-800">
                                {/* Subtle Decorative Pattern for the white card */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                                {isLoading ? (
                                    <div className="space-y-8 animate-pulse">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="space-y-4">
                                                <div className="h-10 bg-slate-100 rounded-xl w-1/3" />
                                                <div className="h-4 bg-slate-100 rounded-xl w-full" />
                                                <div className="h-4 bg-slate-100 rounded-xl w-5/6" />
                                                <div className="h-4 bg-slate-100 rounded-xl w-4/6" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div
                                        className="prose prose-lg prose-slate max-w-none 
                      prose-headings:font-black prose-headings:italic prose-headings:tracking-tight 
                      prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:text-slate-900 prose-h2:uppercase prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-6
                      prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
                      prose-ul:text-slate-600 prose-li:mb-3
                      prose-strong:text-slate-900 prose-blockquote:border-primary prose-blockquote:bg-slate-50 prose-blockquote:p-6 prose-blockquote:rounded-2xl"
                                        dangerouslySetInnerHTML={{ __html: policy?.content || '' }}
                                    />
                                )}

                                {/* Bottom Graphic */}
                                <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-between flex-wrap gap-6">
                                    <div className="flex items-center gap-2">
                                        {schoolLogo ? (
                                            <img src={schoolLogo} alt={schoolName} className="h-8 opacity-20 filter grayscale" />
                                        ) : (
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-300">
                                                {schoolName.charAt(0)}
                                            </div>
                                        )}
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic">Legal Identity</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <Sparkles size={12} className="text-primary" /> Verified Compliance 2024
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Footer Note */}
                        <motion.div variants={itemVariants} className="mt-16 text-center">
                            <p className="text-white/40 text-sm italic font-medium">
                                Punya pertanyaan mengenai data Anda? <Link to="/kontak" className="text-primary font-bold hover:text-primary-light transition-colors underline underline-offset-4">Hubungi Tim IT {schoolName}</Link>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default PrivacyPolicy;
