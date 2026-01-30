import { useState } from "react";
import { motion } from "framer-motion";
import { Package, ShoppingBag, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  sizes: string[];
  image: string | null;
  inStock: boolean;
  features: string[];
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  // Filter out empty or whitespace-only sizes
  const validSizes = product.sizes.filter((size) => size && size.trim() !== "");
  const [selectedSize, setSelectedSize] = useState(validSizes[0] || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="group h-full"
      >
        <div className="h-full bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-br from-secondary to-muted overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Quick view button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-foreground rounded-full text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
            >
              <Eye className="h-4 w-4" />
              Quick View
            </motion.button>

            {/* Stock badge */}
            {!product.inStock && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <Badge variant="secondary" className="shrink-0 text-xs">
                {product.category}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Sizes */}
            {validSizes.length > 0 && (
              <div className="mb-4">
                <span className="text-xs text-muted-foreground block mb-2">Available Sizes:</span>
                <div className="flex flex-wrap gap-1.5">
                  {validSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-2.5 py-1 text-xs rounded-md border transition-all",
                        selectedSize === size
                          ? "bg-primary text-white border-primary"
                          : "bg-muted border-border text-foreground hover:border-primary/50"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Action */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <span className="text-xs text-muted-foreground">Starting from</span>
                <div className="text-2xl font-bold text-primary font-heading">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              <Button
                size="sm"
                disabled={!product.inStock}
                className="bg-gradient-medical hover:opacity-90 text-white"
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                Inquire
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Product Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">{product.name}</DialogTitle>
            <DialogDescription>{product.category}</DialogDescription>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Image */}
            <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-xl overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-24 w-24 text-muted-foreground/30" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-4">
              <p className="text-muted-foreground">{product.description}</p>

              {/* Features */}
              <div>
                <h4 className="font-medium text-foreground mb-2">Features:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sizes */}
              {validSizes.length > 0 && (
                <div>
                  <h4 className="font-medium text-foreground mb-2">Available Sizes:</h4>
                  <div className="flex flex-wrap gap-2">
                    {validSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "px-3 py-1.5 text-sm rounded-lg border transition-all",
                          selectedSize === size
                            ? "bg-primary text-white border-primary"
                            : "bg-muted border-border text-foreground hover:border-primary/50"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">Price</span>
                    <div className="text-3xl font-bold text-primary font-heading">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                  <Button
                    size="lg"
                    disabled={!product.inStock}
                    className="bg-gradient-medical hover:opacity-90 text-white"
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Request Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
