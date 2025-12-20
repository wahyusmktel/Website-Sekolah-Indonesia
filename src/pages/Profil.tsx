import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Target, Eye, History, User } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";

const Profil = () => {
  return (
    <>
      <Helmet>
        <title>Profil Sekolah - SMK Nusantara</title>
        <meta name="description" content="Profil lengkap SMK Nusantara: Visi, Misi, Sejarah, dan Sambutan Kepala Sekolah." />
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
                Profil Sekolah
              </h1>
              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                Mengenal lebih dekat SMK Nusantara, sekolah kejuruan unggulan yang berkomitmen mencetak generasi siap kerja
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-2xl p-8 shadow-soft"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Visi</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi lembaga pendidikan kejuruan unggulan yang menghasilkan lulusan berkarakter, kompeten, dan berdaya saing tinggi di tingkat nasional maupun internasional.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-2xl p-8 shadow-soft"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-accent-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Misi</h2>
                <ul className="text-muted-foreground leading-relaxed space-y-3">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">1</span>
                    <span>Menyelenggarakan pendidikan berbasis kompetensi yang sesuai dengan kebutuhan industri</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">2</span>
                    <span>Mengembangkan karakter siswa yang berakhlak mulia dan berdaya saing global</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">3</span>
                    <span>Membangun kemitraan strategis dengan dunia usaha dan industri</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm flex-shrink-0">4</span>
                    <span>Mengoptimalkan penggunaan teknologi dalam pembelajaran</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* History */}
        <section className="py-20 bg-gradient-soft">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                  <History className="w-7 h-7 text-accent-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Sejarah Singkat</h2>
              </div>
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  SMK Nusantara berdiri pada tahun 1995 dengan nama awal STM Nusantara, dimulai dengan hanya 2 program keahlian dan 120 siswa. Seiring berjalannya waktu, sekolah terus berkembang dan bertransformasi.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pada tahun 2005, sekolah berubah nama menjadi SMK Nusantara dan menambah program keahlian baru sesuai dengan perkembangan industri. Hingga saat ini, SMK Nusantara telah memiliki 6 program keahlian dengan lebih dari 1.200 siswa aktif.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Berbagai prestasi telah diraih, mulai dari tingkat kota hingga nasional. Alumni SMK Nusantara telah tersebar di berbagai perusahaan ternama baik dalam maupun luar negeri.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Principal's Message */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
                  <User className="w-7 h-7 text-accent-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Sambutan Kepala Sekolah</h2>
              </div>
              <div className="bg-card rounded-2xl p-8 shadow-soft">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl font-bold text-primary-foreground">DS</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">Dr. Drs. Sugiyanto, M.Pd.</h3>
                    <p className="text-primary mb-4">Kepala SMK Nusantara</p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      "Selamat datang di website resmi SMK Nusantara. Sebagai lembaga pendidikan kejuruan, kami berkomitmen untuk terus mengembangkan kualitas pendidikan yang relevan dengan kebutuhan industri.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Kami percaya bahwa setiap siswa memiliki potensi yang luar biasa. Tugas kami adalah menggali, mengembangkan, dan mengarahkan potensi tersebut agar menjadi bekal mereka dalam menghadapi dunia kerja dan kehidupan."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default Profil;
