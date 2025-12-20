import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Code, Network, Palette, Calculator, TrendingUp, FileText, Briefcase, CheckCircle } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { programKeahlian } from "@/lib/dummy-data";

const iconMap: { [key: string]: React.ElementType } = {
  Code,
  Network,
  Palette,
  Calculator,
  TrendingUp,
  FileText,
};

const Program = () => {
  return (
    <>
      <Helmet>
        <title>Program Keahlian - SMK Nusantara</title>
        <meta name="description" content="6 Program keahlian unggulan SMK Nusantara: RPL, TKJ, Multimedia, Akuntansi, Pemasaran, dan Otomatisasi Perkantoran." />
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
                Program Keahlian
              </h1>
              <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
                Temukan program keahlian yang sesuai dengan minat dan bakatmu. Semua program dilengkapi dengan kurikulum berbasis industri.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {programKeahlian.map((program, index) => {
                const Icon = iconMap[program.icon] || Code;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={program.id}
                    id={program.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                  >
                    {/* Image/Icon */}
                    <div className="w-full lg:w-1/2">
                      <div className="aspect-video bg-gradient-primary rounded-2xl relative overflow-hidden shadow-elevated">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-32 h-32 text-primary-foreground/30" />
                        </div>
                        <div className="absolute bottom-6 left-6">
                          <div className="w-16 h-16 rounded-2xl bg-background/20 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="w-8 h-8 text-background" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="w-full lg:w-1/2">
                      <span className="inline-block px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
                        Program #{index + 1}
                      </span>
                      <h2 className="text-3xl font-bold text-foreground mb-4">{program.name}</h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {program.description}
                      </p>

                      {/* Prospects */}
                      <div className="bg-muted rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Briefcase className="w-5 h-5 text-primary" />
                          <h4 className="font-semibold text-foreground">Prospek Karir</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {program.prospects.map((prospect) => (
                            <div key={prospect} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{prospect}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default Program;
