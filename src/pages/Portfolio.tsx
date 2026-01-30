import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { MasonryGallery } from "@/components/portfolio/MasonryGallery";
import { ProjectModal } from "@/components/portfolio/ProjectModal";
import { projects, portfolioCategories, galleryImages } from "@/data/portfolio";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEOHead
          title="Portfolio & Case Studies"
          description="Explore our successful partnerships with healthcare institutions worldwide. View case studies featuring hospitals, clinics, and medical facilities using Sultan Bandages products."
          canonical="/portfolio"
          keywords={[
            "medical supplies case studies",
            "hospital partnerships",
            "healthcare projects",
            "medical cotton success stories",
            "hospital supplies portfolio",
          ]}
        />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Portfolio", url: "/portfolio" },
          ]}
        />
        <Navbar />
        <main>
          <PortfolioHero />
          
          {/* Projects Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Our Work
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  Featured <span className="text-gradient">Projects</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore our successful partnerships with healthcare institutions worldwide
                </p>
              </motion.div>

              {/* Category Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                {portfolioCategories.map((category) => (
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

              {/* Projects Grid */}
              <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <ProjectCard
                        project={project}
                        onClick={() => setSelectedProject(project)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="py-16 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Gallery
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  Project <span className="text-gradient">Gallery</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A visual showcase of our products in action across various healthcare settings
                </p>
              </motion.div>

              <MasonryGallery images={galleryImages} />
            </div>
          </section>
        </main>
        <Footer />

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </PageTransition>
  );
};

export default Portfolio;
