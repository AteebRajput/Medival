import { useState, useEffect, useRef } from "react";
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
  ShoppingCart,
  ZoomIn,
  Sparkles,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";

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

// Flying cart animation component
const FlyingProduct = ({ 
  show, 
  productImage, 
  onComplete 
}: { 
  show: boolean; 
  productImage: string | null;
  onComplete: () => void;
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete,9000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ 
            scale: 1, 
            opacity: 1,
            x: 0,
            y: 0,
          }}
          animate={{ 
            scale: 0.2, 
            opacity: 0,
            x: window.innerWidth - 100,
            y: window.innerHeight - 100,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed z-[100] w-20 h-20 rounded-2xl overflow-hidden shadow-2xl pointer-events-none"
          style={{ 
            top: '50%', 
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {productImage ? (
            <img src={productImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-primary/20 flex items-center justify-center">
              <Package className="w-8 h-8 text-primary" />
            </div>
          )}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            className="absolute inset-0 bg-primary/30 flex items-center justify-center"
          >
            <ShoppingCart className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLightboxOpen, setIsImageLightboxOpen] = useState(false);
  const [hoveredSizeIndex, setHoveredSizeIndex] = useState<number | null>(null);
  const [defaultSizeIndex] = useState(0);
  const [showFlyingProduct, setShowFlyingProduct] = useState(false);
  const { addToCart } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);

  // Reset hover state when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      setHoveredSizeIndex(null);
    }
  }, [isModalOpen]);

  const getDisplayedPriceIndex = () => {
    return hoveredSizeIndex !== null ? hoveredSizeIndex : defaultSizeIndex;
  };

  const handleAddToCart = (e: React.MouseEvent, sizeIndex: number) => {
    e.stopPropagation();
    const size = product.sizes[sizeIndex];
    
    // Show flying animation
    setShowFlyingProduct(true);
    
    // Add to cart
    addToCart({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      size: size.size,
      price: size.price,
    });
  };

  return (
    <>
      {/* Flying Product Animation */}
      <FlyingProduct 
        show={showFlyingProduct} 
        productImage={product.image}
        onComplete={() => setShowFlyingProduct(false)}
      />

      {/* Enhanced Product Card */}
      <motion.div
        ref={cardRef}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="group h-full cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-full bg-card rounded-3xl border border-border overflow-hidden shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-500 flex flex-col relative">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-br from-secondary via-muted to-secondary overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-24 w-24 text-muted-foreground/20" />
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category badge - Top left */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-white/95 text-foreground backdrop-blur-sm shadow-lg px-3 py-1 text-xs font-semibold">
                {product.category}
              </Badge>
            </div>

            {/* Status badge - Top right */}
            {product.comingSoon ? (
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg animate-pulse px-3 py-1">
                <Sparkles className="w-3 h-3 mr-1" />
                Coming Soon
              </Badge>
            ) : !product.inStock && (
              <Badge variant="destructive" className="absolute top-4 right-4 shadow-lg">
                Out of Stock
              </Badge>
            )}

            {/* Quick view button - appears on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <motion.div
                initial={{ scale: 0.8, y: 10 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-5 py-3 bg-white/95 backdrop-blur-sm rounded-full shadow-xl"
              >
                <Eye className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Quick View</span>
              </motion.div>
            </div>

            {/* Price preview - bottom of image */}
            <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between">
                <span className="text-white/80 text-sm">{product.sizes.length} sizes available</span>
                <span className="text-white font-bold">
                  From Rs. {Math.min(...product.sizes.map(s => s.price))}
                </span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-5 flex-1 flex flex-col relative z-10">
            {/* Rating placeholder */}
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs text-muted-foreground ml-1">(5.0)</span>
            </div>

            {/* Product Name */}
            <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 flex-1">
              {product.name}
            </h3>

            {/* Quick info */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Clock className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{product.shelfLife}</span>
            </div>

            {/* CTA Button */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-5"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {isImageLightboxOpen && product.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
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

      {/* Product Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-5xl bg-card border-border p-0 overflow-hidden h-[90vh] max-h-[90vh] rounded-3xl">
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2 h-full">
            {/* Image Section - Fixed/Sticky */}
            <div 
              className="relative bg-gradient-to-br from-secondary to-muted md:sticky md:top-0 md:h-[90vh] cursor-pointer group"
              onClick={() => product.image && setIsImageLightboxOpen(true)}
            >
              {product.image ? (
                <>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                      <ZoomIn className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-32 w-32 text-muted-foreground/30" />
                </div>
              )}
              <Badge className="absolute top-4 left-4 bg-white/90 text-foreground shadow-lg">
                {product.category}
              </Badge>
              {product.comingSoon && (
                <Badge className="absolute top-4 right-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Coming Soon
                </Badge>
              )}
            </div>

            {/* Details Section - Scrollable */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[90vh]">
              {/* Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(5.0) Premium Quality</span>
              </div>

              {/* Product Name */}
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                  {product.name}
                </h2>
                {product.comingSoon ? (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                    Coming Soon
                  </Badge>
                ) : (
                  <Badge variant={product.inStock ? "default" : "destructive"} className={product.inStock ? "bg-green-500/10 text-green-600 border-green-500/20" : ""}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                )}
              </div>

              {/* Sizes with Prices */}
              <div className="bg-secondary/30 rounded-2xl p-5">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Select Size & Add to Cart
                </h4>
                <div className="space-y-2">
                  {product.sizes.map((item, index) => (
                    <motion.div
                      key={index}
                      onMouseEnter={() => setHoveredSizeIndex(index)}
                      onMouseLeave={() => setHoveredSizeIndex(null)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 ${
                        getDisplayedPriceIndex() === index
                          ? 'bg-primary/10 border-2 border-primary/40 shadow-sm' 
                          : 'bg-card border-2 border-transparent hover:border-primary/20'
                      }`}
                    >
                      <span className="text-sm font-semibold text-foreground">{item.size}</span>
                      
                      <div className="flex items-center gap-4">
                        {/* Price */}
                        <AnimatePresence mode="wait">
                          {getDisplayedPriceIndex() === index ? (
                            <motion.span
                              key="price"
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.15 }}
                              className="text-base font-bold text-primary"
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
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Add to Cart button */}
                        {!product.comingSoon && product.inStock && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleAddToCart(e, index)}
                            className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Product Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                {/* Shelf Life */}
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                  <Clock className="h-5 w-5 text-blue-500 mb-2" />
                  <h4 className="font-semibold text-foreground text-sm mb-1">Shelf Life</h4>
                  <p className="text-xs text-muted-foreground">{product.shelfLife}</p>
                </div>

                {/* Storage Condition */}
                <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                  <Thermometer className="h-5 w-5 text-green-500 mb-2" />
                  <h4 className="font-semibold text-foreground text-sm mb-1">Storage</h4>
                  <p className="text-xs text-muted-foreground">{product.storageCondition}</p>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-secondary/50 rounded-xl border border-border/50">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">Description</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                  </div>
                </div>
              </div>

              {/* Precautions */}
              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">Precautions</h4>
                    <p className="text-sm text-muted-foreground">{product.precautions}</p>
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
                    <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground p-2 bg-secondary/30 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-cyan-500 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {!product.comingSoon && product.inStock && (
                <div className="pt-4 border-t border-border">
                  <Button
                    onClick={(e) => handleAddToCart(e, 0)}
                    size="lg"
                    className="w-full bg-gradient-to-r from-primary to-cyan-600 hover:from-primary/90 hover:to-cyan-600/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 py-6 rounded-xl"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart - {product.sizes[0].size}
                  </Button>
                </div>
              )}

              {product.comingSoon && (
                <div className="pt-4 border-t border-border">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white shadow-xl py-6 rounded-xl"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Get Notified When Available
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
