import { Helmet } from "react-helmet-async";
import { Product } from "@/data/products";

interface ProductStructuredDataProps {
  products: Product[];
}

export const ProductStructuredData = ({ products }: ProductStructuredDataProps) => {
  const baseUrl = "https://medcotton.com"; // Replace with actual domain

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        "@id": `${baseUrl}/products#${product.id}`,
        name: product.name,
        description: product.description,
        category: product.category,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "USD",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: {
            "@type": "Organization",
            name: "MedCotton Industries",
          },
        },
        brand: {
          "@type": "Brand",
          name: "MedCotton",
        },
        manufacturer: {
          "@type": "Organization",
          name: "MedCotton Industries",
        },
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(productListSchema)}
      </script>
    </Helmet>
  );
};

interface SingleProductSchemaProps {
  product: Product;
}

export const SingleProductSchema = ({ product }: SingleProductSchemaProps) => {
  const baseUrl = "https://medcotton.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${baseUrl}/products#${product.id}`,
    name: product.name,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: product.price,
      highPrice: product.price * 1.5,
      priceCurrency: "USD",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      offerCount: product.sizes.length,
      seller: {
        "@type": "Organization",
        name: "MedCotton Industries",
      },
    },
    brand: {
      "@type": "Brand",
      name: "MedCotton",
    },
    additionalProperty: product.features.map((feature) => ({
      "@type": "PropertyValue",
      name: "Feature",
      value: feature,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
