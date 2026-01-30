export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  sizes: string[];
  image: string | null;
  inStock: boolean;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Cotton Bandage Roll",
    description: "Premium quality cotton bandage roll for wound dressing and support. Highly absorbent and breathable material.",
    category: "Cotton Bandages",
    price: 4.99,
    sizes: ["15CM*3M","10CM*3M","7.5CM*3M","5CM*3M"],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769783665/Gemini_Generated_Image_uwdr5kuwdr5kuwdr_1_xwo5gq.jpg",
    inStock: true,
    features: [
      "100% pure cotton material",
      "High absorbency",
      "Breathable and comfortable",
      "Latex-free",
      "Individually wrapped",
    ],
  },

  {
    id: "4",
    name: "Absorb Surgical Gauze Pads B.P.C",
    description: "DRAP Pharmacopeia Type VII gauze pads meeting international standards for medical use.",
    category: "Gauze Pads",
    price: 9.99,
    sizes: ["10CM*10CM","15CM*15CM","20CM*20CM","25CM*25CM"],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769783665/Gemini_Generated_Image_x7cfyax7cfyax7cf_1_hpxojc.jpg",
    inStock: true,
    features: [
      "USP Type VII certified",
      "Maximum absorbency",
      "Ideal for heavy wounds",
      "Sterile and individually wrapped",
      "Low-lint construction",
    ],
  },
  {
    id: "5",
    name: "Cotton Crepe Bandage BP",
    description: "High-quality crepe bandage with excellent elasticity for compression therapy and joint support.",
    category: "Crepe Bandages",
    price: 5.99,
    sizes: ["10cm x 4.5m", "7.5cm x 4.5m", "10cm x 4.5m", "15cm x 4.5m"],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769783663/Gemini_Generated_Image_bu5dn4bu5dn4bu5d_1_fudfwx.png",
    inStock: true,
    features: [
      "High elasticity and recovery",
      "Secure grip with clips",
      "Ideal for sprains and strains",
      "Washable and reusable",
      "Skin-friendly material",
    ],
  },

  {
    id: "7",
    name: "Absorbent Cotton Wool ",
    description: "Pure absorbent cotton wool for cleaning wounds, applying medications, and general medical use.",
    category: "Cotton Wool",
    price: 12.99,
    sizes: ["100g", "250g", "500g","400mg", "1kg"],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769783662/Gemini_Generated_Image_1n04rc1n04rc1n04_1_k7luyf.jpg",
    inStock: true,
    features: [
      "100% pure cotton",
      "Maximum absorbency",
      "Soft and gentle",
      "Medical grade purity",
      "Ideal for wound cleaning",
    ],
  },


  {
    id: "11",
    name: "Absorbent Gauze Roll BPC",
    description: "Pre-cut sterile gauze swabs for wound cleaning and dressing. Individually packaged.",
    category: "Gauze Pads",
    price: 11.99,
    sizes: ["5cm x 5cm", "7.5cm x 7.5cm", "10cm x 10cm"],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769701342/Gemini_Generated_Image_a94ijra94ijra94i_ibidga.png",
    inStock: true,
    features: [
      "Sterile and individually wrapped",
      "8-ply construction",
      "Low-lint design",
      "High absorbency",
      "Suitable for all wound types",
    ],
  },
  {
    id: "12",
    name: "Link Gauze BPC" ,
    description: "Economical gauze roll for general medical applications and wound packing.",
    category: "Gauze Pads",
    price: 6.99,
    sizes: ["400mg"],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769783664/Gemini_Generated_Image_kzw2wskzw2wskzw2_1_zsirg8.png",
    inStock: true,
    features: [
      "Cost-effective option",
      "Versatile applications",
      "High thread count",
      "Easy to cut to size",
      "Bulk packaging available",
    ],
  },
];

export const categories: Category[] = [
  { id: "all", name: "All Products", count: products.length },
  { id: "Cotton Bandages", name: "Cotton Bandages", count: products.filter(p => p.category === "Cotton Bandages").length },
  { id: "Gauze Pads", name: "Gauze Pads", count: products.filter(p => p.category === "Gauze Pads").length },
  { id: "Crepe Bandages", name: "Crepe Bandages", count: products.filter(p => p.category === "Crepe Bandages").length },
  { id: "Cotton Wool", name: "Cotton Wool", count: products.filter(p => p.category === "Cotton Wool").length },
];
