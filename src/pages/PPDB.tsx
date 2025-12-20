import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, Calendar, CreditCard } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { ppdbTimeline, biayaPPDB, programKeahlian } from "@/lib/dummy-data";

const PPDB = () => {
  return (
    <>
      <Helmet>
        <title>PPDB Online - SMK Nusantara</title>
        <meta name="description" content="Pendaftaran Peserta Didik Baru (PPDB) SMK Nusantara. Informasi alur pendaftaran, biaya, dan program keahlian." />
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
              <span className="inline-block px-4 py-2 rounded-full bg-background/20 text-primary-foreground text-sm font-medium mb-4">
                Tahun Ajaran 2024/2025
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                Pendaftaran Siswa Baru
              </h1>
              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-8">
                Bergabunglah bersama kami dan raih masa depan cerah. Pendaftaran online kini dibuka!
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="xl" variant="hero" asChild>
                  <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Daftar via WhatsApp
                  </a>
                </Button>
                <Button size="xl" variant="hero-outline" asChild>
                  <Link to="/kontak">Info Lebih Lanjut</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Programs Quick View */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Pilih Program Keahlianmu</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                6 program keahlian dengan kurikulum berbasis industri siap menyambutmu
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {programKeahlian.map((program, index) => (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-card rounded-2xl p-6 text-center shadow-soft hover:shadow-card transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">{program.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-medium text-foreground text-sm">{program.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 bg-gradient-soft">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                <Calendar className="w-4 h-4" />
                Alur Pendaftaran
              </div>
              <h2 className="text-3xl font-bold text-foreground">Jadwal PPDB 2024/2025</h2>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

                {ppdbTimeline.map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex gap-6 mb-8 last:mb-0"
                  >
                    <div className="hidden md:flex w-16 h-16 rounded-2xl bg-gradient-primary items-center justify-center flex-shrink-0 z-10">
                      <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                    </div>
                    <div className="flex-1 bg-card rounded-2xl p-6 shadow-soft">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                        <span className="text-sm text-primary font-medium">{item.date}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Biaya */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                <CreditCard className="w-4 h-4" />
                Biaya Pendidikan
              </div>
              <h2 className="text-3xl font-bold text-foreground">Rincian Biaya PPDB</h2>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
                {biayaPPDB.map((item, index) => (
                  <motion.div
                    key={item.item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`flex items-center justify-between p-6 ${index !== biayaPPDB.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">{item.item}</span>
                    </div>
                    <span className="text-lg font-semibold text-foreground">
                      Rp {item.biaya.toLocaleString('id-ID')}
                    </span>
                  </motion.div>
                ))}
                <div className="p-6 bg-gradient-primary">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-primary-foreground">Total Biaya Awal</span>
                    <span className="text-2xl font-bold text-primary-foreground">
                      Rp {biayaPPDB.reduce((sum, item) => sum + item.biaya, 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-center text-muted-foreground text-sm mt-6">
                * Biaya dapat diangsur. Hubungi kami untuk informasi lebih lanjut.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-soft">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-hero rounded-3xl p-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Siap Bergabung?
              </h2>
              <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-8">
                Jangan lewatkan kesempatan untuk menjadi bagian dari SMK Nusantara. Daftar sekarang!
              </p>
              <Button size="xl" variant="hero" asChild>
                <a href="https://wa.me/628123456789" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hubungi via WhatsApp
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default PPDB;
