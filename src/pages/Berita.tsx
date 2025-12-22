import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Eye, Search, ArrowRight, TrendingUp, Sparkles, Filter, ChevronRight, Loader2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { getImageUrl } from "@/lib/image-utils";
import { useSiteSettings } from "@/hooks/use-site-settings";

const Berita = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: settings } = useSiteSettings();
  const schoolName = settings?.school_name || "SMK Nusantara";

  const { data: beritaList = [], isLoading } = useQuery({
    queryKey: ['berita'],
    queryFn: async () => {
      const response = await apiClient.get('/berita');
      return response.data;
    }
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['kategori-berita'],
    queryFn: async () => {
      const response = await apiClient.get('/kategori-berita');
      return response.data;
    }
  });

  const filteredBerita = beritaList.filter((berita: any) => {
    const matchesSearch = berita.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      berita.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || berita.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const pageUrl = `${window.location.origin}/berita`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `Berita & Artikel ${schoolName}`,
    "description": `Berita dan informasi terbaru seputar kegiatan, prestasi, dan pengumuman ${schoolName}.`,
    "url": pageUrl,
    "publisher": {
      "@type": "Organization",
      "name": schoolName
    }
  };

  return (
    <>
      <Helmet>
        <title>Berita & Artikel | Hub Informasi Terkini {schoolName}</title>
        <meta name="description" content={`Eksplorasi wawasan terbaru, prestasi siswa, inovasi vokasi, dan agenda transformasional hanya di portal berita resmi ${schoolName}.`} />
        <meta name="keywords" content={`${schoolName}, Berita Sekolah, Vokasi, Prestasi Siswa, Pendidikan Indonesia, Artikel Pendidikan`} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`Berita & Artikel | ${schoolName}`} />
        <meta property="og:description" content={`Portal informasi resmi ${schoolName}. Temukan berita terbaru dan inspirasi pendidikan vokasi di sini.`} />

        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>
      <PublicLayout>
        {/* Modern Header Section */}
        <section className="relative pt-40 pb-20 overflow-hidden bg-foreground">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-[10px] font-black uppercase tracking-widest mb-6">
                  <TrendingUp className="w-3 h-3" />
                  Update Terpopuler
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                  Wawasan & <br /> <span className="text-primary italic">Inspirasi</span>
                </h1>
                <p className="text-white/40 text-xl font-light max-w-2xl leading-relaxed">
                  Temukan kabar terbaru mengenai inovasi pendidikan, prestasi gemilang siswa, dan agenda transformasional di {schoolName}.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search & Filter - Floating Style */}
        <section className="relative -mt-10 z-20">
          <div className="container mx-auto px-4">
            <div className="bg-white dark:bg-foreground/40 backdrop-blur-2xl border border-border p-6 rounded-[2.5rem] shadow-glow flex flex-col lg:flex-row gap-6 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  type="text"
                  placeholder="Eksplorasi berita dan artikel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 h-16 rounded-2xl border-none bg-foreground/5 dark:bg-white/5 focus-visible:ring-primary/20 transition-all font-medium text-lg placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                <div className="flex items-center gap-2 px-4 py-2 bg-foreground/5 rounded-xl border border-border shrink-0">
                  <Filter className="w-4 h-4 text-primary" />
                  <span className="text-xs font-black uppercase tracking-widest opacity-40">Filter</span>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${!selectedCategory
                    ? "bg-primary text-white shadow-glow"
                    : "bg-foreground/5 text-foreground hover:bg-foreground/10"
                    }`}
                >
                  Semua
                </button>
                {categories.map((c: any) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.name)}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${selectedCategory === c.name
                      ? "bg-primary text-white shadow-glow"
                      : "bg-foreground/5 text-foreground hover:bg-foreground/10"
                      }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured News / News Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center py-32"><Loader2 className="w-12 h-12 animate-spin text-primary" /></div>
            ) : filteredBerita.length === 0 ? (
              <div className="text-center py-32 bg-foreground/5 rounded-[4rem] border-2 border-dashed border-border">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-primary" />
                </div>
                <p className="text-muted-foreground text-xl font-light">Tidak menemukan berita yang sesuai dengan kriteria Anda.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                  className="mt-6 text-primary font-black uppercase tracking-widest text-xs hover:underline decoration-2 underline-offset-8"
                >
                  Reset Pencarian
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence mode="popLayout">
                  {filteredBerita.map((berita: any, index: number) => (
                    <motion.article
                      key={berita.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="group relative flex flex-col h-full bg-white dark:bg-foreground/5 rounded-[3rem] overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 shadow-soft hover:shadow-glow"
                    >
                      <Link to={`/berita/${berita.slug}`} className="block h-64 relative overflow-hidden bg-muted">
                        <div className="absolute inset-0 bg-foreground/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img
                          src={getImageUrl(berita.image)}
                          alt={berita.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-6 left-6 z-20">
                          <Badge className="bg-white/90 dark:bg-foreground/90 text-primary-dark backdrop-blur-md px-4 py-1.5 rounded-xl font-black uppercase tracking-widest text-[10px] border-none">
                            {berita.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center translate-y-12 group-hover:translate-y-0 transition-transform duration-500 bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                          <span className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <Sparkles className="w-3 h-3" /> Popular Post
                          </span>
                          <ChevronRight className="w-4 h-4 text-white" />
                        </div>
                      </Link>

                      <div className="p-10 flex flex-col flex-1">
                        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-primary" />
                            {new Date(berita.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5 text-primary" />
                            {berita.views} Views
                          </span>
                        </div>

                        <h3 className="text-2xl font-black text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                          <Link to={`/berita/${berita.slug}`}>{berita.title}</Link>
                        </h3>

                        <p className="text-muted-foreground font-light leading-relaxed mb-8 line-clamp-3">
                          {berita.excerpt}
                        </p>

                        <div className="mt-auto pt-8 border-t border-border">
                          <Link
                            to={`/berita/${berita.slug}`}
                            className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary group/link"
                          >
                            Selengkapnya
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter / CTA Section */}
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="bg-primary/5 rounded-[4rem] p-12 lg:p-24 border border-primary/10 relative overflow-hidden text-center lg:text-left">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">Stay Connected</h2>
                  <p className="text-muted-foreground text-xl font-light">Dapatkan rangkuman mingguan mengenai prestasi dan inovasi terbaru {schoolName} langsung di inbox Anda.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="Email address..."
                    className="h-16 rounded-2xl bg-white border-none shadow-soft text-lg px-8 placeholder:text-muted-foreground/40"
                  />
                  <button className="h-16 px-12 rounded-2xl bg-foreground text-white font-black uppercase tracking-widest text-xs hover:bg-primary transition-colors shadow-glow">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default Berita;
