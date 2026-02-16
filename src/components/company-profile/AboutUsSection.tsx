import { motion } from "framer-motion";
import { Building2, CheckCircle2, MapPin, Calendar, Award, Users } from "lucide-react";

// Factory image URL
const FACTORY_IMAGE_URL = "https://res.cloudinary.com/duo8ezh6a/image/upload/v1771155719/WhatsApp_Image_2026-02-15_at_3.14.48_PM_q8tnj7.jpg";

export const AboutUsSection = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
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
                { text: "Quality Assured Products", icon: Award },
                { text: "Nationwide Distribution", icon: MapPin },
                { text: "Expert Workforce", icon: Users },
                { text: "Timely Delivery", icon: Calendar }
              ].map((point, index) => (
                <motion.div
                  key={point.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-medical flex items-center justify-center shrink-0">
                    <point.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-foreground">{point.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual - Factory Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-cyan-500/20 rounded-2xl blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-cyan-500/20 to-primary/20 rounded-2xl blur-xl" />
              
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                {/* Factory Image */}
                <div className="aspect-[4/3] relative">
                  <img
                    src={FACTORY_IMAGE_URL}
                    alt="Sultan Cotton & Bandages Factory"
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Location Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-4 left-4"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm font-medium">Sindh, Pakistan</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Est 2006 Card - Centered below image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex justify-center -mt-8 relative z-10"
              >
                <div className="px-8 py-4 bg-white dark:bg-card rounded-2xl shadow-xl border border-border/50 text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary font-heading">Est. 2006</div>
                  <div className="text-xs text-muted-foreground mt-1">Serving Healthcare</div>
                </div>
              </motion.div>

              {/* Floating 20+ Years Card - Right side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -right-4 top-1/4 hidden lg:block z-20"
              >
                <div className="bg-white dark:bg-card rounded-2xl shadow-xl border border-border/50 p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold text-primary font-heading">20+</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
              </motion.div>

              {/* Floating 100% Pakistani Card - Left side */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute -left-4 top-1/3 hidden lg:block z-20"
              >
                <div className="bg-white dark:bg-card rounded-2xl shadow-xl border border-border/50 p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold text-primary font-heading">100%</div>
                  <div className="text-xs text-muted-foreground">Pakistani</div>
                </div>
              </motion.div>

              {/* Quality Badge - Top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute top-4 right-4 z-20"
              >
                <div className="bg-gradient-medical text-white rounded-full p-3 shadow-lg">
                  <Award className="w-6 h-6" />
                </div>
              </motion.div>
            </div>

            {/* Mobile Stats - Visible only on mobile/tablet */}
            <div className="flex justify-center gap-4 mt-6 lg:hidden">
              <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-4 text-center flex-1 max-w-[140px]">
                <div className="text-2xl font-bold text-primary font-heading">20+</div>
                <div className="text-xs text-muted-foreground">Years</div>
              </div>
              <div className="bg-card rounded-2xl shadow-lg border border-border/50 p-4 text-center flex-1 max-w-[140px]">
                <div className="text-2xl font-bold text-primary font-heading">100%</div>
                <div className="text-xs text-muted-foreground">Pakistani</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
