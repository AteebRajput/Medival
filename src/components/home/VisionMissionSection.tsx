import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Target, Sparkles } from "lucide-react";

export const VisionMissionSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Purpose
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Vision & Mission
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group"
          >
            <div className="h-full bg-card rounded-2xl p-8 lg:p-10 shadow-lg border border-border hover:shadow-2xl hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-medical rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                Our Vision
                <Sparkles className="h-5 w-5 text-primary" />
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                To be the global leader in medical supplies manufacturing, setting the benchmark 
                for quality, innovation, and sustainability in healthcare products.
              </p>

              <ul className="space-y-3">
                {[
                  "Global healthcare excellence",
                  "Continuous innovation",
                  "Sustainable practices",
                  "Customer-centric approach",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group"
          >
            <div className="h-full bg-card rounded-2xl p-8 lg:p-10 shadow-lg border border-border hover:shadow-2xl hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-medical rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                Our Mission
                <Sparkles className="h-5 w-5 text-primary" />
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                To provide healthcare professionals with superior quality medical supplies that 
                enhance patient care while maintaining the highest standards of safety and reliability.
              </p>

              <ul className="space-y-3">
                {[
                  "Premium quality products",
                  "Rigorous quality control",
                  "Timely delivery worldwide",
                  "Exceptional customer support",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
