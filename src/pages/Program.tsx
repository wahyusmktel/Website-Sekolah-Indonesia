import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Code, Network, Palette, CheckCircle2, Briefcase, Sparkles, ArrowRight, Zap, Globe, Cpu } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { programKeahlian } from "@/lib/dummy-data";
import { Button } from "@/components/ui/button";

const iconMap: { [key: string]: React.ElementType } = {
  Code,
  Network,
  Palette,
};

const Program = () => {
  return (
    <>
      <Helmet>
        <title>Program Keahlian - SMK Nusantara</title>
        <meta name="description" content="Program keahlian unggulan SMK Nusantara: TJAT, TKJ, RPL, dan Animasi dengan standar industri global." />
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
              className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2"
            />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-black uppercase tracking-widest mb-8">
                  <Cpu className="w-4 h-4" />
                  Innovation Hub
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                  Spesialisasi <br />
                  <span className="text-primary italic">Masa Depan</span>
                </h1>
                <p className="text-white/60 text-xl font-light max-w-2xl mx-auto leading-relaxed">
                  Kurikulum transvokasi yang menggabungkan kedalaman teknis dengan agilitas digital untuk mencetak profesional kelas dunia.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Programs Detail Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-32">
              {programKeahlian.map((program, index) => {
                const Icon = iconMap[program.icon] || Code;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={program.id}
                    id={program.slug}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center`}
                  >
                    {/* Interactive Visual Area */}
                    <div className="w-full lg:w-1/2 relative group">
                      <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="relative aspect-[4/3] bg-foreground rounded-[4rem] overflow-hidden shadow-elevated border border-white/5">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />

                        {/* Abstract Tech Patterns */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                          <svg width="100%" height="100%">
                            <pattern id={`prog-pattern-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                            <rect width="100%" height="100%" fill={`url(#prog-pattern-${index})`} />
                          </svg>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] bg-white dark:bg-foreground flex items-center justify-center shadow-glow border border-white/10"
                          >
                            <Icon className="w-16 h-16 md:w-24 md:h-24 text-primary" />
                          </motion.div>
                        </div>

                        {/* Decorative floating badges */}
                        <div className="absolute bottom-10 left-10 flex gap-3">
                          <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                            Global Industry Standard
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="w-full lg:w-1/2 space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-primary font-black text-xs uppercase tracking-[0.3em]">
                          <Zap className="w-4 h-4" />
                          Program Spesialisasi 0{program.id}
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tight">
                          {program.name}
                        </h2>
                        <div className="w-20 h-1.5 bg-primary rounded-full group-hover:w-32 transition-all duration-500" />
                      </div>

                      <p className="text-muted-foreground text-xl font-light leading-relaxed">
                        {program.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="p-8 rounded-[2.5rem] bg-white dark:bg-foreground/5 border border-border space-y-4 group/card hover:border-primary/30 transition-colors">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-white transition-colors">
                              <Briefcase className="w-5 h-5" />
                            </div>
                            <h4 className="font-black uppercase tracking-widest text-[10px] text-foreground">Prospek Karir</h4>
                          </div>
                          <ul className="space-y-3">
                            {program.prospects.map((prospect, i) => (
                              <li key={i} className="flex items-center gap-3 group/item">
                                <CheckCircle2 className="w-4 h-4 text-primary opacity-40 group-hover/item:opacity-100 transition-opacity" />
                                <span className="text-sm text-foreground/70 font-medium">{prospect}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 space-y-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                              <Globe className="w-5 h-5" />
                            </div>
                            <h4 className="font-black uppercase tracking-widest text-[10px] text-primary">Key Tech</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {["Industry 4.0", "Global Cert", "Digital Lab"].map((tech, i) => (
                              <span key={i} className="px-3 py-1 rounded-lg bg-white/50 dark:bg-white/5 border border-primary/20 text-primary text-[10px] font-bold uppercase">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-primary/60 italic leading-relaxed pt-2">
                            Kurikulum diselaraskan dengan standar kompetensi global.
                          </p>
                        </div>
                      </div>

                      <div className="pt-6">
                        <Button variant="hero" size="lg" className="rounded-full px-8 group font-black uppercase text-[10px] tracking-widest">
                          Join This Program
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section for Enrollment */}
        <section className="py-24 bg-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-white text-4xl md:text-5xl font-black mb-8">Siap Memulai Langkahmu?</h2>
            <p className="text-white/40 text-xl font-light mb-12 max-w-2xl mx-auto">
              Proses pendaftaran untuk tahun ajaran 2024/2025 telah dibuka. Pilih spesialisasi Anda sekarang.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button variant="gradient" size="xl" className="rounded-full px-12 h-16 font-black uppercase text-xs tracking-[0.2em] shadow-glow">
                Daftar Online Sekarang
              </Button>
              <Button variant="outline" size="xl" className="rounded-full px-12 h-16 border-white/10 text-white hover:bg-white/5 font-black uppercase text-xs tracking-[0.2em]">
                Download Brosur
              </Button>
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default Program;
