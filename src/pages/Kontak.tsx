import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { infoSekolah } from "@/lib/dummy-data";
import { useToast } from "@/hooks/use-toast";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Kontak = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    console.log(data);
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Kami akan segera merespons pesan Anda.",
    });
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Kontak - SMK Nusantara</title>
        <meta name="description" content="Hubungi SMK Nusantara. Alamat, nomor telepon, email, dan formulir kontak." />
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
                Hubungi Kami
              </h1>
              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                Ada pertanyaan? Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl p-6 shadow-soft"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Alamat</h3>
                  <p className="text-muted-foreground text-sm">{infoSekolah.alamat}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-soft"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Telepon</h3>
                  <p className="text-muted-foreground text-sm">{infoSekolah.telp}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-2xl p-6 shadow-soft"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground text-sm">{infoSekolah.email}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-card rounded-2xl p-6 shadow-soft"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Jam Operasional</h3>
                  <p className="text-muted-foreground text-sm">Senin - Jumat: 07:00 - 15:00</p>
                  <p className="text-muted-foreground text-sm">Sabtu: 07:00 - 12:00</p>
                </motion.div>
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="bg-card rounded-2xl p-8 shadow-soft">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Kirim Pesan</h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
                        <Input
                          {...register("name", { required: "Nama wajib diisi" })}
                          placeholder="Masukkan nama Anda"
                          className="h-12 rounded-xl"
                        />
                        {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <Input
                          {...register("email", { 
                            required: "Email wajib diisi",
                            pattern: { value: /^\S+@\S+$/i, message: "Email tidak valid" }
                          })}
                          type="email"
                          placeholder="Masukkan email Anda"
                          className="h-12 rounded-xl"
                        />
                        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Subjek</label>
                      <Input
                        {...register("subject", { required: "Subjek wajib diisi" })}
                        placeholder="Subjek pesan"
                        className="h-12 rounded-xl"
                      />
                      {errors.subject && <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Pesan</label>
                      <Textarea
                        {...register("message", { required: "Pesan wajib diisi" })}
                        placeholder="Tulis pesan Anda..."
                        className="min-h-[150px] rounded-xl"
                      />
                      {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" variant="gradient" size="lg" className="w-full md:w-auto">
                      <Send className="w-4 h-4 mr-2" />
                      Kirim Pesan
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-muted rounded-2xl h-[400px] flex items-center justify-center shadow-soft"
            >
              <div className="text-center">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Peta Lokasi Sekolah</p>
              </div>
            </motion.div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default Kontak;
