export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  location: string;
  year: string;
  description: string;
  fullDescription: string;
  image: string | null;
  products: string[];
  results: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface PortfolioCategory {
  id: string;
  name: string;
}

export interface GalleryImage {
  id: string;
  src: string | null;
  alt: string;
  category: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "City General Hospital Supply Contract",
    client: "City General Hospital",
    category: "Hospitals",
    location: "New York, USA",
    year: "2023",
    description: "Comprehensive medical supply contract for a 500-bed metropolitan hospital.",
    fullDescription: "We partnered with City General Hospital to provide a complete range of cotton bandages, gauze pads, and surgical dressings. This 3-year contract covers their entire wound care requirements across all departments including emergency, surgery, and intensive care units. Our dedicated team ensures weekly deliveries and maintains optimal inventory levels.",
    image: null,
    products: ["Cotton Bandage Rolls", "Gauze Pad BPC", "Sterile Gauze Swabs", "Elasto Crepe Bandage"],
    results: [
      "30% reduction in supply costs",
      "Zero stockout incidents over 12 months",
      "Improved patient comfort scores",
      "Streamlined procurement process",
    ],
    testimonial: {
      quote: "MedCotton has been an exceptional partner. Their product quality and reliability have significantly improved our wound care outcomes.",
      author: "Dr. Sarah Mitchell",
      role: "Chief Medical Officer",
    },
  },
  {
    id: "2",
    title: "Regional Clinic Network Rollout",
    client: "HealthFirst Clinics",
    category: "Clinics",
    location: "California, USA",
    year: "2023",
    description: "Supplying 25 clinics with standardized medical supplies across the region.",
    fullDescription: "HealthFirst Clinics approached us to standardize their wound care supplies across their network of 25 outpatient clinics. We implemented a centralized ordering system and customized product bundles for different clinic sizes. This project improved consistency in patient care and reduced administrative overhead.",
    image: null,
    products: ["Cotton Wool Balls", "Triangular Bandage", "Gauze Pad USP Type", "Tubular Bandage"],
    results: [
      "Standardized supplies across 25 locations",
      "25% cost savings through bulk ordering",
      "Simplified ordering with product bundles",
      "Improved inventory management",
    ],
    testimonial: {
      quote: "The transition to MedCotton products was seamless. Their team handled everything professionally.",
      author: "James Rodriguez",
      role: "Operations Director",
    },
  },
  {
    id: "3",
    title: "Emergency Response Kit Program",
    client: "National Red Cross",
    category: "NGO",
    location: "Multiple Countries",
    year: "2022",
    description: "Custom first aid kit components for disaster relief operations.",
    fullDescription: "We collaborated with the National Red Cross to develop specialized first aid kit components for their disaster relief programs. Our products are now part of emergency response kits deployed in over 15 countries. The project required meeting stringent international standards and ensuring extended shelf life for emergency storage.",
    image: null,
    products: ["Sterile Cotton Bandages", "Absorbent Cotton Wool", "Gauze Pads BPC", "Triangular Bandage"],
    results: [
      "Kits deployed in 15+ countries",
      "Extended 5-year shelf life achieved",
      "Met WHO emergency supply standards",
      "Supported 50,000+ beneficiaries",
    ],
  },
  {
    id: "4",
    title: "Sports Medicine Partnership",
    client: "Olympic Training Center",
    category: "Sports Medicine",
    location: "Colorado, USA",
    year: "2024",
    description: "Premium elastic bandages and compression products for athlete care.",
    fullDescription: "The Olympic Training Center selected MedCotton as their exclusive supplier for elastic bandages and compression products. Our Elasto Crepe Bandages and heavy-duty compression wraps are now used by Olympic athletes during training and recovery. We also provide on-site training for sports medicine staff.",
    image: null,
    products: ["Elasto Crepe Bandage", "Heavy Crepe Bandage", "Elastic Cotton Bandage", "Tubular Bandage"],
    results: [
      "Reduced recovery times by 20%",
      "Preferred by 95% of athletes",
      "Zero adverse reactions reported",
      "Staff training program implemented",
    ],
    testimonial: {
      quote: "The quality of their elastic bandages is unmatched. Our athletes notice the difference.",
      author: "Dr. Michael Chen",
      role: "Head of Sports Medicine",
    },
  },
  {
    id: "5",
    title: "University Medical School Partnership",
    client: "Johns Hopkins University",
    category: "Education",
    location: "Maryland, USA",
    year: "2023",
    description: "Training supplies for medical students and simulation labs.",
    fullDescription: "Johns Hopkins University selected MedCotton to supply their medical school simulation labs and teaching hospitals. We provide a wide range of products used in clinical skills training, from basic wound care to surgical techniques. Our partnership includes educational materials and product training sessions.",
    image: null,
    products: ["Cotton Bandage Roll", "Gauze Pad BPC", "Gauze Pad USP Type", "Cotton Wool Roll"],
    results: [
      "Supplies 3,000+ medical students annually",
      "Reduced training supply costs by 35%",
      "Enhanced hands-on learning experience",
      "Quarterly product training sessions",
    ],
  },
  {
    id: "6",
    title: "Veterinary Hospital Network",
    client: "PetCare Hospitals",
    category: "Veterinary",
    location: "Texas, USA",
    year: "2024",
    description: "Specialized bandages and wound care products for animal care.",
    fullDescription: "PetCare Hospitals, a network of 40 veterinary clinics, partnered with us for their wound care needs. We developed specialized sizing and products suitable for various animal sizes, from small pets to large animals. Our team worked closely with veterinary staff to ensure product effectiveness.",
    image: null,
    products: ["Cotton Bandage Roll", "Tubular Bandage", "Absorbent Cotton Wool", "Elastic Cotton Bandage"],
    results: [
      "Serving 40 veterinary clinics",
      "Custom sizes for different animals",
      "98% veterinarian satisfaction rate",
      "Reduced wound healing time",
    ],
  },
];

export const portfolioCategories: PortfolioCategory[] = [
  { id: "all", name: "All Projects" },
  { id: "Hospitals", name: "Hospitals" },
  { id: "Clinics", name: "Clinics" },
  { id: "NGO", name: "NGO & Relief" },
  { id: "Sports Medicine", name: "Sports Medicine" },
  { id: "Education", name: "Education" },
  { id: "Veterinary", name: "Veterinary" },
];

export const galleryImages: GalleryImage[] = [
  { id: "1", src: null, alt: "Hospital Supply Room", category: "Hospital" },
  { id: "2", src: null, alt: "Surgical Procedure", category: "Surgery" },
  { id: "3", src: null, alt: "Wound Care Treatment", category: "Patient Care" },
  { id: "4", src: null, alt: "Emergency Response", category: "Emergency" },
  { id: "5", src: null, alt: "Medical Training", category: "Education" },
  { id: "6", src: null, alt: "Product Packaging", category: "Products" },
  { id: "7", src: null, alt: "Quality Control Lab", category: "Manufacturing" },
  { id: "8", src: null, alt: "Sports Medicine Clinic", category: "Sports" },
  { id: "9", src: null, alt: "Clinic Interior", category: "Clinic" },
  { id: "10", src: null, alt: "Product Display", category: "Products" },
  { id: "11", src: null, alt: "Manufacturing Facility", category: "Manufacturing" },
  { id: "12", src: null, alt: "Delivery Truck", category: "Logistics" },
];
