import { Helmet } from "react-helmet-async";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { KeunggulanSection } from "@/components/sections/KeunggulanSection";
import { SambutanSection } from "@/components/sections/SambutanSection";
import { ProgramSection } from "@/components/sections/ProgramSection";
import { StatistikSection } from "@/components/sections/StatistikSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { TestimoniSection } from "@/components/sections/TestimoniSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SMK Nusantara - Sekolah Menengah Kejuruan Terbaik</title>
        <meta
          name="description"
          content="SMK Nusantara adalah sekolah menengah kejuruan unggulan dengan 6 program keahlian, fasilitas modern, dan kurikulum berbasis industri. Daftar PPDB sekarang!"
        />
      </Helmet>
      <PublicLayout>
        <HeroSection />
        <KeunggulanSection />
        <SambutanSection />
        <ProgramSection />
        <StatistikSection />
        <NewsSection />
        <TestimoniSection />
        <CTASection />
      </PublicLayout>
    </>
  );
};

export default Index;
