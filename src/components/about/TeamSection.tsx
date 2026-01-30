import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Mail, User } from "lucide-react";

const teamMembers = [
  {
    name: "Robert Anderson",
    role: "Chief Executive Officer",
    bio: "25+ years of experience in healthcare industry leadership",
    image: null,
  },
  {
    name: "Dr. Sarah Mitchell",
    role: "Chief Medical Officer",
    bio: "Former hospital director with expertise in wound care",
    image: null,
  },
  {
    name: "James Chen",
    role: "Chief Operations Officer",
    bio: "Expert in manufacturing excellence and supply chain",
    image: null,
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Quality Assurance",
    bio: "15+ years ensuring product quality and compliance",
    image: null,
  },
  {
    name: "Michael Thompson",
    role: "Director of R&D",
    bio: "Leading innovation in medical textile technology",
    image: null,
  },
  {
    name: "Lisa Park",
    role: "Head of Global Sales",
    bio: "Building partnerships across 30+ countries",
    image: null,
  },
];

export const TeamSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Meet the <span className="text-gradient">Leadership</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our experienced leadership team drives innovation and excellence across all operations
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                {/* Photo */}
                <div className="relative aspect-square bg-gradient-to-br from-secondary to-muted overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                      <div className="w-24 h-24 rounded-full bg-gradient-medical flex items-center justify-center mb-2">
                        <User className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Social Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <div className="flex gap-3">
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
