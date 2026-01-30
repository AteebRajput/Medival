import { motion } from "framer-motion";
import { Award, Shield, CheckCircle } from "lucide-react";

export const CertificateHero = () => {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-medical-navy via-primary to-medical-navy overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Floating icons */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-1/4 left-[10%] text-white/10"
      >
        <Award className="h-24 w-24" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 right-[10%] text-white/10"
      >
        <Shield className="h-20 w-20" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Award className="h-4 w-4" />
            Quality Assured
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6"
          >
            Our Certificates
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/80 leading-relaxed mb-8"
          >
            Our commitment to quality is backed by internationally recognized certifications. 
            View our accreditations that ensure the highest standards in medical supplies manufacturing.
          </motion.p>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {["ISO 9001:2015", "ISO 14001", "DRAP GMP", "FDA Registered"].map((badge, index) => (
              <div
                key={badge}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm"
              >
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-white text-sm font-medium">{badge}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
