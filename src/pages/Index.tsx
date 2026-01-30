import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { TrademarkSection } from "@/components/home/TrademarkSection";
import { VisionMissionSection } from "@/components/home/VisionMissionSection";
import { WhatWeDoSection } from "@/components/home/WhatWeDoSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <SEOHead
          title="Premium Medical Cotton Products Manufacturer"
          description="Leading manufacturer of medical cotton products including bandages, gauze pads, cotton wool, and crepe bandages. ISO 13485 certified with 25+ years of excellence. Trusted by hospitals worldwide."
          canonical="/"
          keywords={[
            "medical cotton",
            "bandages",
            "gauze pads",
            "cotton wool",
            "crepe bandages",
            "medical supplies",
            "healthcare products",
            "wound care",
            "surgical dressings",
            "ISO 13485",
          ]}
        />
        <OrganizationSchema />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <TrademarkSection />
          <VisionMissionSection />
          <WhatWeDoSection />
          <ClientsSection />
          <AchievementsSection />
          <TestimonialsSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
