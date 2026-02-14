import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  X,
  ZoomIn,
  Factory,
  Play,
  Sparkles,
  Shield,
  Award,
  Cog,
  Users,
  Package,
  Eye
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

const facilityFeatures = [
  { icon: Cog, label: "Modern Machinery", desc: "State-of-the-art equipment" },
  { icon: Users, label: "Skilled Team", desc: "Expert professionals" },
  { icon: Shield, label: "Quality Control", desc: "Rigorous standards" },
  { icon: Package, label: "Safe Packaging", desc: "Hygienic processing" },
];

const Gallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? factoryImages.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % factoryImages.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") setIsLightboxOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext, isLightboxOpen]);

  // Lightbox body scroll lock
  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? "hidden" : "auto";
  }, [isLightboxOpen]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEOHead
          title="Factory Gallery - Sultan Cotton & Bandages"
          description="Take a virtual tour of our state-of-the-art medical supplies manufacturing facility. See our modern machinery, quality control processes, and production floor."
          canonical="/gallery"
          keywords={["factory tour", "manufacturing facility", "medical supplies production", "quality control"]}
        />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Gallery", url: "/gallery" },
          ]}
        />
        <Navbar />
        
        <main>
          {/* Hero Section */}
          <section className="relative pt-24 pb-32 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img 
                src={factoryImages[0].src} 
                alt="Factory" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-medical-navy/95 via-medical-navy/90 to-medical-navy/95" />
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.1, 0.15, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
              />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
                >
                  <Factory className="w-4 h-4 text-cyan-400" />
                  <span className="text-white/90 text-sm font-medium">Virtual Factory Tour</span>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </motion.div>

                {/* State of the Art Banner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="relative mb-8"
                >
                  {/* Glowing background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 blur-3xl" />
                  
                  {/* Main text container */}
                  <div className="relative">
                    {/* Decorative lines */}
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "60px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-[2px] bg-gradient-to-r from-transparent to-cyan-400"
                      />
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "60px" }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-[2px] bg-gradient-to-l from-transparent to-cyan-400"
                      />
                    </div>

                    {/* State of the Art text */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="relative inline-block"
                    >
                      <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-cyan-400">
                        State of the Art
                      </span>
                    </motion.div>

                    {/* Production Facility - Large text */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 leading-none mt-2"
                    >
                      PRODUCTION
                    </motion.h1>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 leading-none"
                    >
                      FACILITY
                    </motion.h1>

                    {/* Decorative underline */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      className="h-1 w-48 md:w-64 mx-auto mt-4 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"
                    />
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                  Explore where quality medical supplies are crafted with precision, 
                  care, and adherence to international standards.
                </motion.p>

                {/* Stats Row - Enhanced */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="flex flex-wrap justify-center gap-6 md:gap-8"
                >
                  {[
                    { value: "1", label: "State-of-the-Art Facility", icon: Factory },
                    { value: "20+", label: "Years of Excellence", icon: Award },
                    { value: "12+", label: "Gallery Images", icon: Eye },
                  ].map((stat, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative px-6 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
                        <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                        <div className="text-3xl md:text-4xl font-bold text-white font-heading">
                          {stat.value}
                        </div>
                        <div className="text-xs text-white/60 mt-1">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Feature Pills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex flex-wrap justify-center gap-3 mt-12"
              >
                {facilityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="flex items-center gap-2 px-5 py-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-white/90 text-sm font-semibold block">{feature.label}</span>
                      <span className="text-white/50 text-xs">{feature.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
              >
                <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              </motion.div>
            </motion.div>
          </section>

          {/* Video Section */}
          <section className="py-20 lg:py-28 bg-background relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.08),transparent_50%)]" />
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_50%)]" />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-4">
                  <Play className="w-4 h-4 text-primary" />
                  <span className="text-primary text-sm font-medium">Factory Tour Video</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                  Watch Our Production Process
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  See how we manufacture premium quality medical supplies with modern machinery 
                  and strict quality control measures
                </p>
              </motion.div>

              {/* Video Container */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-card border border-border">
                  {/* Video Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-cyan-500/20 to-primary/20 rounded-3xl blur-xl opacity-50" />
                  
                  <div className="relative aspect-video bg-black rounded-3xl overflow-hidden">
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

                {/* Video Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {[
                    { icon: Eye, label: "HD Quality", value: "1080p" },
                    { icon: Factory, label: "Full Tour", value: "Complete" },
                    { icon: Award, label: "Certified", value: "DRAP" },
                    { icon: Shield, label: "Standards", value: "ISO" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-card rounded-2xl border border-border text-center hover:border-primary/30 hover:shadow-md transition-all duration-300"
                    >
                      <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                      <div className="text-sm font-semibold text-foreground">{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section className="py-20 lg:py-28 bg-secondary/30 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-2xl rotate-12 hidden lg:block" />
            <div className="absolute bottom-20 right-10 w-32 h-32 border border-primary/10 rounded-full hidden lg:block" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-primary text-sm font-medium">Photo Gallery</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                  Inside Our Manufacturing Unit
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Browse through our facility images showcasing our production floor, 
                  machinery, quality control labs, and packaging units
                </p>
              </motion.div>

              {/* Gallery Grid - Horizontal flow with varied sizes */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-[200px] md:auto-rows-[250px]">
                <AnimatePresence>
                  {factoryImages.map((image, index) => {
                    // Varied sizes for visual interest - some span 2 rows
                    const isLarge = index === 0 || index === 5 || index === 9;
                    
                    return (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
                        whileHover={{ y: -5 }}
                        onClick={() => openLightbox(index)}
                        className={`relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300 ${
                          isLarge ? 'row-span-2' : ''
                        }`}
                      >
                        {/* Image */}
                        <img
                          src={image.src}
                          alt={`Factory interior ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Hover Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/40 mb-3 shadow-lg"
                          >
                            <ZoomIn className="w-7 h-7 text-white" />
                          </motion.div>
                          <span className="text-white text-sm font-semibold tracking-wide">View Image</span>
                        </div>

                        {/* Corner Badge */}
                        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>

                        {/* Bottom Gradient Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-cyan-500 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Gallery Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12"
              >
                {[
                  { label: "Production Areas", value: "5+" },
                  { label: "Quality Checkpoints", value: "10+" },
                  { label: "Gallery Images", value: "12" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-primary font-heading">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-cyan-600" />
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px)`,
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                    <Factory className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">Schedule a Visit</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                    Want to See It Live?
                  </h2>
                  <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                    Experience our manufacturing excellence firsthand. 
                    Schedule a factory tour and see our quality processes in action.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full shadow-xl hover:shadow-2xl transition-shadow"
                    >
                      <Factory className="w-5 h-5" />
                      Schedule Factory Tour
                    </motion.a>
                    <motion.a
                      href="/contact"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-colors"
                    >
                      Contact Us
                      <ChevronRight className="w-5 h-5" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>
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
              className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl flex items-center justify-center"
              onClick={() => setIsLightboxOpen(false)}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              {/* Counter */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <span className="text-white font-medium">
                  {currentIndex + 1} <span className="text-white/50">of</span> {factoryImages.length}
                </span>
              </motion.div>

              {/* Navigation - Previous */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-6 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </motion.button>

              {/* Navigation - Next */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-6 z-50 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </motion.button>

              {/* Main Image */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-[85vw] max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={factoryImages[currentIndex].src}
                  alt={`Factory image ${currentIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                />
              </motion.div>

              {/* Thumbnails Strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-[90vw] overflow-x-auto"
              >
                {factoryImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                    className={`shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                      currentIndex === index
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black/50 scale-110'
                        : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-12 object-cover"
                    />
                  </button>
                ))}
              </motion.div>

              {/* Keyboard Hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-6 right-6 hidden md:flex items-center gap-3 text-white/40 text-sm"
              >
                <span className="px-2 py-1 rounded bg-white/10 text-xs">←</span>
                <span className="px-2 py-1 rounded bg-white/10 text-xs">→</span>
                <span>to navigate</span>
                <span className="px-2 py-1 rounded bg-white/10 text-xs">ESC</span>
                <span>to close</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
};

export default Gallery;
