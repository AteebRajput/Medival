import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar, Building2, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string | null;
  products: string[];
  results: string[];
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="h-full bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
        {/* Project Image */}
        <div className="relative aspect-[16/10] bg-gradient-to-br from-secondary to-muted overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
              <Building2 className="h-16 w-16 text-primary/40 mb-2" />
              <span className="text-sm text-muted-foreground">Project Image</span>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-white text-sm"
              >
                <span>View Case Study</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </div>

          {/* Category Badge */}
          <Badge className="absolute top-3 left-3 bg-primary/90 text-white border-0">
            {project.category}
          </Badge>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {project.title}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" />
              <span>{project.client}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{project.year}</span>
            </div>
          </div>

          {/* Products Used */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
            {project.products.slice(0, 3).map((product) => (
              <span
                key={product}
                className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-xs text-secondary-foreground rounded-md"
              >
                <Package className="h-3 w-3" />
                {product}
              </span>
            ))}
            {project.products.length > 3 && (
              <span className="px-2 py-1 bg-secondary text-xs text-secondary-foreground rounded-md">
                +{project.products.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
