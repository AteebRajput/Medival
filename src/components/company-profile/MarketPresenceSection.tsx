import { motion } from "framer-motion";
import { Globe, TrendingUp, MapPin, CheckCircle2 } from "lucide-react";

export const MarketPresenceSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Globe className="w-4 h-4" />
              Market Presence
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
              Trusted Across
              <span className="text-gradient"> Pakistan</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our cotton bandages and cotton wool are among the best-selling medical disposables 
              in Pakistan, widely trusted by healthcare professionals for consistent performance 
              and dependable quality.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 font-medium">
                <TrendingUp className="w-5 h-5" />
                Best Selling Products
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 font-medium">
                <MapPin className="w-5 h-5" />
                Nationwide Coverage
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-card rounded-3xl p-8 shadow-2xl border border-border/50">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-medical rounded-2xl flex items-center justify-center shadow-lg">
                <Globe className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-2xl font-heading font-bold mb-6">Coverage Areas</h3>
              <div className="space-y-4">
                {["Hospitals & Medical Centers", "Clinics & Pharmacies", "Distributors & Wholesalers", "Government Institutions"].map((area, index) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">{area}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
