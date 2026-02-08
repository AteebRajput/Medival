import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Factory, Cog, Users, ShieldCheck, Cpu, Package } from "lucide-react";

const strengths = [
  {
    icon: Cpu,
    title: "Modern Machinery",
    description: "State-of-the-art equipment for precision manufacturing",
  },
  {
    icon: Users,
    title: "Skilled Workforce",
    description: "Experienced professionals dedicated to excellence",
  },
  {
    icon: ShieldCheck,
    title: "Quality Control",
    description: "Rigorous testing at every production stage",
  },
  {
    icon: Package,
    title: "Safe Packaging",
    description: "Careful packaging ensuring product integrity",
  },
];

export const ManufacturingStrengthSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-secondary/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Factory className="w-4 h-4" />
              Manufacturing Strength
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              Built for Excellence
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our factory is equipped with modern machinery, a skilled workforce, and rigorous quality control systems. From raw material selection to final packaging, every stage is carefully monitored to ensure safety and reliability.
            </p>

            {/* Strength Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {strengths.map((strength, index) => (
                <motion.div
                  key={strength.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="group p-4 bg-secondary/50 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <strength.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{strength.title}</h4>
                      <p className="text-sm text-muted-foreground">{strength.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "20+", label: "Years Experience" },
                { value: "500+", label: "Healthcare Partners" },
                { value: "100M+", label: "Products Delivered" },
                { value: "100%", label: "Quality Commitment" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary font-heading mb-2">
                      {stat.value}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-primary text-white rounded-full shadow-lg"
            >
              <span className="text-sm font-semibold">
                DRAP Registered Manufacturer
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
