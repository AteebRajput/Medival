import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Globe, MessageCircle } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Our Head Office",
    details: ["108/2, 9th Commercial street", "DHA Phase IV ", "Karachi, Pakistan"],
    link: null,
  },
  {
    icon: MapPin,
    title: "Factory Address",
    details: ["145-46 Sindh Small Industrial Estate", "Mirwah Rd. Mirpurkhas ", "Sindh, Pakistan"],
    link: null,
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    details: ["+92 (333) 3414085", "(0233) 863526"],
    link: "tel:+1234567890",
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["info@sultancottonandbandages.com"],
    link: "mailto:info@sultancottonandbandages.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM", "Sunday: Closed"],
    link: null,
  },
];

const socialLinks = [
  { name: "WhatsApp", icon: MessageCircle, link: "#" },
  { name: "Website", icon: Globe, link: "#" },
];

export const ContactInfo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Contact Information
        </h2>
        <p className="text-muted-foreground">
          Reach out to us through any of the following channels. We're always happy to help!
        </p>
      </div>

      {/* Contact Cards */}
      <div className="space-y-4">
        {contactDetails.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="group"
          >
            <div className="flex gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 shrink-0 bg-gradient-medical rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                {item.details.map((detail, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {item.link && i === 0 ? (
                      <a href={item.link} className="hover:text-primary transition-colors">
                        {detail}
                      </a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Connect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-medical rounded-2xl p-6 text-white"
      >
        <h3 className="font-heading font-semibold text-lg mb-2">
          Need Urgent Assistance?
        </h3>
        <p className="text-white/80 text-sm mb-4">
          For urgent inquiries or immediate assistance, reach us directly through:
        </p>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.link}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              <social.icon className="h-4 w-4" />
              {social.name}
            </a>
          ))}
        </div>
      </motion.div>

      {/* FAQ Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="bg-secondary/50 rounded-xl p-6"
      >
        <h3 className="font-heading font-semibold text-foreground mb-2">
          Frequently Asked Questions
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Before reaching out, you might find your answer in our FAQ section. 
          We've compiled answers to common questions about our products and services.
        </p>
        <a
          href="#"
          className="inline-flex items-center text-sm text-primary font-medium hover:underline"
        >
          View FAQs →
        </a>
      </motion.div>
    </motion.div>
  );
};
