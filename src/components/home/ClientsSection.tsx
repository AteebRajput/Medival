import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Client logos - all same size
const clients = [
  { name: "Agha Khan Hospital", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284059/Gemini_Generated_Image_mlogramlogramlog_edoobl.png" },
  { name: "Saifee Hospital", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284063/Gemini_Generated_Image_st5eqist5eqist5e_a6k6az.png" },
  { name: "Bantva Memon Khidmat Committee", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284059/Gemini_Generated_Image_smtr8zsmtr8zsmtr_r7lccw.png" },
  { name: "Liaquat National Hospital", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284058/Gemini_Generated_Image_lhite3lhite3lhit_caviyq.png" },
  { name: "Friends Of Burns Centre", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284056/Gemini_Generated_Image_er4heier4heier4h_zbwgcs.png" },
  { name: "Shaheed Mohtarma Benazir Bhutto Medical University (SMBBMU)", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284058/Gemini_Generated_Image_jdc3xyjdc3xyjdc3_ycovr8.png" },
  { name: "Tabba Heart Institute", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284058/Gemini_Generated_Image_cp9d3dcp9d3dcp9d_fabt9g.png" },
  { name: "Patel Hospital", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284057/Gemini_Generated_Image_3g65cx3g65cx3g65_vvkbkc.png" },
  { name: "Marie Stopes Society", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284056/Gemini_Generated_Image_cdooscdooscdoosc_rurqpl.png" },
  { name: "Bin Hashim Pharmacy & Supermarket", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284056/Gemini_Generated_Image_2wgc052wgc052wgc_fboipn.png" },
  { name: "Zubaida Medical Centre (ZMC)", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284055/Gemini_Generated_Image_dp0uv7dp0uv7dp0u_gdqsbi.png" },
  { name: "Government Tenders - Multiple Departments", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284054/GOP_vt52bx.png" },
];

export const ClientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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

        {/* Static Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-card rounded-xl border border-border p-4 flex items-center justify-center shadow-sm hover:shadow-md hover:border-primary/30 transition-shadow"
            >
              <div className="w-24 h-24 flex items-center justify-center">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="w-20 h-20 object-contain"
                  title={client.name}
                />
              </div>
            </motion.div>
          ))}
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
            { value: "100+", label: "Cities Served" },
            { value: "100M+", label: "Products Delivered" },
          ].map((stat) => (
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
