import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, Eye, Search, ArrowRight } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { beritaList } from "@/lib/dummy-data";

const Berita = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(beritaList.map((b) => b.category))];

  const filteredBerita = beritaList.filter((berita) => {
    const matchesSearch = berita.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      berita.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || berita.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Berita & Artikel - SMK Nusantara</title>
        <meta name="description" content="Berita dan informasi terbaru seputar kegiatan, prestasi, dan pengumuman SMK Nusantara." />
      </Helmet>
      <PublicLayout>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-primary">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                Berita & Artikel
              </h1>
              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                Ikuti perkembangan terbaru seputar kegiatan, prestasi, dan pengumuman sekolah
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    !selectedCategory
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  Semua
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredBerita.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Tidak ada berita yang ditemukan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBerita.map((berita, index) => (
                  <motion.article
                    key={berita.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="h-48 bg-muted relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-primary opacity-60" />
                      <div className="absolute top-4 left-4">
                        <Badge variant={berita.category === "Prestasi" ? "default" : berita.category === "Pengumuman" ? "warning" : "secondary"}>
                          {berita.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(berita.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {berita.views}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {berita.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {berita.excerpt}
                      </p>
                      <button className="inline-flex items-center gap-1 text-primary font-medium text-sm">
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default Berita;
