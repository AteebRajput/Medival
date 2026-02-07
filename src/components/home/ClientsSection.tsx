import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Client logos
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

// Marquee component for smooth infinite scroll
const Marquee = ({ 
  children, 
  direction = "left", 
  speed = 25 
}: { 
  children: React.ReactNode; 
  direction?: "left" | "right"; 
  speed?: number;
}) => {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex gap-6 shrink-0"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
};

// Logo Card Component
const LogoCard = ({ client }: { client: { name: string; logo: string } }) => (
  <div className="shrink-0 w-44 h-28 bg-card rounded-2xl border border-border/50 flex items-center justify-center shadow-sm hover:shadow-xl hover:border-primary/30 hover:scale-105 transition-all duration-300 cursor-pointer group">
    <img 
      src={client.logo} 
      alt={client.name} 
      className="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-300"
      title={client.name}
    />
  </div>
);

export const ClientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Split clients into two groups
  const firstHalf = clients.slice(0, 6);
  const secondHalf = clients.slice(6, 12);

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

        {/* Animated Marquee Logos */}
        <div className="relative">
          {/* Gradient masks for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-secondary/30 via-secondary/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-secondary/30 via-secondary/30 to-transparent z-10 pointer-events-none" />

          {/* Row 1 - Moving from RIGHT to LEFT (entering from right) */}
          <div className="mb-6">
            <Marquee direction="left" speed={30}>
              {clients.map((client, index) => (
                <LogoCard key={`row1-${index}`} client={client} />
              ))}
            </Marquee>
          </div>

          {/* Row 2 - Moving from LEFT to RIGHT (entering from left) */}
          <div>
            <Marquee direction="right" speed={35}>
              {[...clients].reverse().map((client, index) => (
                <LogoCard key={`row2-${index}`} client={client} />
              ))}
            </Marquee>
          </div>
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
