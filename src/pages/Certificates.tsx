import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { CertificateCard } from "@/components/certificates/CertificateCard";
import { CertificateLightbox } from "@/components/certificates/CertificateLightbox";
import { CertificateHero } from "@/components/certificates/CertificateHero";
import { certificates, certificateCategories } from "@/data/certificates";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<number>(0);

  const filteredCertificates = selectedCategory === "all"
    ? certificates
    : certificates.filter((cert) => cert.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedCertificate(index);
    setLightboxOpen(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEOHead
          title="Certifications & Quality Assurance"
          description="View our comprehensive certifications including ISO 13485, CE Marking, FDA 510(k), and GMP compliance. Ensuring highest quality standards in medical cotton products."
          canonical="/certificates"
          keywords={[
            "ISO 13485 certification",
            "CE marking medical devices",
            "FDA 510k clearance",
            "GMP compliance",
            "medical device certifications",
            "quality assurance medical supplies",
          ]}
        />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Certificates", url: "/certificates" },
          ]}
        />
        <Navbar />
        <main>
          <CertificateHero />
          
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              {/* Category Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                {certificateCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-gradient-medical text-white shadow-medical"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </motion.div>

              {/* Certificates Grid */}
              <motion.div
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredCertificates.map((certificate, index) => (
                    <motion.div
                      key={certificate.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <CertificateCard
                        certificate={certificate}
                        onClick={() => openLightbox(index)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredCertificates.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-xl text-muted-foreground">
                    No certificates found in this category.
                  </p>
                </motion.div>
              )}
            </div>
          </section>
        </main>
        <Footer />

        {/* Lightbox */}
        <CertificateLightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          certificates={filteredCertificates}
          currentIndex={selectedCertificate}
          onNavigate={setSelectedCertificate}
        />
      </div>
    </PageTransition>
  );
};

export default Certificates;
