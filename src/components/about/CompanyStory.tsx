import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Heart, Target, Eye, X, ZoomIn } from "lucide-react";

const STORY_IMAGE = "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770222861/Gemini_Generated_Image_3bwird3bwird3bwi_1_ewy4gu.png";

export const CompanyStory = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? "hidden" : "auto";
  }, [isLightboxOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLightboxOpen) setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <>
      <section ref={ref} className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img 
                  src={STORY_IMAGE} 
                  alt="Sultan Bandages" 
                  className="w-full h-full aspect-[4/3] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105" 
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -right-8 bg-card rounded-2xl p-6 shadow-xl border border-border"
              >
                <Heart className="h-8 w-8 text-primary mb-2" />
                <div className="text-2xl font-bold text-foreground font-heading">20+</div>
                <p className="text-sm text-muted-foreground">Years of Care</p>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Story
              </span>

              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                A Legacy of <span className="text-gradient">Excellence</span> in Healthcare
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                Established in Pakistan in 2006,<strong className="text-primary"> Sultan Cotton & Bandages </strong> began as a small manufacturing unit dedicated to producing <strong className="text-primary"> DRAP-registered </strong> premium medical supplies, including cotton bandages, cotton wool, crepe bandages, gauze lint, and gauze pads (USP Type IV & BPC). Built on a strong commitment to quality and reliability, our factory has steadily grown to meet the needs of hospitals, clinics, and distributors. 
                </p>
                <p>
                Today, our facility operates with modern machinery, skilled workers, and strict quality controls to ensure consistent, dependable products that meet international standards. Quality, efficiency, and trust remain at the core of everything produced within our factory gates. 
                </p>
              </div>

              {/* Values */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                  <Target className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Our Mission</h4>
                    <p className="text-sm text-muted-foreground">
                      Delivering quality healthcare products globally
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                  <Eye className="h-6 w-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground">Our Vision</h4>
                    <p className="text-sm text-muted-foreground">
                      Leading global medical supplies manufacturer
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              src={STORY_IMAGE}
              alt="Sultan Bandages"
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
