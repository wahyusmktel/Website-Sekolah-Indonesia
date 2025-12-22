import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Calendar, ArrowRight, Filter, Sparkles, Folder } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { formatDate } from "@/lib/date-utils";
import { Loader2 } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Galeri = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: settings } = useSiteSettings();
  const schoolName = settings?.school_name || "SMK Nusantara";

  const { data: albumListRaw, isLoading, isError } = useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      const response = await apiClient.get('/albums');
      return response.data;
    }
  });

  const { data: stats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await apiClient.get('/stats');
      return response.data;
    }
  });

  const albumList = Array.isArray(albumListRaw) ? albumListRaw : [];

  const categories = Array.from(new Set(albumList.map((a: any) => a?.category))).filter(Boolean) as string[];

  const filteredAlbums = selectedCategory
    ? albumList.filter((a: any) => a?.category === selectedCategory)
    : albumList;

  if (isError) {
    return (
      <PublicLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-foreground">
          <ImageIcon className="w-16 h-16 text-destructive/20 mb-6" />
          <h3 className="text-2xl font-black text-white mb-2">Terjadi Kesalahan</h3>
          <p className="text-white/40">Gagal memuat album galeri. Pastikan koneksi server tersedia.</p>
        </div>
      </PublicLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Galeri - {schoolName}</title>
        <meta name="description" content={`Koleksi album foto kegiatan, dokumentasi, dan momen berharga ${schoolName}.`} />
      </Helmet>
      <PublicLayout>
        {/* Modern Header */}
        <section className="relative pt-40 pb-20 overflow-hidden bg-foreground">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[80px]" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-[10px] font-black uppercase tracking-widest mb-6">
                  <ImageIcon className="w-3 h-3" />
                  Visual Archiving
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                  Galeri <br /> <span className="text-primary italic">Kenangan</span>
                </h1>
                <p className="text-white/40 text-xl font-light max-w-2xl leading-relaxed">
                  Jelajahi setiap momen berharga dan dokumentasi transformasional dalam bentuk album foto eksklusif {schoolName}.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="relative -mt-10 z-20">
          <div className="container mx-auto px-4">
            <div className="bg-white dark:bg-foreground/40 backdrop-blur-2xl border border-border p-6 rounded-[2.5rem] shadow-glow flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
                <div className="flex items-center gap-2 px-4 py-2 bg-foreground/5 rounded-xl border border-border shrink-0">
                  <Filter className="w-4 h-4 text-primary" />
                  <span className="text-xs font-black uppercase tracking-widest opacity-40">Kategori</span>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${!selectedCategory
                    ? "bg-primary text-white shadow-glow"
                    : "bg-foreground/5 text-foreground hover:bg-foreground/10"
                    }`}
                >
                  Semua Album
                </button>
                {categories.map((category: any) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${selectedCategory === category
                      ? "bg-primary text-white shadow-glow"
                      : "bg-foreground/5 text-foreground hover:bg-foreground/10"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-4 text-muted-foreground/40">
                <Folder className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">{filteredAlbums.length} Album Ditemukan</span>
              </div>
            </div>
          </div>
        </section>

        {/* Albums Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="w-12 h-12 animate-spin text-primary/40 mb-4" />
                <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs">Menyiapkan Kenangan Terbaik...</p>
              </div>
            ) : filteredAlbums.length === 0 ? (
              <div className="text-center py-24 bg-foreground/5 rounded-[3rem] border border-dashed border-border">
                <ImageIcon className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
                <h3 className="text-2xl font-black text-white mb-2">Belum Ada Album</h3>
                <p className="text-white/40">Maaf, saat ini belum ada koleksi foto yang dipublikasikan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
                <AnimatePresence>
                  {filteredAlbums.map((album: any, index: number) => (
                    <motion.article
                      key={album.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group relative flex flex-col h-[500px] rounded-[3.5rem] overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 shadow-soft hover:shadow-glow"
                    >
                      <Link to={`/galeri/${album.slug}`} className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                        <img
                          src={album.cover_image?.startsWith('http') ? album.cover_image : `${API_BASE_URL}${album.cover_image}`}
                          alt={album.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />

                        <div className="absolute top-10 left-10 z-20">
                          <span className="px-5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                            {album.category}
                          </span>
                        </div>

                        <div className="absolute bottom-10 left-10 right-10 z-20 space-y-4">
                          <div className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(album.date)}
                          </div>
                          <h3 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight group-hover:text-primary transition-colors">
                            {album.title}
                          </h3>
                          <p className="text-white/60 text-lg font-light line-clamp-2 max-w-xl">
                            {album.description}
                          </p>

                          <div className="pt-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex -space-x-4">
                                {album.items?.slice(0, 3).map((item: any, i: number) => (
                                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-muted">
                                    <img src={item.image?.startsWith('http') ? item.image : `${API_BASE_URL}${item.image}`} className="w-full h-full object-cover" />
                                  </div>
                                ))}
                                {album.items?.length > 3 && (
                                  <div className="w-10 h-10 rounded-full border-2 border-black bg-foreground flex items-center justify-center text-[10px] font-black text-white">
                                    +{(album.items?.length || 0) - 3}
                                  </div>
                                )}
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{(album.items?.length || 0)} Foto</span>
                            </div>

                            <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 shadow-glow">
                              <ArrowRight className="w-6 h-6" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        {/* Explore Visual / CTA */}
        <section className="pb-32">
          <div className="container mx-auto px-4">
            <div className="relative rounded-[4rem] bg-foreground p-12 lg:p-24 overflow-hidden">
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <Sparkles className="w-96 h-96 text-primary animate-pulse" />
              </div>
              <div className="relative z-10 text-center lg:text-left">
                <h2 className="text-white text-4xl md:text-5xl font-black mb-8 leading-tight">Abadikan Setiap <br /> <span className="text-primary italic">Pencapaian Berharga</span></h2>
                <p className="text-white/40 text-xl font-light max-w-2xl mb-12">
                  Kami percaya setiap langkah adalah progres. Galeri ini adalah saksi bisu transformasi siswa-siswi kami menuju puncak kesuksesan.
                </p>
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                  <div className="flex items-center gap-4 text-white/60">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest">{stats?.galeri || 0}+ Dokumentasi</div>
                  </div>
                  <div className="flex items-center gap-4 text-white/60">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Folder className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest">{stats?.albums || 0}+ Album Eksklusif</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default Galeri;
