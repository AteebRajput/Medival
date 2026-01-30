import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download, Calendar, Building2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Certificate {
  id: string;
  name: string;
  category: string;
  issueDate: string;
  expiryDate: string;
  issuingBody: string;
  image: string | string[] | null;
  description: string;
}

interface CertificateLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  certificates: Certificate[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const CertificateLightbox = ({
  isOpen,
  onClose,
  certificates,
  currentIndex,
  onNavigate,
}: CertificateLightboxProps) => {
  const current = certificates[currentIndex];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when certificate changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentIndex]);

  // Get images array for current certificate
  const images = current?.image 
    ? (Array.isArray(current.image) ? current.image : [current.image])
    : [];
  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex] || null;

  const goNextCertificate = () => {
    onNavigate((currentIndex + 1) % certificates.length);
  };

  const goPrevCertificate = () => {
    onNavigate((currentIndex - 1 + certificates.length) % certificates.length);
  };

  const goNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!current) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative z-10 w-full max-w-5xl mx-4 max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card rounded-2xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2">
                {/* Image Side */}
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[600px] bg-gradient-to-br from-secondary to-muted">
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={`${current.name} - Page ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain p-8"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Award className="h-32 w-32 text-primary/30 mb-4" />
                      <span className="text-muted-foreground">Certificate Preview</span>
                    </div>
                  )}

                  {/* Image Navigation Arrows (for multiple images in same certificate) */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={goPrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg transition-colors"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={goNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg transition-colors"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}

                  {/* Image Counter (for multiple images) */}
                  {hasMultipleImages && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-primary text-white text-sm rounded-full">
                      Page {currentImageIndex + 1} of {images.length}
                    </div>
                  )}

                  {/* Certificate Counter */}
                  {certificates.length > 1 && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/50 text-white text-sm rounded-full">
                      Certificate {currentIndex + 1} / {certificates.length}
                    </div>
                  )}
                </div>

                {/* Details Side */}
                <div className="p-8 lg:p-10 flex flex-col">
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted/80 text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Category */}
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium w-fit mb-4">
                    {current.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
                    {current.name}
                  </h2>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {current.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block">Issuing Body</span>
                        <span className="font-medium text-foreground">{current.issuingBody}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block">Issue Date</span>
                        <span className="font-medium text-foreground">{current.issueDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground block">Valid Until</span>
                        <span className="font-medium text-foreground">{current.expiryDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-auto space-y-3">
                    <Button className="w-full bg-gradient-medical hover:opacity-90 text-white">
                      <Download className="h-5 w-5 mr-2" />
                      Download Certificate
                    </Button>
                    
                    {/* Certificate Navigation */}
                    {certificates.length > 1 && (
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={goPrevCertificate}
                        >
                          <ChevronLeft className="h-4 w-4 mr-1" />
                          Prev Certificate
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={goNextCertificate}
                        >
                          Next Certificate
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
