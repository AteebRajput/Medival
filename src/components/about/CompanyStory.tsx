import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Target, Eye } from "lucide-react";

export const CompanyStory = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://res.cloudinary.com/duo8ezh6a/image/upload/v1769529736/Factory_Gate_Sign_aqt48r.png" 
                alt="Sultan Bandages" 
                className="w-full h-full aspect-[4/3] object-cover rounded-2xl" 
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 -right-8 bg-card rounded-2xl p-6 shadow-xl border border-border"
            >
              <Heart className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold text-foreground font-heading">25+</div>
              <p className="text-sm text-muted-foreground">Years of Care</p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Story
            </span>

            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              A Legacy of <span className="text-gradient">Excellence</span> in Healthcare
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Founded in 1998, Sultan Bandages began as a small family business with a simple mission: 
                to provide healthcare professionals with the highest quality cotton bandages and 
                medical supplies. What started in a modest manufacturing unit has grown into a 
                global enterprise serving hospitals and clinics across 30+ countries.
              </p>
              <p>
                Our founder, inspired by a personal experience with inadequate medical supplies, 
                set out to create products that would never compromise on quality. This commitment 
                has been the cornerstone of our success and continues to drive everything we do.
              </p>
              <p>
                Today, we operate state-of-the-art manufacturing facilities equipped with the 
                latest technology, employ over 500 dedicated professionals, and maintain the 
                highest international quality standards including ISO 9001 and ISO 13485 certifications.
              </p>
            </div>

            {/* Values */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                <Target className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Our Mission</h4>
                  <p className="text-sm text-muted-foreground">
                    Delivering quality healthcare products globally
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-xl">
                <Eye className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Our Vision</h4>
                  <p className="text-sm text-muted-foreground">
                    Leading global medical supplies manufacturer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
