import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, 
  Eye, 
  Clock, 
  Thermometer, 
  AlertTriangle, 
  FileText,
  X,
  Check,
  ShoppingBag
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
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lowestPrice = Math.min(...product.sizes.map(s => s.price));

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group h-full"
      >
        <div className="h-full bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col">
          {/* Product Image */}
          <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary to-muted overflow-hidden">
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

            {/* Quick view button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-white text-foreground rounded-full text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
            >
              <Eye className="h-4 w-4" />
              View Details
            </motion.button>

            {/* Category badge */}
            <Badge className="absolute top-4 left-4 bg-white/90 text-foreground backdrop-blur-sm">
              {product.category}
            </Badge>

            {/* Stock badge */}
            {!product.inStock && (
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

            {/* Size & Price Table */}
            <div className="mb-4 flex-1">
              <div className="bg-secondary/50 rounded-xl overflow-hidden">
                <div className="grid grid-cols-2 gap-px bg-border/50">
                  <div className="bg-primary/10 px-3 py-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">Size</span>
                  </div>
                  <div className="bg-primary/10 px-3 py-2 text-right">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">Price (PKR)</span>
                  </div>
                </div>
                <div className="divide-y divide-border/50">
                  {product.sizes.slice(0, 3).map((item, index) => (
                    <div key={index} className="grid grid-cols-2 gap-px">
                      <div className="bg-card px-3 py-2">
                        <span className="text-sm text-foreground">{item.size}</span>
                      </div>
                      <div className="bg-card px-3 py-2 text-right">
                        <span className="text-sm font-semibold text-primary">Rs. {item.price}</span>
                      </div>
                    </div>
                  ))}
                  {product.sizes.length > 3 && (
                    <div className="bg-card px-3 py-2 text-center">
                      <span className="text-xs text-muted-foreground">+{product.sizes.length - 3} more sizes</span>
                    </div>
                  )}
                </div>
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

      {/* Product Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl bg-card border-border p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Image Section */}
            <div className="relative aspect-square md:aspect-auto md:h-full bg-gradient-to-br from-secondary to-muted">
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
            </div>

            {/* Details Section */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Product Name */}
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                  {product.name}
                </h2>
                <Badge variant={product.inStock ? "default" : "destructive"} className="bg-green-500/10 text-green-600 border-green-500/20">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              {/* Sizes & Pricing Table */}
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  Available Sizes & Pricing
                </h4>
                <div className="bg-secondary/30 rounded-xl overflow-hidden border border-border/50">
                  <div className="grid grid-cols-2 bg-primary/10">
                    <div className="px-4 py-3 border-r border-border/50">
                      <span className="text-sm font-semibold text-primary">Size</span>
                    </div>
                    <div className="px-4 py-3 text-right">
                      <span className="text-sm font-semibold text-primary">Retail Price (PKR)</span>
                    </div>
                  </div>
                  <div className="divide-y divide-border/50">
                    {product.sizes.map((item, index) => (
                      <div key={index} className="grid grid-cols-2 hover:bg-primary/5 transition-colors">
                        <div className="px-4 py-3 border-r border-border/50">
                          <span className="text-sm text-foreground font-medium">{item.size}</span>
                        </div>
                        <div className="px-4 py-3 text-right">
                          <span className="text-sm font-bold text-primary">Rs. {item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  className="w-full bg-gradient-medical hover:opacity-90 text-white"
                >
                  <Link to="/contact">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Request Quote
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
