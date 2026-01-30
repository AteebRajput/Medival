import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Award, CheckCircle, BadgeCheck, Verified } from "lucide-react";

const trustIndicators = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Every product meets stringent quality standards",
  },
  {
    icon: Award,
    title: "ISO Certified",
    description: "International quality management certification",
  },
  {
    icon: BadgeCheck,
    title: "Authentic Products",
    description: "Genuine medical-grade materials guaranteed",
  },
  {
    icon: Verified,
    title: "Trusted Brand",
    description: "Recognized by healthcare professionals",
  },
];

export const TrademarkSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-gradient-to-b from-secondary/30 via-background to-background relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            Our Identity
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4"
          >
            Our Registered{" "}
            <span className="text-gradient">Trademark</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A symbol of trust, quality, and commitment to healthcare excellence
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Trademark Logo Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative flex justify-center"
          >
            {/* Animated Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-2 border-dashed border-primary/20"
            />
            
            {/* Second Animated Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border border-primary/10"
            />

            {/* Trademark Logo Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative z-10 bg-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl border border-primary/10"
            >
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 rounded-3xl" />
              
              <motion.img
                src="https://res.cloudinary.com/duo8ezh6a/image/upload/v1769610337/4_dtsqxu.svg"
                alt="Sultan Bandages - Registered Trademark"
                className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain relative z-10"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              
              {/* Registered Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                className="absolute -top-3 -right-3 bg-primary text-white rounded-full p-2 shadow-lg"
              >
                <span className="text-lg font-bold">®</span>
              </motion.div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 right-8 lg:right-16 bg-green-500/10 rounded-full p-3"
            >
              <CheckCircle className="w-6 h-6 text-green-600" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 left-8 lg:left-16 bg-primary/10 rounded-full p-3"
            >
              <Shield className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                A Mark of Excellence in Medical Care
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our registered trademark represents more than just a logo — it's a promise 
                of uncompromising quality in medical supplies. For over 25 years, this symbol 
                has stood for trust, reliability, and excellence in the healthcare industry.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When you see our trademark on cotton bandages, gauze pads, or any medical 
                product, you can be confident that you're getting authentic, premium-quality 
                supplies manufactured under strict quality control and international standards.
              </p>
            </motion.div>

            {/* Trust Indicators Grid */}
            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 gap-4"
            >
              {trustIndicators.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Authenticity Notice */}
            <motion.div
              variants={itemVariants}
              className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/20"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Verified className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Authenticity Guarantee
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Look for our trademark on all genuine products to ensure authenticity
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
