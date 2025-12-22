import { Helmet } from "react-helmet-async";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { HeroSection } from "@/components/sections/HeroSection";
import { KeunggulanSection } from "@/components/sections/KeunggulanSection";
import { SambutanSection } from "@/components/sections/SambutanSection";
import { ProgramSection } from "@/components/sections/ProgramSection";
import { StatistikSection } from "@/components/sections/StatistikSection";
import { NewsSection } from "@/components/sections/NewsSection";
import { TestimoniSection } from "@/components/sections/TestimoniSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  const { data: settings } = useSiteSettings();
  const schoolName = settings?.school_name || "SMK Nusantara";
  const seoDescription = settings?.seo_description || "Sekolah menengah kejuruan unggulan dengan fasilitas modern.";

  return (
    <>
      <Helmet>
        <title>{schoolName} | Unggul & Berkarakter</title>
        <meta name="description" content={seoDescription} />
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
