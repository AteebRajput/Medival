import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

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

export const FactoryGallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
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
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <ImageIcon className="w-4 h-4" />
            Factory Gallery
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Inside Our <span className="text-gradient">Facility</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Take a visual tour of our manufacturing facility and see how we maintain excellence at every step
          </p>
        </motion.div>

        {/* Gallery Grid - 12 images */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {factoryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => openLightbox(index)}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className={`${index === 0 ? 'aspect-square md:aspect-auto md:h-full min-h-[300px]' : 'aspect-square'} relative overflow-hidden`}>
                <img
                  src={image.src}
                  alt={`Factory Image ${image.id}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <ZoomIn className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Image number badge */}
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">Factory Tour</p>
                  <p className="text-xs text-white/70">Image {image.id} of {factoryImages.length}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
              transition={{ delay: 0.1 }}
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
              className="absolute top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <span className="text-white text-sm font-medium">
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
              className="absolute left-4 md:left-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors group"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:-translate-x-0.5 transition-transform" />
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
              className="absolute right-4 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors group"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:translate-x-0.5 transition-transform" />
            </motion.button>

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative z-40 w-full max-w-5xl mx-4 md:mx-8"
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
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 max-w-[90vw] overflow-x-auto"
            >
              {factoryImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className={`relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden shrink-0 transition-all duration-200 ${
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
    </section>
  );
};
