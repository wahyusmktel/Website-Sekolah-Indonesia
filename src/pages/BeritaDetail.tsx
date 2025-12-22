import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, Eye, ArrowLeft, Share2, Facebook, Twitter, Instagram, Sparkles, ChevronRight, MessageCircle, Loader2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import NotFound from "./NotFound";
import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { getImageUrl } from "@/lib/image-utils";
import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/use-site-settings";

export default function BeritaDetail() {
    const { slug } = useParams();
    const { data: settings } = useSiteSettings();
    const schoolName = settings?.school_name || "SMK Nusantara";

    const { data: berita, isLoading } = useQuery({
        queryKey: ['berita', slug],
        queryFn: async () => {
            const response = await apiClient.get('/berita');
            return response.data.find((b: any) => b.slug === slug);
        }
    });

    const { data: relatedNews = [] } = useQuery({
        queryKey: ['berita-related'],
        queryFn: async () => {
            const response = await apiClient.get('/berita');
            return response.data.filter((b: any) => b.slug !== slug).slice(0, 3);
        }
    });

    const viewMutation = useMutation({
        mutationFn: (id: number) => apiClient.patch(`/berita/${id}/view`),
    });

    useEffect(() => {
        if (berita?.id) {
            viewMutation.mutate(berita.id);
        }
    }, [berita?.id]);

    if (isLoading) {
        return (
            <PublicLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
            </PublicLayout>
        );
    }

    if (!berita) {
        return <NotFound />;
    }

    const pageUrl = `${window.location.origin}/berita/${berita.slug}`;
    const fullImageUrl = getImageUrl(berita.image).startsWith('http')
        ? getImageUrl(berita.image)
        : `${window.location.origin}${getImageUrl(berita.image)}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": berita.title,
        "image": [fullImageUrl],
        "datePublished": new Date(berita.date).toISOString(),
        "dateModified": new Date(berita.created_at || berita.date).toISOString(),
        "author": [{
            "@type": "Person",
            "name": berita.author || "Administrator",
            "url": window.location.origin
        }],
        "publisher": {
            "@type": "Organization",
            "name": schoolName,
            "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/logo.png`
            }
        },
        "description": berita.excerpt
    };

    return (
        <>
            <Helmet>
                {/* Basic Meta Tags */}
                <title>{berita.title} | Berita {schoolName}</title>
                <meta name="description" content={berita.excerpt} />
                <meta name="keywords" content={`${berita.category}, ${schoolName}, Berita Sekolah, Vokasi, ${berita.title.split(' ').join(', ')}`} />
                <link rel="canonical" href={pageUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={berita.title} />
                <meta property="og:description" content={`Portal informasi resmi ${schoolName}. Temukan berita terbaru dan inspirasi pendidikan vokasi di sini.`} />
                <meta property="og:image" content={fullImageUrl} />
                <meta property="article:published_time" content={new Date(berita.date).toISOString()} />
                <meta property="article:author" content={berita.author || "Administrator"} />
                <meta property="article:section" content={berita.category} />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={pageUrl} />
                <meta property="twitter:title" content={berita.title} />
                <meta property="twitter:description" content={berita.excerpt} />
                <meta property="twitter:image" content={fullImageUrl} />

                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
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
                                        src={getImageUrl(berita.image)}
                                        alt={berita.title}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>

                                <div className="prose prose-xl dark:prose-invert prose-primary max-w-none">
                                    <p className="text-2xl font-light text-foreground/80 leading-relaxed italic border-l-4 border-primary pl-8 mb-12">
                                        {berita.excerpt}
                                    </p>

                                    <div
                                        className="text-muted-foreground font-light leading-relaxed space-y-8 ql-editor"
                                        dangerouslySetInnerHTML={{ __html: berita.content }}
                                    />
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
                                        Menyajikan berita dan informasi terkini dari jantung {schoolName} untuk menginspirasi dunia.
                                    </p>
                                    <button className="w-full py-4 rounded-2xl bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all">
                                        View All News
                                    </button>
                                </div>

                                {/* Recommended / Related */}
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 pb-4 border-b-2 border-primary w-fit">Inspirasi Lainnya</h4>
                                    <div className="space-y-8">
                                        {relatedNews.map((news: any) => (
                                            <Link key={news.id} to={`/berita/${news.slug}`} className="group flex gap-6 items-center">
                                                <div className="w-24 h-24 rounded-2xl bg-muted overflow-hidden shrink-0 border border-border">
                                                    <img
                                                        src={getImageUrl(news.image)}
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
