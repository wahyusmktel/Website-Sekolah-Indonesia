import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { galeriList } from "@/lib/dummy-data";

const Galeri = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<typeof galeriList[0] | null>(null);

  const categories = [...new Set(galeriList.map((g) => g.category))];

  const filteredGaleri = selectedCategory
    ? galeriList.filter((g) => g.category === selectedCategory)
    : galeriList;

  return (
    <>
      <Helmet>
        <title>Galeri - SMK Nusantara</title>
        <meta name="description" content="Galeri foto kegiatan dan dokumentasi SMK Nusantara." />
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
                Galeri Foto
              </h1>
              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                Dokumentasi kegiatan dan momen berharga di SMK Nusantara
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 flex-wrap justify-center">
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
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGaleri.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setSelectedImage(item)}
                  className="group aspect-square bg-gradient-primary rounded-2xl overflow-hidden cursor-pointer relative shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-primary-foreground/30 font-bold text-4xl">
                    {item.title.charAt(0)}
                  </div>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-end">
                    <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                      <h4 className="text-background font-medium">{item.title}</h4>
                      <span className="text-background/80 text-sm">{item.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center text-background hover:bg-background/30 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-gradient-primary rounded-2xl w-full max-w-3xl aspect-video flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-6xl font-bold text-primary-foreground/30">
                  {selectedImage.title.charAt(0)}
                </span>
              </motion.div>
              <div className="absolute bottom-8 text-center">
                <h3 className="text-xl font-semibold text-background">{selectedImage.title}</h3>
                <p className="text-background/80">{selectedImage.category}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PublicLayout>
    </>
  );
};

export default Galeri;
