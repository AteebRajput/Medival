import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Leaf, 
  FlaskConical, 
  Cog, 
  ShieldCheck, 
  Package, 
  Truck,
  ArrowRight
} from "lucide-react";

const processSteps = [
  {
    step: 1,
    title: "Raw Material Sourcing",
    description: "Premium quality cotton is sourced from certified suppliers who meet our strict quality standards.",
    icon: Leaf,
    color: "from-green-500 to-emerald-600",
  },
  {
    step: 2,
    title: "Quality Testing",
    description: "Every batch undergoes rigorous laboratory testing for purity, absorbency, and consistency.",
    icon: FlaskConical,
    color: "from-blue-500 to-cyan-600",
  },
  {
    step: 3,
    title: "Manufacturing",
    description: "State-of-the-art machinery processes materials in sterile, climate-controlled environments.",
    icon: Cog,
    color: "from-purple-500 to-violet-600",
  },
  {
    step: 4,
    title: "Quality Assurance",
    description: "Multi-stage quality checks ensure every product meets international medical standards.",
    icon: ShieldCheck,
    color: "from-orange-500 to-amber-600",
  },
  {
    step: 5,
    title: "Sterile Packaging",
    description: "Products are packaged in sterile conditions with advanced barrier materials for protection.",
    icon: Package,
    color: "from-pink-500 to-rose-600",
  },
  {
    step: 6,
    title: "Distribution",
    description: "Efficient logistics network ensures timely delivery to healthcare facilities worldwide.",
    icon: Truck,
    color: "from-teal-500 to-cyan-600",
  },
];

export const ManufacturingProcess = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            How We Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Manufacturing <span className="text-gradient">Process</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From raw materials to finished products, every step is carefully controlled to ensure the highest quality
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-2xl border border-border p-8 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8 px-3 py-1 bg-gradient-medical rounded-full text-white text-sm font-bold">
                    Step {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 mt-2`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>

                  {/* Arrow (not on last item) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "99.9%", label: "Quality Pass Rate" },
            { value: "24/7", label: "Production Capacity" },
            { value: "100+", label: "Quality Checks" },
            { value: "ISO", label: "Certified Processes" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-secondary/50 rounded-xl"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary font-heading">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
