import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, Eye, ArrowLeft, Share2, Facebook, Twitter, Instagram, Sparkles, ChevronRight, MessageCircle } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { beritaList } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import NotFound from "./NotFound";

export default function BeritaDetail() {
    const { slug } = useParams();
    const berita = beritaList.find((b) => b.slug === slug);

    if (!berita) {
        return <NotFound />;
    }

    const relatedNews = beritaList.filter((b) => b.id !== berita.id).slice(0, 3);

    return (
        <>
            <Helmet>
                <title>{berita.title} - SMK Nusantara</title>
                <meta name="description" content={berita.excerpt} />
            </Helmet>
            <PublicLayout>
                {/* Article Hero */}
                <section className="relative pt-40 pb-20 overflow-hidden bg-foreground">
                    <div className="absolute inset-0 opacity-40">
                        <img
                            src={berita.image === "/placeholder.svg" ? `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1600` : berita.image}
                            alt={berita.title}
                            className="w-full h-full object-cover blur-sm scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <Link to="/berita" className="inline-flex items-center gap-2 text-primary-light text-xs font-black uppercase tracking-[0.2em] mb-8 hover:gap-4 transition-all">
                                <ArrowLeft className="w-4 h-4" /> Kembali ke Berita
                            </Link>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <Badge className="bg-primary text-white px-4 py-1.5 rounded-xl font-black uppercase tracking-widest text-[10px] border-none shadow-glow">
                                    {berita.category}
                                </Badge>
                                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-xl border border-white/10">
                                    <Sparkles className="w-3 h-3 text-primary" /> Editor Choice
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                                {berita.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 py-8 border-t border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-black">
                                        {berita.author?.[0] || "A"}
                                    </div>
                                    <div>
                                        <p className="text-white text-xs font-black uppercase tracking-widest">{berita.author || "Administrator"}</p>
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-0.5">Official Press</p>
                                    </div>
                                </div>

                                <div className="flex gap-8">
                                    <div className="flex items-center gap-2 text-white/60">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">
                                            {new Date(berita.date).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/60">
                                        <Eye className="w-4 h-4 text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">{berita.views} Views</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-24 relative">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-12 gap-16">
                            {/* Main Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="lg:col-span-8"
                            >
                                <div className="relative rounded-[3rem] overflow-hidden mb-12 shadow-elevated border border-border">
                                    <img
                                        src={berita.image === "/placeholder.svg" ? `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200` : berita.image}
                                        alt={berita.title}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>

                                <div className="prose prose-xl dark:prose-invert prose-primary max-w-none">
                                    <p className="text-2xl font-light text-foreground/80 leading-relaxed italic border-l-4 border-primary pl-8 mb-12">
                                        {berita.excerpt}
                                    </p>

                                    <div className="text-muted-foreground font-light leading-relaxed space-y-8">
                                        {/* Simulated content as the dummy data might not have full content */}
                                        <p>
                                            LUMINA NEWS — SMK Nusantara kembali menorehkan tinta emas dalam perjalanan transformasinya menuju institusi vokasi bertaraf internasional. Kegiatan yang berlangsung baru-baru ini di lingkungan sekolah menunjukkan betapa agilitas dan inovasi menjadi DNA utama bagi seluruh entitas sekolah.
                                        </p>
                                        <p>
                                            Dalam sambutannya, perwakilan sekolah menekankan bahwa setiap inisiatif yang diambil—baik itu dalam bidang prestasi akademik maupun pengembangan infrastruktur digital—selalu berhulu pada satu tujuan: kemanfaatan maksimal bagi siswa di panggung industri global.
                                        </p>
                                        <div className="my-12 p-12 bg-foreground rounded-[3rem] text-white">
                                            <MessageCircle className="w-12 h-12 text-primary mb-6" />
                                            <h4 className="text-2xl font-black mb-4">"Ini adalah langkah nyata kami dalam menjawab tantangan Industry 4.0, di mana keahlian teknis harus berjalan beriringan dengan karakter yang kokoh."</h4>
                                            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">— Tim Manajemen Inovasi SMK Nusantara</p>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                        </p>
                                        <p>
                                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Seluruh rangkaian rangkaian acara ini diharapkan mampu menjadi pemantik semangat bagi seluruh siswa untuk terus berkarya dan berinovasi tanpa batas.
                                        </p>
                                    </div>
                                </div>

                                {/* Tags & Meta Post */}
                                <div className="mt-16 pt-10 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-8">
                                    <div className="flex flex-wrap gap-2">
                                        {["Pendidikan", "Vokasi", "Prestasi", "Modern"].map(tag => (
                                            <span key={tag} className="px-4 py-1.5 rounded-lg bg-foreground/5 text-foreground text-[10px] font-black uppercase tracking-widest border border-border italic text-muted-foreground">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Share Post:</span>
                                        <div className="flex gap-4">
                                            {[Facebook, Twitter, Instagram, Share2].map((Icon, i) => (
                                                <button key={i} className="w-12 h-12 rounded-2xl bg-foreground/5 border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                                                    <Icon className="w-5 h-5" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Sidebar */}
                            <div className="lg:col-span-4 space-y-12">
                                {/* Author Card */}
                                <div className="p-10 bg-foreground rounded-[3rem] text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
                                    <h4 className="text-xs font-black uppercase tracking-widest mb-8 text-primary">Tentang Penulis</h4>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-black border border-white/10 text-primary">
                                            {berita.author?.[0] || "A"}
                                        </div>
                                        <div>
                                            <h5 className="font-black uppercase tracking-widest text-sm">{berita.author || "Admin School"}</h5>
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Public Relations</p>
                                        </div>
                                    </div>
                                    <p className="text-white/60 text-sm font-light leading-relaxed mb-6">
                                        Menyajikan berita dan informasi terkini dari jantung SMK Nusantara untuk menginspirasi dunia.
                                    </p>
                                    <button className="w-full py-4 rounded-2xl bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all">
                                        View All News
                                    </button>
                                </div>

                                {/* Recommended / Related */}
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 pb-4 border-b-2 border-primary w-fit">Inspirasi Lainnya</h4>
                                    <div className="space-y-8">
                                        {relatedNews.map((news) => (
                                            <Link key={news.id} to={`/berita/${news.slug}`} className="group flex gap-6 items-center">
                                                <div className="w-24 h-24 rounded-2xl bg-muted overflow-hidden shrink-0 border border-border">
                                                    <img
                                                        src={news.image === "/placeholder.svg" ? `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=200` : news.image}
                                                        alt={news.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <h5 className="font-bold text-sm text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">{news.title}</h5>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                                        <Calendar className="w-3 h-3 text-primary" />
                                                        {new Date(news.date).toLocaleDateString("id-ID", { month: "short", day: "numeric" })}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Tag Cloud */}
                                <div className="p-10 rounded-[3rem] bg-primary/5 border border-primary/10">
                                    <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-8 text-primary">Topics</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {["Vokasi", "Teknologi", "Prestasi", "Industri", "Global", "Masa Depan", "Kreatif"].map(tag => (
                                            <span key={tag} className="px-4 py-2 rounded-xl bg-white text-[10px] font-black uppercase tracking-widest border border-border hover:border-primary cursor-pointer transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </PublicLayout>
        </>
    );
}
