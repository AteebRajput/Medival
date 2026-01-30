import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Award, 
  Clock, 
  HeartHandshake, 
  Leaf, 
  Globe,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    icon: Shield,
    title: "Uncompromising Quality",
    description: "Every product undergoes 100+ quality checks to ensure it meets the highest medical standards.",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    description: "ISO 9001, ISO 13485, CE marked, and FDA registered - we meet all international standards.",
  },
  {
    icon: Clock,
    title: "Reliable Delivery",
    description: "Our efficient logistics network ensures on-time delivery to healthcare facilities worldwide.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-Centric",
    description: "Dedicated support team available to address your needs and ensure complete satisfaction.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Sustainable manufacturing practices and eco-friendly packaging to protect our planet.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Serving 30+ countries with consistent quality and local support in major markets.",
  },
];

export const WhyChooseUs = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-gradient-to-br from-medical-navy via-primary to-medical-navy text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
            Why MedCotton
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            Why Choose Us
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover what sets us apart as a trusted partner for healthcare institutions worldwide
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className="h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <reason.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm text-white/70">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-white/80 mb-6">
            Ready to experience the MedCotton difference?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Link to="/contact">
                Contact Us Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link to="/products">View Products</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
