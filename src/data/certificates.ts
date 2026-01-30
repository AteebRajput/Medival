export interface Certificate {
  id: string;
  name: string;
  category: string;
  issueDate: string;
  expiryDate: string;
  issuingBody: string;
  image: string | string[] | null;
  description: string;
}

export interface CertificateCategory {
  id: string;
  name: string;
}

export const certificates: Certificate[] = [
  {
    id: "1",
    name: "ISO 9001:2015 Quality Management",
    category: "ISO",
    issueDate: "Sep 2023",
    expiryDate: "Sep 2026",
    issuingBody: "UKcert",
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769615563/ISO_9001_CERTIFICATE_1_-1_avdrgj.jpg",
    description: "Quality management system standard specifically designed for the medical devices industry, ensuring consistent design, development, and production of medical devices.",
  },
  {
    id: "2",
    name: "ISO 14001:2015 Environmental Management",
    category: "ISO",
    issueDate: "Mar 2023",
    expiryDate: "Mar 2026",
    issuingBody: "UKcert",
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769615571/ISO_14001_CERTIFICATE_1_-1_dnfffs.jpg",
    description: "Environmental management system certification demonstrating our commitment to minimizing environmental impact and continuous improvement.",
  },
  {
    id: "3",
    name: "GMP Certificate",
    category: "Quality",
    issueDate: "Mar 2025",
    expiryDate: "Jun 2028",
    issuingBody: "DRAP",
    image: "https://res.cloudinary.com/duo8ezh6a/image/upload/v1769615584/GMP_CERTI_2_-1_iyrudv.jpg",
    description: "Good Manufacturing Practice certification ensuring our products are consistently produced and controlled according to quality standards.",
  },
  // {
  //   id: "4",
  //   name: "FDA Registration",
  //   category: "Medical",
  //   issueDate: "Sep 2022",
  //   expiryDate: "Ongoing",
  //   issuingBody: "U.S. FDA",
  //   image: null,
  //   description: "Registration with the United States Food and Drug Administration for manufacturing and distributing medical devices in the US market.",
  // },

  // {
  //   id: "7",
  //   name: "OHSAS 18001 Safety",
  //   category: "Quality",
  //   issueDate: "Aug 2022",
  //   expiryDate: "Aug 2025",
  //   issuingBody: "DNV GL",
  //   image: null,
  //   description: "Occupational health and safety management system certification ensuring a safe working environment for all employees.",
  // },
  // {
  //   id: "8",
  //   name: "BPC Compliance Certificate",
  //   category: "Medical",
  //   issueDate: "Jan 2024",
  //   expiryDate: "Jan 2027",
  //   issuingBody: "British Standards",
  //   image: null,
  //   description: "Pakistan Pharmacopoeia Codex compliance certification for our gauze pads and medical dressings meeting UK pharmaceutical standards.",
  // },
  // {
  //   id: "9",
  //   name: "USP Certification",
  //   category: "Medical",
  //   issueDate: "Apr 2023",
  //   expiryDate: "Apr 2026",
  //   issuingBody: "USP",
  //   image: null,
  //   description: "Pakistan Pharmacopeia certification ensuring our products meet the required standards for medical-grade materials.",
  // },
  // {
  //   id: "10",
  //   name: "REACH Compliance",
  //   category: "Quality",
  //   issueDate: "Jul 2023",
  //   expiryDate: "Ongoing",
  //   issuingBody: "ECHA",
  //   image: null,
  //   description: "Drug Regulatory Authority of Pakistan regulation compliance for chemical substances, ensuring safe use of chemicals in our manufacturing processes.",
  // },
  // {
  //   id: "11",
  //   name: "ISO 45001:2018 OH&S",
  //   category: "ISO",
  //   issueDate: "Nov 2023",
  //   expiryDate: "Nov 2026",
  //   issuingBody: "Lloyd's Register",
  //   image: null,
  //   description: "Occupational health and safety management systems certification, providing a framework for improving employee safety and reducing workplace risks.",
  // },
  {
    id: "12",
    name: "Certificate Of Enlistment",
    category: "Medical",
    issueDate: "Jan 2025",
    expiryDate: "Dec 2029",
    issuingBody: "DRAP",
    image: ["https://res.cloudinary.com/duo8ezh6a/image/upload/v1769623683/CamScanner_01-28-2026_22.57_1__page-0001_pclxoj.jpg","https://res.cloudinary.com/duo8ezh6a/image/upload/v1769623683/CamScanner_01-28-2026_22.57_1__page-0002_htmbks.jpg","https://res.cloudinary.com/duo8ezh6a/image/upload/v1769623683/CamScanner_01-28-2026_22.57_1__page-0003_jph5hz.jpg"],
    description: "License to manufacture and distribute Medical goods in Pakistan, meeting all regulatory requirements.",
  },
];

export const certificateCategories: CertificateCategory[] = [
  { id: "all", name: "All Certificates" },
  { id: "ISO", name: "ISO Certifications" },
  { id: "Quality", name: "Quality Standards" },
  { id: "Medical", name: "Medical Standards" },
];
