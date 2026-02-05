import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  Eye, 
  Clock, 
  Thermometer, 
  AlertTriangle, 
  FileText,
  X,
  Check,
  ShoppingBag,
  ZoomIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

interface ProductSize {
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  sizes: ProductSize[];
  image: string | null;
  inStock: boolean;
  features: string[];
  shelfLife: string;
  storageCondition: string;
  precautions: string;
  comingSoon?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLightboxOpen, setIsImageLightboxOpen] = useState(false);
  const [hoveredSizeIndex, setHoveredSizeIndex] = useState<number | null>(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(null);

  const handleSizeInteraction = (index: number) => {
    setSelectedSizeIndex(selectedSizeIndex === index ? null : index);
  };

  const isPriceVisible = (index: number) => {
    return hoveredSizeIndex === index || selectedSizeIndex === index;
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group h-full"
      >
        <div className="h-full bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col">
          {/* Product Image - Clickable to enlarge */}
          <div 
            className="relative aspect-[4/3] bg-gradient-to-br from-secondary to-muted overflow-hidden cursor-pointer"
            onClick={() => product.image && setIsImageLightboxOpen(true)}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-20 w-20 text-muted-foreground/30" />
              </div>
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Zoom icon on hover */}
            {product.image && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            )}

            {/* Category badge */}
            <Badge className="absolute top-4 left-4 bg-white/90 text-foreground backdrop-blur-sm">
              {product.category}
            </Badge>

            {/* Coming Soon / Stock badge */}
            {product.comingSoon ? (
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 animate-pulse">
                Coming Soon
              </Badge>
            ) : !product.inStock && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="p-5 flex-1 flex flex-col">
            {/* Product Name */}
            <h3 className="font-heading font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>

            {/* Size & Price - Clean display */}
            <div className="mb-4 flex-1">
              <div className="space-y-1.5">
                {product.sizes.slice(0, 4).map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleSizeInteraction(index)}
                    onMouseEnter={() => setHoveredSizeIndex(index)}
                    onMouseLeave={() => setHoveredSizeIndex(null)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      isPriceVisible(index)
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'bg-secondary/50 hover:bg-secondary border border-transparent'
                    }`}
                  >
                    <span className="text-sm font-medium text-foreground">{item.size}</span>
                    <AnimatePresence mode="wait">
                      {isPriceVisible(index) ? (
                        <motion.span
                          key="price"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="text-sm font-bold text-primary"
                        >
                          {product.comingSoon ? "TBA" : `Rs. ${item.price}`}
                        </motion.span>
                      ) : (
                        <motion.div
                          key="dots"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex gap-0.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                {product.sizes.length > 4 && (
                  <div className="text-center py-1">
                    <span className="text-xs text-muted-foreground">+{product.sizes.length - 4} more sizes</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span className="text-xs text-muted-foreground line-clamp-1">{product.shelfLife}</span>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-medical hover:opacity-90 text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Full Details
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {isImageLightboxOpen && product.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
            onClick={() => setIsImageLightboxOpen(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsImageLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
            
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={product.image}
              alt={product.name}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Detail Modal - Fixed left image, scrollable right */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl bg-card border-border p-0 overflow-hidden h-[90vh] max-h-[90vh]">
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2 h-full">
            {/* Image Section - Fixed/Sticky */}
            <div className="relative bg-gradient-to-br from-secondary to-muted md:sticky md:top-0 md:h-[90vh]">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-32 w-32 text-muted-foreground/30" />
                </div>
              )}
              <Badge className="absolute top-4 left-4 bg-white/90 text-foreground">
                {product.category}
              </Badge>
              {product.comingSoon && (
                <Badge className="absolute top-4 right-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  Coming Soon
                </Badge>
              )}
            </div>

            {/* Details Section - Scrollable */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[90vh]">
              {/* Product Name */}
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                  {product.name}
                </h2>
                {product.comingSoon ? (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                    Coming Soon
                  </Badge>
                ) : (
                  <Badge variant={product.inStock ? "default" : "destructive"} className="bg-green-500/10 text-green-600 border-green-500/20">
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                )}
              </div>

              {/* Sizes - Hover/Click to reveal price */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  Available Sizes
                </h4>
                <div className="space-y-2">
                  {product.sizes.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSizeInteraction(index)}
                      onMouseEnter={() => setHoveredSizeIndex(index)}
                      onMouseLeave={() => setHoveredSizeIndex(null)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        isPriceVisible(index)
                          ? 'bg-primary/10 border-2 border-primary/30' 
                          : 'bg-secondary/30 border-2 border-transparent hover:border-primary/10'
                      }`}
                    >
                      <span className="text-sm font-medium text-foreground">{item.size}</span>
                      <AnimatePresence mode="wait">
                        {isPriceVisible(index) ? (
                          <motion.span
                            key="price"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                            className="text-sm font-bold text-primary"
                          >
                            {product.comingSoon ? "TBA" : `Rs. ${item.price}`}
                          </motion.span>
                        ) : (
                          <motion.div
                            key="dots"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-1"
                          >
                            <span className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                            <span className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                            <span className="w-2 h-2 rounded-full bg-muted-foreground/20" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shelf Life */}
              <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">Shelf Life</h4>
                    <p className="text-sm text-muted-foreground uppercase">{product.shelfLife}</p>
                  </div>
                </div>
              </div>

              {/* Storage Condition */}
              <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="flex items-start gap-3">
                  <Thermometer className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">Storage Condition</h4>
                    <p className="text-sm text-muted-foreground uppercase">{product.storageCondition}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-secondary/50 rounded-xl border border-border/50">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground uppercase">{product.description}</p>
                  </div>
                </div>
              </div>

              {/* Precautions */}
              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">Precautions</h4>
                    <p className="text-sm text-muted-foreground uppercase">{product.precautions}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Key Features
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-border">
                <Button
                  asChild
                  size="lg"
                  className={`w-full text-white ${product.comingSoon ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90" : "bg-gradient-medical hover:opacity-90"}`}
                >
                  <Link to="/contact">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    {product.comingSoon ? "Get Notified" : "Request Quote"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
