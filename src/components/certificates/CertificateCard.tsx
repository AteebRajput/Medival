import { motion } from "framer-motion";
import { Award, Eye, Download, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Certificate {
  id: string;
  name: string;
  category: string;
  issueDate: string;
  expiryDate: string;
  issuingBody: string;
  image: string | string[] | null;
  description: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  onClick: () => void;
}

export const CertificateCard = ({ certificate, onClick }: CertificateCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="h-full bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
        {/* Certificate Image */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-secondary to-muted overflow-hidden">
          {certificate.image ? (
            <img
              src={Array.isArray(certificate.image) ? certificate.image[0] : certificate.image}
              alt={certificate.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <Award className="h-16 w-16 text-primary/40 mb-2" />
              <span className="text-sm text-muted-foreground">Certificate</span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className="flex gap-3"
            >
              <button className="p-3 bg-white rounded-full text-foreground hover:bg-primary hover:text-white transition-colors">
                <Eye className="h-5 w-5" />
              </button>
              <button 
                className="p-3 bg-white rounded-full text-foreground hover:bg-primary hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Download functionality would go here
                }}
              >
                <Download className="h-5 w-5" />
              </button>
            </motion.div>
          </div>

          {/* Category Badge */}
          <Badge 
            className="absolute top-3 left-3 bg-primary/90 text-white border-0"
          >
            {certificate.category}
          </Badge>
        </div>

        {/* Certificate Info */}
        <div className="p-5">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {certificate.name}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {certificate.description}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>Issued: {certificate.issueDate}</span>
            </div>
            <span className="text-primary font-medium">{certificate.issuingBody}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
