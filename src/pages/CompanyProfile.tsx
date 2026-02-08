import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
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
  ManufacturingStrengthSection,
  MarketPresenceSection,
  ValuedClientsSection,
} from "@/components/company-profile";

const CompanyProfile = () => {
  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement("a");
    link.href = "/Company Profile.docx";
    link.download = "Sultan Cotton & Bandages - Company Profile.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <ManufacturingStrengthSection />
          <MarketPresenceSection />
          <ValuedClientsSection />

          {/* Download Company Profile Section */}
          <section className="py-16 lg:py-20 bg-gradient-to-br from-secondary/50 to-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    {/* Icon */}
                    <div className="shrink-0">
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary to-cyan-600 flex items-center justify-center shadow-lg">
                        <FileText className="w-10 h-10 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center md:text-left flex-1">
                      <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                        Download Company Profile
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Get our complete company profile with detailed information about our products, certifications, and manufacturing capabilities.
                      </p>
                      <motion.button
                        onClick={handleDownload}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <Download className="w-5 h-5" />
                        Download Profile
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default CompanyProfile;
