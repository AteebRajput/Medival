import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Image as ImageIcon, 
  ChevronLeft, 
  ChevronRight, 
  Film,
  Pause,
  X,
  ZoomIn
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { SEOHead } from "@/components/seo/SEOHead";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const FACTORY_VIDEO_URL = "https://res.cloudinary.com/duo8ezh6a/video/upload/v1770224817/WhatsApp_Video_2026-02-03_at_12.08.59_AM_fgd5ow.mp4";

// Factory images
const factoryImages = [
  { id: 1, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274805/WhatsApp_Image_2026-02-02_at_11.13.49_PM_mijioh.jpg" },
  { id: 2, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274804/WhatsApp_Image_2026-02-02_at_11.13.57_PM_lghckw.jpg" },
  { id: 3, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.14.05_PM_jyf6a3.jpg" },
  { id: 4, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.14.13_PM_zgvgiy.jpg" },
  { id: 5, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274804/WhatsApp_Image_2026-02-02_at_11.14.19_PM_rve9oe.jpg" },
  { id: 6, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274804/WhatsApp_Image_2026-02-02_at_11.14.25_PM_qytchg.jpg" },
  { id: 7, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274804/WhatsApp_Image_2026-02-02_at_11.14.30_PM_b3mhlz.jpg" },
  { id: 8, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274804/WhatsApp_Image_2026-02-02_at_11.14.37_PM_y3diam.jpg" },
  { id: 9, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.14.43_PM_ggbrhk.jpg" },
  { id: 10, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.14.49_PM_hpoiwg.jpg" },
  { id: 11, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.14.59_PM_kh6yfn.jpg" },
  { id: 12, src: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770274803/WhatsApp_Image_2026-02-02_at_11.15.06_PM_hdlbsc.jpg" },
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isLightboxOpen) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % factoryImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isLightboxOpen]);

  // Scroll thumbnail into view
  useEffect(() => {
    if (thumbnailRef.current) {
      const thumbnail = thumbnailRef.current.children[currentIndex] as HTMLElement;
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [currentIndex]);

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? factoryImages.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % factoryImages.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape" && isLightboxOpen) setIsLightboxOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext, isLightboxOpen]);

  // Lightbox body scroll lock
  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? "hidden" : "auto";
  }, [isLightboxOpen]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEOHead
          title="Gallery - Sultan Cotton & Bandages"
          description="Explore our state-of-the-art manufacturing facility through photos and videos."
          canonical="/gallery"
          keywords={["factory tour", "manufacturing facility", "medical supplies production"]}
        />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Gallery", url: "/gallery" },
          ]}
        />
        <Navbar />
        
        <main>
          {/* Hero Section - Compact */}
          <section className="relative pt-28 pb-16 bg-gradient-to-br from-medical-navy via-primary to-medical-navy">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
            <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">
                  Our Gallery
                </h1>
                <p className="text-lg text-white/80 max-w-xl mx-auto">
                  Explore our manufacturing facility through videos and images
                </p>
              </motion.div>
            </div>
          </section>

          {/* Video Section - First */}
          <section className="py-16 lg:py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  <Film className="w-4 h-4" />
                  Factory Tour
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  Watch Our <span className="text-gradient">Manufacturing Process</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                  <div className="aspect-video">
                    <video
                      src={FACTORY_VIDEO_URL}
                      controls
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Image Slider Section - After Video */}
          <section className="py-16 lg:py-20 bg-secondary/20">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  <ImageIcon className="w-4 h-4" />
                  Photo Gallery
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  Inside Our <span className="text-gradient">Facility</span>
                </h2>
              </motion.div>

              {/* Main Slider Container */}
              <div className="max-w-5xl mx-auto">
                {/* Slider with Side Previews */}
                <div className="relative flex items-center justify-center gap-4">
                  {/* Previous Button */}
                  <button
                    onClick={goToPrevious}
                    className="hidden md:flex shrink-0 w-12 h-12 rounded-full bg-card border border-border items-center justify-center shadow-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Main Image Area */}
                  <div className="relative flex-1 max-w-4xl">
                    {/* Main Image */}
                    <div 
                      className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-card shadow-2xl cursor-pointer group"
                      onClick={() => setIsLightboxOpen(true)}
                    >
                      <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.img
                          key={currentIndex}
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 },
                          }}
                          src={factoryImages[currentIndex].src}
                          alt={`Factory image ${currentIndex + 1}`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </AnimatePresence>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                            <ZoomIn className="w-7 h-7 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Mobile Navigation */}
                      <button
                        onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                        className="md:hidden absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); goToNext(); }}
                        className="md:hidden absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Counter Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                        <span className="text-white text-sm font-medium">
                          {currentIndex + 1} / {factoryImages.length}
                        </span>
                      </div>

                      {/* Auto-play Toggle */}
                      <button
                        onClick={(e) => { e.stopPropagation(); setIsAutoPlaying(!isAutoPlaying); }}
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                          isAutoPlaying 
                            ? 'bg-primary text-white' 
                            : 'bg-black/50 text-white'
                        }`}
                      >
                        {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Progress Bar */}
                    {isAutoPlaying && (
                      <div className="absolute -bottom-1 left-0 right-0 h-1 bg-border rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3.5, ease: "linear" }}
                          key={currentIndex}
                        />
                      </div>
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={goToNext}
                    className="hidden md:flex shrink-0 w-12 h-12 rounded-full bg-card border border-border items-center justify-center shadow-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Thumbnail Strip */}
                <div 
                  ref={thumbnailRef}
                  className="flex gap-2 mt-6 overflow-x-auto pb-2 px-1 justify-center"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {factoryImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => goToSlide(index)}
                      className={`relative shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                        currentIndex === index
                          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 opacity-100'
                          : 'opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-16 h-12 md:w-20 md:h-14 object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-1.5 mt-4">
                  {factoryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`rounded-full transition-all duration-300 ${
                        currentIndex === index
                          ? 'w-6 h-2 bg-primary'
                          : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 bg-gradient-to-r from-primary to-cyan-600">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
                Want to Visit Our Facility?
              </h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Schedule a tour and see our production process firsthand
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-full shadow-lg"
              >
                Contact Us
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </div>
          </section>
        </main>

        <Footer />

        {/* Fullscreen Lightbox */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
              onClick={() => setIsLightboxOpen(false)}
            >
              {/* Close button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Counter */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10">
                <span className="text-white font-medium">
                  {currentIndex + 1} / {factoryImages.length}
                </span>
              </div>

              {/* Navigation */}
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Main Image */}
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                src={factoryImages[currentIndex].src}
                alt={`Factory image ${currentIndex + 1}`}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Thumbnails */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 rounded-xl bg-white/10 max-w-[90vw] overflow-x-auto">
                {factoryImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={(e) => { e.stopPropagation(); goToSlide(index); }}
                    className={`shrink-0 rounded-md overflow-hidden transition-all duration-200 ${
                      currentIndex === index
                        ? 'ring-2 ring-white scale-105'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-14 h-10 object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Gallery;
