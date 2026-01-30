import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { AboutHero } from "@/components/about/AboutHero";
import { CompanyStory } from "@/components/about/CompanyStory";
import { Timeline } from "@/components/about/Timeline";
import { TeamSection } from "@/components/about/TeamSection";
import { ManufacturingProcess } from "@/components/about/ManufacturingProcess";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEOHead
          title="About Us"
          description="Learn about Sultan Bandages - 25+ years of excellence in manufacturing premium medical cotton products. Our commitment to quality, innovation, and healthcare excellence."
          canonical="/about"
          keywords={[
            "about sultan bandages",
            "medical cotton manufacturer",
            "healthcare company history",
            "ISO 13485 manufacturer",
            "medical supplies company",
            "cotton bandage manufacturer",
          ]}
        />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "About Us", url: "/about" },
          ]}
        />
        <Navbar />
        <main>
          <AboutHero />
          <CompanyStory />
          <Timeline />
          <ManufacturingProcess />
          <TeamSection />
          <WhyChooseUs />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;
