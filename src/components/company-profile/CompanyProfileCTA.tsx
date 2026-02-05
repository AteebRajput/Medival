import { motion } from "framer-motion";
import { Heart, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CompanyProfileCTA = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-medical-navy via-primary to-medical-navy relative overflow-hidden">
      {/* Animated Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-20 left-[10%] opacity-10"
      >
        <Heart className="w-32 h-32 text-white" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-[10%] opacity-10"
      >
        <Shield className="w-24 h-24 text-white" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Sultan Cotton & Bandages
          </h2>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
            Continues to serve the healthcare sector with integrity, quality, and trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-medical-navy hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-full shadow-2xl"
            >
              <Link to="/contact">
                Partner With Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-full"
            >
              <Link to="/products">
                View Products
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
