import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import {
  CompanyProfileHero,
  AboutUsSection,
  ProductRangeSection,
  CertificationsSection,
  MarketPresenceSection,
  ValuedClientsSection,
} from "@/components/company-profile";

const CompanyProfile = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEOHead
          title="Company Profile - Sultan Cotton & Bandages"
          description="Trusted medical supplies manufacturer in Pakistan. Over 20 years of excellence in producing high-quality cotton bandages, gauze, and medical disposables."
          canonical="/company-profile"
          keywords={[
            "medical supplies manufacturer Pakistan",
            "cotton bandages manufacturer",
            "hospital supplies",
            "medical disposables",
            "GMP certified medical products",
          ]}
        />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Company Profile", url: "/company-profile" },
          ]}
        />
        <Navbar />
        
        <main className="overflow-hidden">
          <CompanyProfileHero />
          <AboutUsSection />
          <ProductRangeSection />
          <CertificationsSection />
          <MarketPresenceSection />
          <ValuedClientsSection />
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default CompanyProfile;
