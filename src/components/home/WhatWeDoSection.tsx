import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Award, 
  Shield, 
  Sparkles, 
  Clock, 
  Package, 
  Leaf, 
  DollarSign, 
  Users, 
  Headphones,
  CheckCircle
} from "lucide-react";

const qualities = [
  {
    icon: Award,
    title: "Premium Quality Materials",
    description: "We source only the finest raw materials to ensure superior product quality and patient comfort.",
  },
  {
    icon: Shield,
    title: "ISO Certified Production",
    description: "Our manufacturing facilities meet international ISO standards for quality management systems.",
  },
  {
    icon: Sparkles,
    title: "Sterile Manufacturing",
    description: "State-of-the-art sterile production environments ensure contamination-free medical supplies.",
  },
  {
    icon: CheckCircle,
    title: "Quality Control Excellence",
    description: "Multi-stage quality checks at every production phase guarantee consistent product standards.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "Reliable logistics network ensures your orders reach you when you need them most.",
  },
  {
    icon: Package,
    title: "Custom Sizing Options",
    description: "Flexible sizing solutions tailored to meet diverse medical requirements and preferences.",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Packaging",
    description: "Sustainable packaging solutions that protect products while minimizing environmental impact.",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description: "Premium quality at fair prices, ensuring value for healthcare providers and patients alike.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced professionals dedicated to innovation and excellence in medical manufacturing.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance to address your queries and ensure seamless experience.",
  },
];

export const WhatWeDoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Strengths
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            What We <span className="text-gradient">Excel At</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Discover the qualities that make us the preferred choice for healthcare providers 
            and institutions worldwide. Our commitment to excellence drives everything we do.
          </p>
        </motion.div>

        {/* Quality Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {qualities.map((quality, index) => (
            <motion.div
              key={quality.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.5,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 } 
              }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="w-14 h-14 bg-gradient-medical rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <quality.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-lg font-heading font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {quality.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {quality.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
