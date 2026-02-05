import { motion } from "framer-motion";
import { Heart, Building2 } from "lucide-react";

const clients = [
  "Agha Khan Health Services",
  "Liaquat National Hospital",
  "Tabba Heart Institute",
  "Patel Hospital",
  "Saifee Hospital",
  "Shaheed Mohtarma Benazir Bhutto Medical University (SMBBMU)",
  "Friends of Burns Centre",
  "Zubaida Medical Centre (ZMC)",
  "Marie Stopes Society",
  "Bantva Memon Khidmat Committee",
  "Bin Hashim Pharmacy & Supermarket",
  "Government Tenders – Multiple Departments",
];

export const ValuedClientsSection = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            Our Valued Clients
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Trusted by <span className="text-gradient">Leading Institutions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We are proud to serve some of Pakistan's most prestigious healthcare institutions
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {clients.map((client, index) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group"
            >
              <div className="relative bg-card rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-medical rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-gradient-medical transition-colors duration-300">
                    <Building2 className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-medium text-foreground leading-snug">{client}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
