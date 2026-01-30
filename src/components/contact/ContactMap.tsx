import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export const ContactMap = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <MapPin className="h-4 w-4" />
            Our Location
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Find Us on the <span className="text-gradient">Map</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit our headquarters or manufacturing facility. We welcome visitors by appointment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-xl border border-border"
        >
          {/* Google Maps Embed */}
          <div className="aspect-[21/9] min-h-[400px] bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d226.14281053463833!2d67.06117378173437!3d24.9223602745381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f6cd5e8ecd5%3A0xdd1ff6e7f741eec1!2sSultan%20Cotton%20and%20Bandages!5e0!3m2!1sen!2s!4v1769785237586!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MedCotton Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
            
          </div>

          {/* Floating Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-sm bg-card rounded-xl p-6 shadow-2xl border border-border"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 bg-gradient-medical rounded-xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  Sultan Cotton and Bandages Factory
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                145-46 Sindh Small Industrial Estate Mirwah Rd. Mirpurkhas, Sindh, Pakistan
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=40.7128,-74.0060"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-primary font-medium hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              name: "Manufacturing Plant",
              address: "145-46 Sindh Small Industrial Estate Mirwah Rd. Mirpurkhas, Sindh, Pakistan",
              hours: "Mon-Sat: 6:00 AM - 10:00 PM",
            },
            {
              name: "Distribution Center",
              address: "108/2, 9th Commercial street, DHA Phase IV , Karachi, Pakistan",
              hours: "24/7 Operations",
            },
            {
              name: "Quality Control Lab",
              address: "145-46 Sindh Small Industrial Estate Mirwah Rd. Mirpurkhas, Sindh, Pakistan",
              hours: "Mon-Fri: 8:00 AM - 5:00 PM",
            },
          ].map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <h3 className="font-heading font-semibold text-foreground mb-2">
                {location.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">{location.address}</p>
              <p className="text-xs text-primary">{location.hours}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
