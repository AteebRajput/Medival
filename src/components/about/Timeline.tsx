import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Flag, Award, Globe, Factory, Users, Sparkles } from "lucide-react";

const timelineEvents = [
  {
    year: "1998",
    title: "Company Founded",
    description: "Sultan Cotton & Bandages was established as a small family business focused on cotton bandage manufacturing.",
    icon: Flag,
  },
  {
    year: "2003",
    title: "First ISO Certification",
    description: "Achieved ISO 9001 certification, marking our commitment to quality management systems.",
    icon: Award,
  },
  {
    year: "2008",
    title: "International Expansion",
    description: "Began exporting to international markets, establishing presence in 10+ countries.",
    icon: Globe,
  },
  {
    year: "2012",
    title: "New Manufacturing Facility",
    description: "Opened state-of-the-art manufacturing plant with increased production capacity.",
    icon: Factory,
  },
  {
    year: "2016",
    title: "500+ Team Members",
    description: "Expanded our workforce to over 500 dedicated professionals across all departments.",
    icon: Users,
  },
  {
    year: "2020",
    title: "ISO 13485 Certification",
    description: "Achieved medical device quality management certification, enhancing our credentials.",
    icon: Award,
  },
  {
    year: "2024",
    title: "Global Leader",
    description: "Now serving 30+ countries with 100M+ products delivered worldwide.",
    icon: Sparkles,
  },
];

export const Timeline = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Company <span className="text-gradient">History</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From humble beginnings to global recognition, here's our journey of growth and excellence
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`ml-12 md:ml-0 bg-card rounded-2xl p-6 shadow-lg border border-border hover:border-primary/30 transition-all ${
                      index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                    }`}
                  >
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold mb-3">
                      {event.year}
                    </span>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </motion.div>
                </div>

                {/* Icon Circle */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-8 h-8 rounded-full bg-gradient-medical flex items-center justify-center shadow-lg"
                  >
                    <event.icon className="h-4 w-4 text-white" />
                  </motion.div>
                </div>

                {/* Empty Space for Alternating Layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
