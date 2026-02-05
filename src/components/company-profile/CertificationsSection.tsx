import { motion } from "framer-motion";
import { Award, Shield, BadgeCheck, CheckCircle2, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const certifications = [
  { name: "DRAP Manufacturing License", icon: Shield, color: "from-blue-500 to-cyan-500" },
  { name: "DRAP Product Registration", icon: BadgeCheck, color: "from-emerald-500 to-teal-500" },
  { name: "GMP Certified Facility", icon: Award, color: "from-purple-500 to-pink-500" },
  { name: "ISO 9001:2015", subtitle: "Quality Management System", icon: CheckCircle2, color: "from-orange-500 to-amber-500" },
  { name: "ISO 14001:2015", subtitle: "Environmental Management System", icon: Globe, color: "from-green-500 to-emerald-500" },
];

export const CertificationsSection = () => {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Compliance & Certifications
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Quality You Can <span className="text-gradient">Trust</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our manufacturing operations strictly follow national and international quality standards
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative bg-card rounded-3xl p-8 border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 h-full text-center overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <cert.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {cert.name}
                </h3>
                {cert.subtitle && (
                  <p className="text-sm text-muted-foreground">{cert.subtitle}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/certificates">
              View All Certificates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
