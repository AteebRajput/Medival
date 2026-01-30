import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactMap } from "@/components/contact/ContactMap";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { Helmet } from "react-helmet-async";

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Sultan Bandages",
  description: "Get in touch with Sultan Bandages for inquiries about medical cotton products, bulk orders, and partnerships.",
  mainEntity: {
    "@type": "Organization",
    name: "Sultan Bandages",
    telephone: "+91-22-4567-8900",
    email: "info@sultanbandages.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Industrial Area, Sector 42",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
  },
};

const Contact = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEOHead
          title="Contact Us"
          description="Get in touch with Sultan Bandages for inquiries about medical cotton products, bulk orders, and partnerships. Our team is ready to assist you."
          canonical="/contact"
          keywords={[
            "contact sultan bandages",
            "medical supplies inquiry",
            "bulk orders",
            "medical cotton supplier",
            "healthcare products contact",
          ]}
        />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Contact Us", url: "/contact" },
          ]}
        />
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(contactPageSchema)}
          </script>
        </Helmet>
        <Navbar />
        <main>
          <ContactHero />
          
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Contact Form */}
                <ContactForm />
                
                {/* Contact Info */}
                <ContactInfo />
              </div>
            </div>
          </section>

          {/* Map Section */}
          <ContactMap />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Contact;
