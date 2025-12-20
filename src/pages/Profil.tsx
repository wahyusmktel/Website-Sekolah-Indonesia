import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Target, Eye, History, Sparkles, BookOpen, Users, Rocket, Trophy, CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";

const Profil = () => {
  return (
    <>
      <Helmet>
        <title>Profil Sekolah - SMK Nusantara</title>
        <meta name="description" content="Profil lengkap SMK Nusantara: Visi, Misi, Sejarah, dan Sambutan Kepala Sekolah." />
      </Helmet>
      <PublicLayout>
        {/* Modern Hero Section */}
        <section className="relative pt-40 pb-24 overflow-hidden bg-foreground">
          {/* Geometric Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"
            />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.05, x: 0 }}
              transition={{ duration: 1 }}
              className="absolute bottom-0 left-0 w-96 h-96 bg-primary rotate-45 rounded-[4rem] translate-y-1/2 -translate-x-1/2"
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-black uppercase tracking-widest mb-8">
                  <Sparkles className="w-4 h-4" />
                  Edukasi Berkualitas Dunia
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                  Dedikasi Untuk <br />
                  <span className="text-primary italic">Masa Depan</span>
                </h1>
                <p className="text-white/60 text-xl font-light max-w-2xl mx-auto leading-relaxed">
                  Menjelajahi identitas SMK Nusantara sebagai pelopor pendidikan vokasi modern yang menggabungkan keahlian industri dengan karakter unggul.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission - Glassmorphism Style */}
        <section className="py-32 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-[3rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative h-full bg-white dark:bg-foreground/5 backdrop-blur-xl rounded-[3.5rem] p-12 lg:p-16 border border-border group-hover:border-primary/20 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                  <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-10 shadow-glow rotate-3 group-hover:rotate-6 transition-transform">
                    <Eye className="w-10 h-10 text-white" />
                  </div>

                  <h2 className="text-4xl font-black text-foreground mb-6 tracking-tight">Visi <span className="text-primary">Utama</span></h2>
                  <p className="text-muted-foreground text-xl font-light leading-relaxed">
                    Menjadi epicenter pendidikan kejuruan yang menghasilkan pemimpin masa depan berkarakter global, kompeten secara teknis, dan memiliki jiwa inovator yang berdaya saing internasional.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-l from-primary/20 to-transparent rounded-[3rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative h-full bg-white dark:bg-foreground/5 backdrop-blur-xl rounded-[3.5rem] p-12 lg:p-16 border border-border group-hover:border-primary/20 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2" />

                  <div className="w-20 h-20 rounded-3xl bg-foreground dark:bg-primary flex items-center justify-center mb-10 shadow-elevated -rotate-3 group-hover:-rotate-6 transition-transform">
                    <Target className="w-10 h-10 text-white" />
                  </div>

                  <h2 className="text-4xl font-black text-foreground mb-8 tracking-tight">Misi <span className="text-primary italic">Strategis</span></h2>
                  <div className="space-y-6">
                    {[
                      "Menyelenggarakan kurikulum berbasis industri terkini.",
                      "Membangun ekosistem pendidikan karakter yang inklusif.",
                      "Memperluas jejaring strategis dengan korporasi global.",
                      "Mendorong budaya riset dan inovasi teknologi terapan."
                    ].map((misi, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs shrink-0 mt-1">
                          0{i + 1}
                        </div>
                        <p className="text-muted-foreground text-lg font-light leading-tight">{misi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pillars / Values Section */}
        <section className="py-24 bg-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-1/4" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-white text-4xl font-black mb-4">Pilar Keunggulan</h2>
              <p className="text-white/40 text-lg">Nilai-nilai inti yang membentuk DNA pendidikan kami</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Users, label: "Community", color: "text-blue-400" },
                { icon: BookOpen, label: "Integrity", color: "text-red-400" },
                { icon: Rocket, label: "Innovation", color: "text-emerald-400" },
                { icon: Trophy, label: "Excellence", color: "text-amber-400" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/10 transition-colors cursor-default"
                >
                  <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color}`} />
                  <p className="text-white font-black uppercase tracking-widest text-xs">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* History Timeline - Enhanced */}
        <section className="py-32 bg-white dark:bg-foreground/[0.02]">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-20">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <History className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-foreground">Jejak Perjalanan</h2>
                  <p className="text-muted-foreground text-lg italic">Transformasi tanpa henti sejak 1995</p>
                </div>
                <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-border to-transparent" />
              </div>

              <div className="relative space-y-24">
                {/* Vertical Line */}
                <div className="absolute left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/20 to-transparent" />

                {[
                  {
                    year: "1995",
                    title: "Era Perintisan",
                    desc: "Dimulai sebagai STM Nusantara dengan fokus pada teknik mesin dan otomotif. Membangun fondasi pendidikan vokasi yang disiplin."
                  },
                  {
                    year: "2005",
                    title: "Transformasi Digital Pertama",
                    desc: "Berubah nama menjadi SMK Nusantara dan membuka departemen Teknologi Informasi, merespon revolusi digital awal di Indonesia."
                  },
                  {
                    year: "2024",
                    title: "Global Leadership",
                    desc: "Kini mengelola 6 program keahlian bertaraf internasional dengan kemitraan lebih dari 100 perusahaan global."
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-12 relative"
                  >
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-primary flex items-center justify-center font-black text-primary z-10 shrink-0 shadow-glow">
                      {i + 1}
                    </div>
                    <div className="pt-2">
                      <span className="text-primary font-black text-2xl mb-2 block">{item.year}</span>
                      <h3 className="text-3xl font-black text-foreground mb-4 leading-tight">{item.title}</h3>
                      <p className="text-muted-foreground text-xl font-light leading-relaxed max-w-2xl">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Principal Message - Modern Section */}
        <section className="py-32 bg-foreground relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-0 w-full h-px bg-primary" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-primary" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto bg-white/5 rounded-[4rem] p-12 lg:p-24 border border-white/10 backdrop-blur-2xl">
              <div className="grid lg:grid-cols-5 gap-16 items-center">
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full" />
                    <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-glow">
                      <img
                        src="https://images.unsplash.com/photo-1519085115824-2a5a1bcbb9e6?auto=format&fit=crop&q=80&w=800"
                        alt="Principal"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-10 left-10 text-white">
                        <p className="font-black text-2xl">Drs. H. Mulyadi, M.Pd.</p>
                        <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1">Chief Visionary Officer</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="lg:col-span-3 space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h2 className="text-white text-5xl font-black leading-tight tracking-tight">
                    Pesan Untuk <br /> <span className="text-primary italic">Generasi Penerus</span>
                  </h2>
                  <div className="space-y-6">
                    <p className="text-white/60 text-xl font-light leading-relaxed">
                      "Pendidikan bukan sekadar transfer ilmu, melainkan proses penempaan karakter dan mentalitas kompetitif. Di SMK Nusantara, kami mendesain ekosistem di mana setiap siswa ditantang untuk melampaui batas kemampuan mereka."
                    </p>
                    <p className="text-white/60 text-xl font-light leading-relaxed">
                      "Teknologi akan terus berubah, namun karakter yang kuat adalah aset yang tidak akan pernah usang. Kami bangga dapat menjadi bagian dari perjalanan Anda menuju kesuksesan di panggung global."
                    </p>
                  </div>

                  <div className="pt-8 flex items-center gap-6">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                    <div>
                      <p className="text-white font-bold">Terakreditasi A (Unggul)</p>
                      <p className="text-white/40 text-xs uppercase tracking-widest">National Education Standard</p>
                    </div>
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

export default Profil;
