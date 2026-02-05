import { motion } from "framer-motion";
import { Building2, CheckCircle2 } from "lucide-react";

export const AboutUsSection = () => {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              Two Decades of 
              <span className="text-gradient"> Healthcare Excellence</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Sultan Cotton & Bandages is a Pakistan-based manufacturer of high-quality medical disposables. 
              For over 20 years, we have been supplying hospitals, clinics, pharmacies, and distributors 
              across Pakistan.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our commitment to quality, compliance, and consistency has made us a trusted name in healthcare. 
              We take pride in being the preferred choice for medical institutions nationwide.
            </p>
            
            {/* Key Points */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Quality Assured Products",
                "Nationwide Distribution",
                "Expert Workforce",
                "Timely Delivery"
              ].map((point, index) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-medical flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-foreground">{point}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 rounded-3xl transform -rotate-3" />
              
              {/* Main Card */}
              <div className="relative bg-card rounded-3xl p-8 shadow-2xl border border-border/50 h-full flex flex-col justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-medical flex items-center justify-center"
                  >
                    <Building2 className="w-16 h-16 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold mb-2">Est. 2006</h3>
                  <p className="text-muted-foreground">Serving Healthcare Since</p>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-secondary/50">
                      <div className="text-3xl font-bold text-primary">20+</div>
                      <div className="text-sm text-muted-foreground">Years</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-secondary/50">
                      <div className="text-3xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">Pakistani</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
