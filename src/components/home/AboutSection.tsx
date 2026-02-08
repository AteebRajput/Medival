import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  "Cotton Bandages",
  "Absorbent Cotton Wool",
  "Gauze Pad BPC",
  "Gauze Pad USP Type",
  "Elasto Crepe Bandage",
  "Gauze Roll",
  "Gauze Lint",
];

const ABOUT_IMAGE = "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769539844/Gemini_Generated_Image_z5onmbz5onmbz5on_n93yq2.jpg";

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!imageRef.current) return;

    gsap.fromTo(
      imageRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

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
      <section 
        ref={sectionRef}
        className="py-24 lg:py-32 bg-background relative overflow-hidden"
        id="about"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/50 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <motion.div
              ref={imageRef}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img 
                  src={ABOUT_IMAGE} 
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

              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-8 -right-8 bg-card rounded-2xl p-6 shadow-xl border border-border"
              >
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary font-heading">20+</span>
                  <p className="text-muted-foreground text-sm mt-1">Years of Excellence</p>
                </div>
              </motion.div>

              {/* Decorative element */}
              <div className="absolute -z-10 -top-6 -left-6 w-full h-full rounded-2xl border-2 border-primary/20" />
            </motion.div>

            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                About Us
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                Leading Manufacturer of{" "}
                <span className="text-gradient">Medical Supplies</span>
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With over 20 years of experience, we have established ourselves as a trusted name in the medical supplies industry. Our commitment to quality, innovation, and customer satisfaction has made us the preferred choice for healthcare professionals worldwide. 
              </p>

              <p className="text-muted-foreground mb-8 leading-relaxed">
              We specialize in manufacturing premium quality cotton bandages and medical dressings, adhering to the highest international standards including ISO, BPC, and USP guidelines. Over the past two decades, we have become one of the <strong> leading suppliers of surgical products in Pakistan and Karachi </strong>, known for consistent quality, reliability, and service excellence. 
              </p>

              {/* Product List */}
              <div className="mb-8">
                <h4 className="font-heading font-semibold text-foreground mb-4">Our Product Range:</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {products.map((product, index) => (
                    <motion.div
                      key={product}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-foreground">{product}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Button asChild size="lg" className="bg-gradient-medical hover:opacity-90 shadow-medical group">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
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
              src={ABOUT_IMAGE}
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
