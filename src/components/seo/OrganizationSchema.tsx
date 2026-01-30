import { Helmet } from "react-helmet-async";

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://sultanbandages.com/#organization",
    name: "Sultan Bandages",
    alternateName: "Sultan Bandages",
    url: "https://sultanbandages.com",
    logo: "https://sultanbandages.com/logo.png",
    description:
      "Premium manufacturer of medical cotton products including bandages, gauze pads, cotton wool, and crepe bandages. ISO 13485 certified with 25+ years of excellence.",
    foundingDate: "1998",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 500,
      maxValue: 600,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Industrial Area, Sector 42",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-22-4567-8900",
        contactType: "sales",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-22-4567-8901",
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [
      "https://facebook.com/sultanbandages",
      "https://linkedin.com/company/sultanbandages",
      "https://twitter.com/sultanbandages",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "ISO 13485:2016",
        recognizedBy: {
          "@type": "Organization",
          name: "ISO",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "CE Marking",
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "certification",
        name: "FDA 510(k)",
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
