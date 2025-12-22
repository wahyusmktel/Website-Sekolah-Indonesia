import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Sparkles, MessageSquare, Info, Facebook, Instagram, Youtube, Twitter, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { infoSekolah } from "@/lib/dummy-data";
import { useToast } from "@/hooks/use-toast";

import { useEffect, useState } from "react";
import axios from "axios";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Kontak = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/contact-info");
        setContactInfo(data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  const onSubmit = async (data: ContactForm) => {
    try {
      await axios.post("http://localhost:5000/api/messages", data);
      toast({
        title: "🚀 Pesan Berhasil Terkirim",
        description: "Terima kasih! Tim administrasi kami akan segera menghubungi Anda kembali.",
        className: "bg-foreground text-background border-none rounded-2xl font-bold",
      });
      reset();
    } catch (error) {
      toast({
        title: "❌ Gagal Mengirim Pesan",
        description: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.",
        variant: "destructive",
      });
    }
  };

  if (loading || !contactInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-foreground">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  const contactOptions = [
    {
      icon: MapPin,
      title: "Lokasi Kampus",
      content: contactInfo.address,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: Phone,
      title: "Layanan Telepon",
      content: contactInfo.phone,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      icon: Mail,
      title: "Email Respon",
      content: contactInfo.email,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: "Senin - Jumat: 07:00 - 15:00",
      subContent: "Sabtu: 07:00 - 12:00",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Hubungi Kami - SMK Nusantara</title>
        <meta name="description" content="Pusat bantuan dan layanan informasi SMK Nusantara. Hubungi kami untuk pertanyaan seputar pendaftaran dan kerjasama." />
      </Helmet>
      <PublicLayout>
        {/* Modern Header Section */}
        <section className="relative pt-40 pb-24 overflow-hidden bg-foreground text-white">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest mb-8">
                  <Sparkles className="w-3 h-3" />
                  Connect with Excellence
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                  Mari Membangun <br />
                  <span className="text-primary italic">Koneksi Berharga</span>
                </h1>
                <p className="text-white/40 text-xl font-light max-w-2xl leading-relaxed">
                  Pintu kami selalu terbuka untuk diskusi, kolaborasi, dan pertanyaan Anda. Hubungi kami melalui kanal yang tersedia di bawah ini.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content: Info & Form */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-16 items-start">

              {/* Sidebar: Info Cards & Socials */}
              <div className="lg:col-span-5 space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactOptions.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group p-8 bg-white dark:bg-foreground/5 border border-border rounded-[2.5rem] hover:border-primary/40 transition-all duration-500 shadow-soft hover:shadow-glow"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${option.bg} flex items-center justify-center ${option.color} mb-6 group-hover:scale-110 transition-transform`}>
                        <option.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-black uppercase tracking-widest text-[10px] text-muted-foreground mb-4">{option.title}</h3>
                      <p className="text-foreground font-bold leading-relaxed">{option.content}</p>
                      {option.subContent && <p className="text-muted-foreground text-sm font-medium mt-1">{option.subContent}</p>}
                    </motion.div>
                  ))}
                </div>

                <div className="p-10 bg-foreground rounded-[3.5rem] text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-8">Media Sosial Kami</h4>
                  <p className="text-white/40 text-sm font-light leading-relaxed mb-8 italic">
                    "Ikuti dokumentasi harian dan update terbaru kami melalui platform media sosial resmi SMK Nusantara."
                  </p>
                  <div className="flex gap-4">
                    {[
                      { icon: Facebook, href: contactInfo.facebook_url },
                      { icon: Instagram, href: contactInfo.instagram_url },
                      { icon: Youtube, href: contactInfo.youtube_url },
                      { icon: Twitter, href: contactInfo.twitter_url },
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 hover:bg-white/10 transition-all transform hover:-translate-y-2"
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white dark:bg-foreground/5 p-12 lg:p-16 rounded-[4rem] border border-border shadow-elevated"
                >
                  <div className="mb-12">
                    <div className="flex items-center gap-3 text-primary text-xs font-black uppercase tracking-widest mb-4">
                      <MessageSquare className="w-4 h-4" />
                      Direct Message
                    </div>
                    <h2 className="text-4xl font-black text-foreground tracking-tight">Ketik Pesan Anda</h2>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Nama Lengkap</label>
                        <Input
                          {...register("name", { required: "Nama wajib diisi" })}
                          placeholder="Ex: Adrian Nusantara"
                          className="h-16 rounded-2xl bg-foreground/5 border-none dark:bg-white/5 px-8 font-medium focus-visible:ring-primary/20 text-lg"
                        />
                        {errors.name && <p className="text-destructive text-[10px] font-bold uppercase ml-2">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Aktif</label>
                        <Input
                          {...register("email", {
                            required: "Email wajib diisi",
                            pattern: { value: /^\S+@\S+$/i, message: "Email tidak valid" }
                          })}
                          type="email"
                          placeholder="Ex: hello@nusantara.id"
                          className="h-16 rounded-2xl bg-foreground/5 border-none dark:bg-white/5 px-8 font-medium focus-visible:ring-primary/20 text-lg"
                        />
                        {errors.email && <p className="text-destructive text-[10px] font-bold uppercase ml-2">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Subjek Pesan</label>
                      <Input
                        {...register("subject", { required: "Subjek wajib diisi" })}
                        placeholder="Apa yang ingin Anda Diskusikan?"
                        className="h-16 rounded-2xl bg-foreground/5 border-none dark:bg-white/5 px-8 font-medium focus-visible:ring-primary/20 text-lg"
                      />
                      {errors.subject && <p className="text-destructive text-[10px] font-bold uppercase ml-2">{errors.subject.message}</p>}
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Pesan Menyeluruh</label>
                      <Textarea
                        {...register("message", { required: "Pesan wajib diisi" })}
                        placeholder="Tuliskan detail pertanyaan atau masukan Anda di sini..."
                        className="min-h-[200px] rounded-[2rem] bg-foreground/5 border-none dark:bg-white/5 p-8 font-medium focus-visible:ring-primary/20 text-lg resize-none"
                      />
                      {errors.message && <p className="text-destructive text-[10px] font-bold uppercase ml-2">{errors.message.message}</p>}
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        variant="gradient"
                        size="xl"
                        className="w-full h-20 rounded-3xl font-black uppercase tracking-widest text-xs group shadow-glow"
                      >
                        <span className="mr-3">Transmit Message</span>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                          <Send className="w-4 h-4" />
                        </div>
                      </Button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Styled Integrated Map Section */}
        <section className="pb-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-[4rem] h-[600px] overflow-hidden shadow-elevated border border-border group"
            >
              {/* Overlay elements for more premium look */}
              <div className="absolute inset-0 pointer-events-none border-[20px] border-white/50 dark:border-foreground/50 z-10 rounded-[4rem]" />

              <div className="absolute top-12 left-12 z-20 max-w-sm">
                <div className="p-8 bg-white/90 dark:bg-foreground/90 backdrop-blur-md rounded-[2.5rem] shadow-glow border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h4 className="font-black uppercase tracking-widest text-xs">Official Location</h4>
                  </div>
                  <p className="text-sm font-light text-muted-foreground mb-4 leading-relaxed">
                    {contactInfo.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-8"
                  >
                    Buka di Google Maps
                  </a>
                </div>
              </div>

              {/* Map Content */}
              <div className="w-full h-full bg-slate-200 dark:bg-slate-900 relative">
                <iframe
                  src={contactInfo.maps_url}
                  className="w-full h-full border-none grayscale contrast-125 opacity-80"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Support Section */}
        <section className="pb-32">
          <div className="container mx-auto px-4">
            <div className="bg-primary/5 rounded-[4rem] p-12 lg:p-24 border border-primary/10 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

              <Info className="w-16 h-16 text-primary mb-8 animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight tracking-tight">Butuh Informasi <br /> Lebih Cepat?</h2>
              <p className="text-muted-foreground text-xl font-light mb-12 max-w-2xl">
                Jangan biarkan keraguan menghambat langkah Anda. Tim admin kami siap menjawab pertanyaan teknis maupun umum dengan respons kilat.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Button variant="hero" size="xl" className="rounded-full px-12 group">
                  FAQ & Berita
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="xl" className="rounded-full px-12 border-primary/20 text-primary hover:bg-primary/5">
                  Alur Pendaftaran
                </Button>
              </div>
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default Kontak;
