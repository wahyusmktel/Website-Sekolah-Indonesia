import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, MessageCircle, Calendar, CreditCard,
  Sparkles, Zap, Trophy, FileText, BadgeCheck,
  ChevronRight, ArrowUpRight, HelpCircle, Rocket, ShieldCheck, Wallet, Info
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import apiClient from "@/lib/api-client";
import { useSiteSettings } from "@/hooks/use-site-settings";

// Icon mapping for dynamic content
const iconMap: any = {
  Trophy, Zap, ShieldCheck, Rocket, FileText, Wallet, Info, CheckCircle2
};

const PPDB = () => {
  const [ppdbData, setPpdbData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { data: settings } = useSiteSettings();
  const schoolName = settings?.school_name || "SMK Nusantara";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/ppdb-info");
        setPpdbData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching PPDB info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center bg-foreground">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        </div>
      </PublicLayout>
    );
  }

  // Prevent crash if data is empty object
  const data = ppdbData || {};
  if (!data.academic_year) return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center bg-foreground text-white">
        <p>Belum ada informasi PPDB.</p>
      </div>
    </PublicLayout>
  );

  return (
    <>
      <Helmet>
        <title>PPDB {ppdbData.academic_year} - {schoolName}</title>
        <meta name="description" content={ppdbData.description} />
      </Helmet>
      <PublicLayout>
        <div className="relative">

          {/* 1. ULTRA MODERN HERO */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground py-32">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.05]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-12"
                >
                  <Rocket className="w-4 h-4 text-primary animate-bounce" />
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">
                    Enrollment Now {ppdbData.is_active ? "Open" : "Closed"} — <span className="text-primary italic">Batch {ppdbData.academic_year}</span>
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-12"
                >
                  ENGINEER YOUR <br />
                  <span className="text-primary italic">FUTURE.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-white/50 text-xl md:text-2xl font-light max-w-2xl mx-auto mb-16 leading-relaxed"
                >
                  {ppdbData.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                  {ppdbData.is_active ? (
                    <Button size="xl" variant="hero" className="rounded-full px-12 h-20 group text-xs font-black uppercase tracking-widest shadow-glow" asChild>
                      <a href={ppdbData.registration_link} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-5 h-5 mr-3" />
                        Daftar via WhatsApp Sekarang
                        <ArrowUpRight className="w-4 h-4 ml-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </Button>
                  ) : (
                    <Button size="xl" variant="hero" disabled className="rounded-full px-12 h-20 group text-xs font-black uppercase tracking-widest shadow-none bg-gray-600 opacity-50 cursor-not-allowed">
                      Pendaftaran Ditutup
                    </Button>
                  )}

                  <Button size="xl" variant="hero-outline" className="rounded-full px-12 h-20 text-xs font-black uppercase tracking-widest border-white/20 hover:bg-white/10" asChild>
                    <Link to="/kontak">Panduan Pendaftaran</Link>
                  </Button>
                </motion.div>

                {/* Status Badge Floating */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-20 flex flex-wrap justify-center gap-12"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-white text-4xl font-black mb-1">12+</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Industry Partners</span>
                  </div>
                  <div className="w-px h-12 bg-white/10 hidden sm:block" />
                  <div className="flex flex-col items-center">
                    <span className="text-white text-4xl font-black mb-1">500+</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Annual Quota</span>
                  </div>
                  <div className="w-px h-12 bg-white/10 hidden sm:block" />
                  <div className="flex flex-col items-center">
                    <span className="text-white text-4xl font-black mb-1">98%</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Alumni Placement</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 text-white">
              <ChevronRight className="rotate-90 w-8 h-8" />
            </div>
          </section>

          {/* 2. ADMISSION PATHWAYS */}
          <section className="py-32 relative overflow-hidden bg-white dark:bg-foreground/[0.02]">
            <div className="container mx-auto px-4">
              <div className="text-center mb-24">
                <Badge variant="outline" className="mb-4 px-6 py-2 rounded-full border-primary/20 text-primary font-black uppercase tracking-widest text-[10px]">
                  How to Enter
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Jalur Pendaftaran <br /> <span className="text-primary italic">Batch {ppdbData.academic_year}</span></h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {(ppdbData.admission_pathways || []).map((path: any, index: number) => {
                  const Icon = iconMap[path.icon] || Zap;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group p-12 rounded-[3.5rem] bg-white dark:bg-foreground/5 border border-border hover:border-primary/40 transition-all duration-500 shadow-soft hover:shadow-glow relative overflow-hidden"
                    >
                      <div className={`w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter italic">{path.title}</h3>
                      <p className="text-muted-foreground font-light text-lg leading-relaxed mb-8">
                        {path.description}
                      </p>
                      <div className="pt-8 border-t border-border flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{path.benefit}</span>
                        <div className="w-10 h-10 rounded-full bg-foreground/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* 3. INTERACTIVE TIMELINE */}
          <section className="py-32 bg-foreground relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col lg:flex-row items-center justify-between mb-24 gap-12 text-center lg:text-left">
                <div>
                  <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4 block">Strategic Roadmap</span>
                  <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">Timeline Seleksi <br /> <span className="text-primary italic">PPDB {ppdbData.academic_year?.split('/')[0]}</span></h2>
                </div>
                <div className="max-w-md">
                  <p className="text-white/40 text-lg font-light leading-relaxed">
                    Perhatikan setiap tahapan penting untuk memastikan Anda tidak melewatkan momentum bergabung dengan {schoolName}.
                  </p>
                </div>
              </div>

              <div className="max-w-5xl mx-auto">
                <div className="relative space-y-12">
                  <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />

                  {(ppdbData.timeline || []).map((item: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className={`relative flex flex-col md:flex-row gap-12 items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    >
                      <div className="flex-1 w-full text-center md:text-right">
                        {index % 2 === 0 ? (
                          <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 hover:border-primary/50 transition-colors group">
                            <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-4 block">{item.date}</span>
                            <h3 className="text-2xl font-black text-white mb-4 italic group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-white/40 font-light leading-relaxed">{item.description}</p>
                          </div>
                        ) : <div className="hidden md:block" />}
                      </div>

                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-2xl shadow-glow rotate-45 group-hover:rotate-[225deg] transition-transform duration-700">
                          <div className="-rotate-45">{item.step || index + 1}</div>
                        </div>
                      </div>

                      <div className="flex-1 w-full text-center md:text-left">
                        {index % 2 !== 0 ? (
                          <div className="p-8 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 hover:border-primary/50 transition-colors group">
                            <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-4 block">{item.date}</span>
                            <h3 className="text-2xl font-black text-white mb-4 italic group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-white/40 font-light leading-relaxed">{item.description}</p>
                          </div>
                        ) : <div className="hidden md:block" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 4. DOCUMENTS CHECKLIST */}
          <section className="py-32 bg-white dark:bg-foreground/[0.04]">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="mb-12">
                    <div className="flex items-center gap-3 text-primary text-xs font-black uppercase tracking-widest mb-6">
                      <FileText className="w-5 h-5" />
                      Pre-Registration Requirements
                    </div>
                    <h2 className="text-5xl font-black text-foreground leading-[1.1] tracking-tighter mb-8">Dokumen Wajib <br /> <span className="text-primary italic">Persiapkan Sekarang.</span></h2>
                    <p className="text-muted-foreground text-xl font-light leading-relaxed">
                      Pastikan Anda menyiapkan fisik dan salinan digital dari dokumen berikut untuk mempercepat proses verifikasi data pendaftaran.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {(ppdbData.required_documents || []).map((doc: any, i: number) => (
                      <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-foreground/5 dark:bg-white/5 border border-border group hover:bg-foreground hover:text-white transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-white group-hover:text-primary transition-colors font-bold text-xs">
                            0{i + 1}
                          </div>
                          <span className="font-bold tracking-tight">{doc.title}</span>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${doc.status === 'Wajib' ? 'bg-primary/20 text-primary group-hover:bg-white group-hover:text-primary' : 'bg-foreground/10 text-muted-foreground group-hover:bg-white/10 group-hover:text-white/50'}`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative group">
                    <img
                      src="https://images.unsplash.com/photo-1523050335456-c3cc73c68326?auto=format&fit=crop&q=80&w=1200"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
                      alt="Student success"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent opacity-60" />

                    <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20">
                      <BadgeCheck className="w-12 h-12 text-primary mb-6 animate-pulse" />
                      <h4 className="text-2xl font-black text-white mb-2 italic">Standard Industri Bergaransi</h4>
                      <p className="text-white/60 font-light text-sm italic">"Kurikulum kami dirancang bersama Top 10 Perusahaan Teknologi Indonesia."</p>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                </motion.div>
              </div>
            </div>
          </section>

          {/* 5. FEE TRANSPARENCY */}
          <section className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-24">
                  <span className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-4 block">Financial Insight</span>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight italic">Transparansi Investasi <br /> <span className="text-primary italic">Pendidikan</span></h2>
                </div>

                <div className="bg-foreground rounded-[4rem] overflow-hidden shadow-elevated border border-white/5 relative">
                  <div className="p-12 lg:p-16">
                    <div className="flex items-center gap-4 mb-12">
                      <Wallet className="w-8 h-8 text-primary" />
                      <h3 className="text-2xl font-black text-white italic">Breakdown Alokasi Tahun Pertama</h3>
                    </div>

                    <div className="grid gap-6 mb-16">
                      {(ppdbData.fees || []).map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <span className="text-white/70 font-medium">{item.item}</span>
                          </div>
                          <span className="text-white font-black text-xl tracking-tighter">
                            Rp <span className="text-primary">{item.biaya.toLocaleString('id-ID')}</span>
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="p-12 rounded-[2.5rem] bg-primary relative overflow-hidden group shadow-glow">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-2 block">Grand Total Investment</span>
                          <h4 className="text-5xl font-black text-white tracking-tighter items-baseline flex gap-3 leading-none">
                            Rp <span className="text-white">{(ppdbData.fees || []).reduce((sum: number, item: any) => sum + item.biaya, 0).toLocaleString('id-ID')}</span>
                            <span className="text-xs font-black uppercase opacity-60">incl. Tax</span>
                          </h4>
                        </div>
                        <Button size="lg" className="rounded-full bg-white text-primary font-black uppercase tracking-widest text-[10px] h-16 px-10 hover:bg-foreground hover:text-white transition-all shadow-xl" asChild>
                          <a href={ppdbData.registration_link} target="_blank">Tanyakan Cicilan via WA</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex items-start gap-4 p-8 rounded-3xl bg-primary/5 border border-primary/10">
                  <Info className="w-6 h-6 text-primary shrink-0" />
                  <p className="text-sm font-light text-muted-foreground leading-relaxed italic">
                    * Seluruh biaya pendaftaran Batch {ppdbData.academic_year} mendapatkan jaminan akses eksklusif ke program inkubasi startup sekolah dan lab industri 24/7. Pembayaran dapat diangsur hingga 3 kali selama semester ganjil.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 6. FAQ SECTION */}
          <section className="py-32 bg-white dark:bg-foreground/[0.02]">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-16">
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse" />
                <h2 className="text-4xl font-black text-foreground tracking-tight italic">Pertanyaan Umum</h2>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {(ppdbData.faq || []).map((faq: any, i: number) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-[2rem] px-8 bg-white dark:bg-foreground/5 shadow-soft overflow-hidden group">
                    <AccordionTrigger className="text-lg font-black text-left hover:no-underline hover:text-primary transition-colors py-8 uppercase tracking-tighter">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 text-muted-foreground text-lg font-light leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* 7. ULTIMATE CTA */}
          <section className="py-32">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-[4rem] bg-foreground p-16 lg:p-32 overflow-hidden text-center"
              >
                <div className="absolute inset-0 z-0">
                  <div className="absolute top-0 right-0 w-full h-full bg-primary/10 rounded-full blur-[150px] translate-x-1/3" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>

                <div className="relative z-10">
                  <Sparkles className="w-20 h-20 text-primary mx-auto mb-10 animate-pulse" />
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tighter mb-10">
                    SIAP MENJADI <br />
                    <span className="text-primary italic">TEKNOKRAT?</span>
                  </h2>
                  <p className="text-white/40 text-xl font-light max-w-2xl mx-auto mb-16 leading-relaxed">
                    Manfaatkan momentum ini untuk bergabung dengan komunitas inovator masa depan. Pendaftaran gelombang pertama hanya menyisakan beberapa slot lagi.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                    <Button size="xl" variant="hero" className="rounded-full px-16 h-24 group text-sm font-black uppercase tracking-widest shadow-glow w-full sm:w-auto" asChild>
                      <a href={ppdbData.registration_link} target="_blank" rel="noopener noreferrer">
                        Join WhatsApp Group PPDB
                        <ArrowUpRight className="w-5 h-5 ml-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    </Button>
                    <Button size="xl" variant="ghost" className="text-white hover:text-primary font-black uppercase tracking-widest text-xs h-24 px-12" asChild>
                      <Link to="/program">Jelajahi Jurusan</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </PublicLayout>
    </>
  );
};

export default PPDB;
