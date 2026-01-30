import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Building2 } from "lucide-react";

// Placeholder client logos - replace with actual client images
const clients = [
  { name: "Healthcare Corp", logo: null },
  { name: "MedTech Solutions", logo: null },
  { name: "Global Health Inc", logo: null },
  { name: "City Hospital Network", logo: null },
  { name: "Premier Medical", logo: null },
  { name: "United Healthcare", logo: null },
  { name: "National Medical", logo: null },
  { name: "Care First", logo: null },
  { name: "Health Plus", logo: null },
  { name: "Medical Group", logo: null },
];

export const ClientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [scrollPosition, setScrollPosition] = useState(0);

  // Infinite scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % (clients.length * 200));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-secondary/30 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Trusted Partners
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Our Valuable <span className="text-gradient">Clients</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading healthcare institutions and hospitals worldwide
          </p>
        </motion.div>

        {/* Scrolling Client Logos */}
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/30 to-transparent z-10" />

          {/* First row - moving right */}
          <motion.div
            animate={{ x: [-scrollPosition, -scrollPosition - clients.length * 200] }}
            transition={{ duration: 0, ease: "linear" }}
            className="flex gap-8 mb-8"
          >
            {[...clients, ...clients].map((client, index) => (
              <motion.div
                key={`row1-${index}`}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-44 h-24 bg-card rounded-xl border border-border flex items-center justify-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
              >
                {client.logo ? (
                  <img src={client.logo} alt={client.name} className="max-w-[80%] max-h-[60%] object-contain" />
                ) : (
                  <div className="text-center">
                    <Building2 className="h-8 w-8 text-muted-foreground mx-auto mb-1" />
                    <span className="text-xs text-muted-foreground">{client.name}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Second row - moving left */}
          <motion.div
            animate={{ x: [scrollPosition - clients.length * 200, scrollPosition] }}
            transition={{ duration: 0, ease: "linear" }}
            className="flex gap-8"
          >
            {[...clients, ...clients].reverse().map((client, index) => (
              <motion.div
                key={`row2-${index}`}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-44 h-24 bg-card rounded-xl border border-border flex items-center justify-center shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
              >
                {client.logo ? (
                  <img src={client.logo} alt={client.name} className="max-w-[80%] max-h-[60%] object-contain" />
                ) : (
                  <div className="text-center">
                    <Building2 className="h-8 w-8 text-muted-foreground mx-auto mb-1" />
                    <span className="text-xs text-muted-foreground">{client.name}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { value: "500+", label: "Healthcare Partners" },
            { value: "30+", label: "Countries Served" },
            { value: "100M+", label: "Products Delivered" },
          ].map((stat, index) => (
            <div key={stat.label} className="px-8">
              <div className="text-3xl md:text-4xl font-bold text-primary font-heading">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
