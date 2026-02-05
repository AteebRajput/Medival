import { motion } from "framer-motion";
import { Factory, Users, Shield, Package } from "lucide-react";

const FACTORY_VIDEO_URL = "https://res.cloudinary.com/duo8ezh6a/video/upload/v1770224817/WhatsApp_Video_2026-02-03_at_12.08.59_AM_fgd5ow.mp4";

export const ManufacturingStrengthSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-medical-navy via-primary/90 to-medical-navy relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10"
      >
        <div className="w-full h-full border-2 border-white/20 rounded-full" />
        <div className="absolute inset-10 border-2 border-white/15 rounded-full" />
        <div className="absolute inset-20 border-2 border-white/10 rounded-full" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              <Factory className="w-4 h-4" />
              Manufacturing Strength
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              State-of-the-Art Production Facility
            </h2>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              Our factory is equipped with modern machinery, a skilled workforce, and rigorous quality 
              control systems. From raw material selection to final packaging, every stage is carefully 
              monitored to ensure safety and reliability.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Modern Machinery", icon: Factory },
                { label: "Skilled Workforce", icon: Users },
                { label: "Quality Control", icon: Shield },
                { label: "Safe Packaging", icon: Package },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                >
                  <item.icon className="w-6 h-6 text-cyan-400" />
                  <span className="font-medium text-white">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <video
                src={FACTORY_VIDEO_URL}
                controls
                className="w-full h-full object-cover"
                poster=""
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-white font-medium text-sm">Factory Tour</p>
              <p className="text-white/60 text-xs">See our production in action</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
