import { motion } from "framer-motion";
import { Package, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const products = [
  { name: "Cotton Bandages", icon: Package },
  { name: "Cotton Wool", icon: Sparkles },
  { name: "Crepe Bandages", icon: Package },
  { name: "Gauze Lint", icon: Sparkles },
  { name: "Gauze Pads (USP Type IV & BPC)", icon: Package },
  { name: "Gauze Roll", icon: Package },
];

export const ProductRangeSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Package className="w-4 h-4" />
            Our Products
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Premium <span className="text-gradient">Product Range</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We manufacture a comprehensive range of medical disposables that meet international quality standards
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-card rounded-2xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-medical flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <product.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Premium quality, internationally certified
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" className="bg-gradient-medical hover:opacity-90 text-white rounded-full px-8">
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
