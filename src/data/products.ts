export interface ProductSize {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  sizes: ProductSize[];
  image: string | null;
  inStock: boolean;
  features: string[];
  shelfLife: string;
  storageCondition: string;
  precautions: string;
  comingSoon?: boolean;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Pearl White Cotton Bandage B.P.C.",
    description: "Cotton bandage is intended to be used as a mechanical barrier for compression or for absorption of exudates and to prevent bleeding from minor injuries.",
    category: "Cotton Bandages",
    sizes: [
      { size: "5 CM × 3 M", price: 260 },
      { size: "7.5 CM × 3 M", price: 390 },
      { size: "10 CM × 3 M", price: 520 },
      { size: "15 CM × 3 M", price: 780 },
    ],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769783665/Gemini_Generated_Image_uwdr5kuwdr5kuwdr_1_xwo5gq.jpg",
    inStock: true,
    features: [
      "100% pure cotton material",
      "High absorbency",
      "Breathable and comfortable",
      "Latex-free",
      "Individually wrapped",
    ],
    shelfLife: "To be used within 3 years",
    storageCondition: "To be stored in a cool and dry place and to be protected from heat and moisture",
    precautions: "Cotton bandage should not be applied directly on wounds, sterilized before use",
  },
  {
    id: "4",
    name: "Pearl White Absorb Surgical Gauze Pads B.P.C.",
    description: "ABSORB SURGICAL GAUZE PADS B.P.C IS USED FOR ABSORPTION OF BLOOD AND EXUDATES AND PREVENT BLEEDING.",
    category: "Gauze Pads",
    sizes: [
      { size: "10 CM × 10 CM", price: 180 },
      { size: "15 CM × 15 CM", price: 280 },
      { size: "20 CM × 20 CM", price: 420 },
      { size: "25 CM × 25 CM", price: 580 },
    ],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769783665/Gemini_Generated_Image_x7cfyax7cfyax7cf_1_hpxojc.jpg",
    inStock: true,
    features: [
      "USP Type VII certified",
      "Maximum absorbency",
      "Ideal for heavy wounds",
      "Sterile and individually wrapped",
      "Low-lint construction",
    ],
    shelfLife: "To be used within 3 years",
    storageCondition: "TO BE STORED IN A COOL AND DRY PLACE AND TO BE PROTECTED FROM HEAT AND MOISTURE",
    precautions: "ENSURE THE GAUZE PADS ARE STERILE AND PACKAGED PROPERLY BEFORE USE. DO NOT USE IF THE PACKAGING IS DAMAGED OR OPENED.",
  },
  {
    id: "5",
    name: "Pearl White Crepe Bandage B.P.",
    description: "CREPE BANDAGE IS INTENDED TO BE USED A MECHANICAL BARRIER FOR COMPRESSION.",
    category: "Crepe Bandages",
    sizes: [
      // { size: "5 CM × 4.5 METER", price: 220 },
      { size: "7.5 CM × 4.5 M", price: 180 },
      { size: "10 CM × 4.5 M", price: 240 },
      { size: "15 CM × 4.5 M", price: 360 },
    ],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769783663/Gemini_Generated_Image_bu5dn4bu5dn4bu5d_1_fudfwx.png",
    inStock: true,
    features: [
      "High elasticity and recovery",
      "Secure grip with clips",
      "Ideal for sprains and strains",
      "Washable and reusable",
      "Skin-friendly material",
    ],
    shelfLife: "To be used within 3 years",
    storageCondition: "TO BE STORED IN A COOL AND DRY PLACE AND TO BE PROTECTED FROM HEAT AND MOISTURE ",
    precautions: "CREPE BANDAGE SHOULD NOT BE STRETCHED TOO MUCH.",
  },
  {
    id: "7",
    name: "COTTON PEARL WHITE B.P.C. ABSORBENT COTTON WOOL (CARDED)",
    description: "ABSORBENT COTTON WOOL IS INTENDED TO BE USED AS A MECHANICAL BARRIER FOR COMPRESSION OR FOR ABSORPTION OF EXUDATES AND TO PREVENT BLEEDING FROM MINOR INJURIES",
    category: "Cotton Wool",
    sizes: [
      { size: "100 GM", price: 150 },
      { size: "200 GM", price: 300 },
      { size: "400 GM", price: 600 },
    ],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769783662/Gemini_Generated_Image_1n04rc1n04rc1n04_1_k7luyf.jpg",
    inStock: true,
    features: [
      "100% pure cotton",
      "Maximum absorbency",
      "Soft and gentle",
      "Medical grade purity",
      "Ideal for wound cleaning",
    ],
    shelfLife: "To be used within 5 years",
    storageCondition: "TO BE STORED IN A COOL AND DRY PLACE AND TO BE PROTECTED FROM HEAT AND MOISTURE PROLONGED STORAGE WILL REDUCE ABSORBENCY OF PRODUCT",
    precautions: "ABSORBENT COTTON WOOL SHOULD NOT BE APPLIED DIRECTLY ON WOUNDS, STERILIZED BEFORE USE",
  },
  {
    id: "11",
    name: "Pearl White Absorbent Cotton Gauze B.P.C.",
    description: "ABSORBENT COTTON GAUZE B.P.C IS USED FOR ABSORPTION OF BLOOD AND EXUDATES AND PREVENT BLEEDING.",
    category: "Gauze Roll",
    sizes: [
      { size: "1 M × 2.5 M", price: 150 },
      { size: "1 M × 20 M", price: 1200 },
      { size: "1 M × 40 M", price: 2400 },
    ],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769701342/Gemini_Generated_Image_a94ijra94ijra94i_ibidga.png",
    inStock: true,
    features: [
      "Sterile and individually wrapped",
      "8-ply construction",
      "Low-lint design",
      "High absorbency",
      "Suitable for all wound types",
    ],
    shelfLife: "To be used within 3 years",
    storageCondition: "TO BE STORED IN A COOL AND DRY PLACE AND TO BE PROTECTED FROM HEAT AND MOISTURE",
    precautions: "ENSURE THE ABSORBENT COTTON GAUZE B.P.C ARE STERILE AND PACKAGED PROPERLY BEFORE USE. DO NOT USE IF THE PACKAGING IS DAMAGED OR OPENED.",
  },
  {
    id: "12",
    name: "Pearl White Gauze Lint B.P.C.",
    description: "GAUZE LINT B.P.C IS USED FOR ABSORPTION OF BLOOD AND EXUDATES AND PREVENT BLEEDING.",
    category: "Gauze Lint",
    sizes: [
      { size: "400 GM ", price: 1160 },
      { size: "500 GM ", price: 1450 },
    ],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769783664/Gemini_Generated_Image_kzw2wskzw2wskzw2_1_zsirg8.png",
    inStock: true,
    features: [
      "Cost-effective option",
      "Versatile applications",
      "High thread count",
      "Easy to cut to size",
      "Bulk packaging available",
    ],
    shelfLife: "To be used within 3 years",
    storageCondition: "TO BE STORED IN A COOL AND DRY PLACE AND TO BE PROTECTED FROM HEAT AND MOISTURE",
    precautions: "ENSURE THE GAUZE LINT B.P.C ARE STERILE AND PACKAGED PROPERLY BEFORE USE. DO NOT USE IF THE PACKAGING IS DAMAGED OR OPENED.",
  },
  {
    id: "13",
    name: "Pearl White Absorbent Gauze Pad USP TYPE-IV",
    description: "ABSORBENT GAUZE PAD USP TYPE-IV IS USED FOR ABSORPTION OF BLOOD AND EXUDATES AND PREVENT BLEEDING",
    category: "Gauze Pads",
    sizes: [
      { size: "10 CM × 10 CM (1*100)(8PLY)", price: 1200},
      // { size: "500 GM ", price: 1450 },
    ],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769783664/Gemini_Generated_Image_pvos1pvos1pvos1p_1_dqmv6g.jpg",
    inStock: true,
    features: [
      "Cost-effective option",
      "Versatile applications",
      "High thread count",
      "Easy to cut to size",
      "Bulk packaging available",
    ],
    shelfLife: "To be used within 3 years",
    storageCondition: "TO BE STORED IN A COOL AND DRY PLACE AND TO BE PROTECTED FROM HEAT AND MOISTURE",
    precautions: "ENSURE THE ABSORBENT GAUZE PAD USP TYPE-IV ARE STERILE AND PACKAGED PROPERLY BEFORE USE. DO NOT USE IF THE PACKAGING IS DAMAGED OR OPENED.",
  },
  {
    id: "14",
    name: "Plaster Of Paris",
    description: "PLASTER OF PARIS BANDAGES ARE USED TO IMMOBILIZE BROKEN BONES, PROMOTING PROPER ALIGNMENT AND STABILIZATION FOR HEALING, THEY ALSO PREVENT FURTHER DAMAGE TO SURROUNDING TISSUES.",
    category: "Plaster Of Paris",
    sizes: [
      { size: "10 CM × 2.7 M", price: 0 },
      { size: "15 CM × 2.7 M", price: 0 },
      // { size: "15 CM × 2.7 M", price: 0 },
    ],
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1770281599/Gemini_Generated_Image_4enls14enls14enl_d597qu.png",
    inStock: false,
    features: [
      "Quick setting time",
      "High strength when dry",
      "Easy to mold and shape",
      "Smooth finish",
      "Medical grade quality",
    ],
    shelfLife: "TO BE USED WITHIN 3 YEARS",
    storageCondition: "TO BE STORED IN A COOL AND DRY PLACE AND TO BE PROTECTED FROM HEAT AND MOISTURE",
    precautions: "AVOID USING WARM OR HOT WATER, AS IT INCREASES THE HEAT GENERATED DURING THE SETTING PROCESS. MONITOR THE TEMPERATURE OF THE PLASTER DURING APPLICATION, ESPECIALLY IN CHILDREN AND THE ELDERLY.",
    comingSoon: true,
  },
];

export const categories: Category[] = [
  { id: "all", name: "All Products", count: products.length },
  { id: "Cotton Bandages", name: "Cotton Bandages", count: products.filter(p => p.category === "Cotton Bandages").length },
  { id: "Gauze Pads", name: "Gauze Pads", count: products.filter(p => p.category === "Gauze Pads").length },
  { id: "Gauze Roll", name: "Gauze Roll", count: products.filter(p => p.category === "Gauze Roll").length },
  { id: "Gauze Lint", name: "Gauze Lint", count: products.filter(p => p.category === "Gauze Lint").length },
  { id: "Crepe Bandages", name: "Crepe Bandages", count: products.filter(p => p.category === "Crepe Bandages").length },
  { id: "Cotton Wool", name: "Cotton Wool", count: products.filter(p => p.category === "Cotton Wool").length },
  { id: "Plaster Of Paris", name: "Plaster Of Paris", count: products.filter(p => p.category === "Plaster Of Paris").length },
];
