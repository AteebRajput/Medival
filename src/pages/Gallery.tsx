import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Image as ImageIcon, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn,
  Factory,
  Camera,
  Film
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const FACTORY_VIDEO_URL = "https://res.cloudinary.com/duo8ezh6a/video/upload/v1770224817/WhatsApp_Video_2026-02-03_at_12.08.59_AM_fgd5ow.mp4";

// Factory images
const factoryImages = [
  { id: 1, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274805/WhatsApp_Image_2026-02-02_at_11.13.49_PM_mijioh.jpg", category: "Production" },
  { id: 2, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274804/WhatsApp_Image_2026-02-02_at_11.13.57_PM_lghckw.jpg", category: "Production" },
  { id: 3, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.14.05_PM_jyf6a3.jpg", category: "Production" },
  { id: 4, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.14.13_PM_zgvgiy.jpg", category: "Machinery" },
  { id: 5, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274804/WhatsApp_Image_2026-02-02_at_11.14.19_PM_rve9oe.jpg", category: "Machinery" },
  { id: 6, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274804/WhatsApp_Image_2026-02-02_at_11.14.25_PM_qytchg.jpg", category: "Machinery" },
  { id: 7, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274804/WhatsApp_Image_2026-02-02_at_11.14.30_PM_b3mhlz.jpg", category: "Production" },
  { id: 8, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274804/WhatsApp_Image_2026-02-02_at_11.14.37_PM_y3diam.jpg", category: "Machinery" },
  { id: 9, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.14.43_PM_ggbrhk.jpg", category: "Machinery" },
  { id: 10, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.14.49_PM_hpoiwg.jpg", category: "Machinery" },
  { id: 11, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.14.59_PM_kh6yfn.jpg", category: "Facility" },
  { id: 12, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.15.06_PM_hdlbsc.jpg", category: "Facility" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Production", "Machinery", "Quality", "Facility"];
  
  const filteredImages = activeFilter === "All" 
    ? factoryImages 
    : factoryImages.filter(img => img.category === activeFilter);

  const openLightbox = (index: number) => {
    const actualIndex = factoryImages.findIndex(img => img.id === filteredImages[index].id);
    setSelectedImage(actualIndex);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => 
        prev === 0 ? factoryImages.length - 1 : (prev as number) - 1
      );
    }
  }, [selectedImage]);

  const goToNext = useCallback(() => {
    if (selectedImage !== null) {
      setSelectedImage((prev) => 
        prev === factoryImages.length - 1 ? 0 : (prev as number) + 1
      );
    }
  }, [selectedImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, goToPrevious, goToNext]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEOHead
          title="Gallery - Sultan Cotton & Bandages"
          description="Explore our state-of-the-art manufacturing facility through photos and videos. See how we produce high-quality medical supplies."
          canonical="/gallery"
          keywords={[
            "factory tour",
            "manufacturing facility",
            "medical supplies production",
            "quality control",
            "Sultan Bandages factory",
          ]}
        />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Gallery", url: "/gallery" },
          ]}
        />
        <Navbar />
        
        <main className="overflow-hidden">
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-medical-navy via-primary to-medical-navy">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/2 w-full h-full"
              >
                <div className="w-full h-full border border-white/10 rounded-full" />
              </motion.div>
              <motion.div
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-1/2 -left-1/2 w-full h-full"
              >
                <div className="w-full h-full border border-white/5 rounded-full" />
              </motion.div>
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            
            {/* Content */}
            <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center pt-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-8 border border-white/20"
                >
                  <Camera className="w-5 h-5" />
                  Visual Tour
                </motion.div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Gallery</span>
                </h1>
                
                <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                  Take a visual journey through our state-of-the-art manufacturing facility
                </p>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                  {[
                    { icon: Factory, value: "50,000+", label: "Sq. Ft. Facility" },
                    { icon: Film, value: "1", label: "Factory Tour Video" },
                    { icon: ImageIcon, value: "12+", label: "Gallery Images" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="flex items-center justify-center mb-2">
                        <stat.icon className="w-6 h-6 text-cyan-400 mr-2" />
                        <span className="text-3xl md:text-4xl font-bold text-white">{stat.value}</span>
                      </div>
                      <span className="text-white/60 text-sm">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </section>

          {/* Video Section */}
          <section className="py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  <Film className="w-4 h-4" />
                  Factory Tour
                </span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  Watch Our <span className="text-gradient">Manufacturing Process</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Experience our production facility in action and see the quality standards we maintain
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
              >
                <div className="relative group">
                  {/* Glowing border effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary via-cyan-500 to-primary rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                  
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50 bg-card">
                    <div className="aspect-video">
                      <video
                        src={FACTORY_VIDEO_URL}
                        controls
                        className="w-full h-full object-cover"
                        poster=""
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="absolute -bottom-6 -right-6 bg-gradient-to-br from-primary to-cyan-500 text-white rounded-2xl p-4 shadow-xl hidden md:block"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                        <Play className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Factory Tour</p>
                        <p className="text-sm text-white/80">HD Quality Video</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section className="py-24 lg:py-32 relative">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  <ImageIcon className="w-4 h-4" />
                  Photo Gallery
                </span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                  Inside Our <span className="text-gradient">Facility</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore our manufacturing environment through these exclusive photos
                </p>
              </motion.div>

              {/* Filter Tabs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === category
                        ? 'bg-gradient-medical text-white shadow-lg shadow-primary/30'
                        : 'bg-secondary hover:bg-secondary/80 text-foreground'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>

              {/* Masonry Grid */}
              <motion.div 
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => openLightbox(index)}
                      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                        index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                      }`}
                    >
                      <div className={`${index % 5 === 0 ? 'aspect-square' : 'aspect-square'} relative overflow-hidden`}>
                        <img
                          src={image.src}
                          alt={`Factory ${image.category} ${image.id}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        
                        {/* Zoom icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <motion.div
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1.1 }}
                            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
                          >
                            <ZoomIn className="w-7 h-7 text-white" />
                          </motion.div>
                        </div>
                        
                        {/* Category badge */}
                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                            {image.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-medical-navy via-primary/90 to-medical-navy relative overflow-hidden">
            <div className="absolute inset-0">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10"
              >
                <div className="w-full h-full border-2 border-white/20 rounded-full" />
                <div className="absolute inset-10 border-2 border-white/15 rounded-full" />
              </motion.div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
                  Want to Visit Our Facility?
                </h2>
                <p className="text-xl text-white/80 mb-10">
                  Schedule a tour of our manufacturing facility and see our production process firsthand
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full shadow-2xl hover:shadow-white/20 transition-shadow"
                >
                  Schedule a Visit
                  <ChevronRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
              
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>

              {/* Image counter */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <span className="text-white font-medium">
                  {selectedImage + 1} / {factoryImages.length}
                </span>
              </motion.div>

              {/* Navigation - Previous */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-4 md:left-8 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors group"
              >
                <ChevronLeft className="w-7 h-7 text-white group-hover:-translate-x-0.5 transition-transform" />
              </motion.button>

              {/* Navigation - Next */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-4 md:right-8 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors group"
              >
                <ChevronRight className="w-7 h-7 text-white group-hover:translate-x-0.5 transition-transform" />
              </motion.button>

              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative z-40 w-full max-w-6xl mx-4 md:mx-8"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    src={factoryImages[selectedImage].src}
                    alt={`Factory Image ${selectedImage + 1}`}
                    className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                  />
                </AnimatePresence>
              </motion.div>

              {/* Thumbnails */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-[90vw] overflow-x-auto"
              >
                {factoryImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(index);
                    }}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden shrink-0 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50 scale-110' 
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Gallery;
