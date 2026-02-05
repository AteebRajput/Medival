import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// Clients with logos
const clients = [
  { name: "Agha Khan Health Services", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284059/Gemini_Generated_Image_mlogramlogramlog_edoobl.png" },
  { name: "Liaquat National Hospital", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284058/Gemini_Generated_Image_lhite3lhite3lhit_caviyq.png" },
  { name: "Tabba Heart Institute", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284058/Gemini_Generated_Image_cp9d3dcp9d3dcp9d_fabt9g.png" },
  { name: "Patel Hospital", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284057/Gemini_Generated_Image_3g65cx3g65cx3g65_vvkbkc.png" },
  { name: "Saifee Hospital", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284063/Gemini_Generated_Image_st5eqist5eqist5e_a6k6az.png" },
  { name: "Shaheed Mohtarma Benazir Bhutto Medical University (SMBBMU)", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284058/Gemini_Generated_Image_jdc3xyjdc3xyjdc3_ycovr8.png" },
  { name: "Friends of Burns Centre", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284056/Gemini_Generated_Image_er4heier4heier4h_zbwgcs.png" },
  { name: "Zubaida Medical Centre (ZMC)", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284055/Gemini_Generated_Image_dp0uv7dp0uv7dp0u_gdqsbi.png" },
  { name: "Marie Stopes Society", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284056/Gemini_Generated_Image_cdooscdooscdoosc_rurqpl.png" },
  { name: "Bantva Memon Khidmat Committee", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284059/Gemini_Generated_Image_smtr8zsmtr8zsmtr_r7lccw.png" },
  { name: "Bin Hashim Pharmacy & Supermarket", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284056/Gemini_Generated_Image_2wgc052wgc052wgc_fboipn.png" },
  { name: "Government Tenders – Multiple Departments", logo: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770284054/GOP_vt52bx.png" },
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

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="relative bg-card rounded-2xl p-4 border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 flex items-center justify-center mb-3">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="w-16 h-16 object-contain"
                    title={client.name}
                  />
                </div>
                <span className="text-xs text-center text-muted-foreground font-medium leading-tight line-clamp-2">
                  {client.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
