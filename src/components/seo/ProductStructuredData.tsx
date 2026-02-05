import { Helmet } from "react-helmet-async";
import { Product } from "@/data/products";

interface ProductStructuredDataProps {
  products: Product[];
}

export const ProductStructuredData = ({ products }: ProductStructuredDataProps) => {
  const baseUrl = "https://sultanbandages.com";

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => {
      const lowestPrice = Math.min(...product.sizes.map(s => s.price));
      const highestPrice = Math.max(...product.sizes.map(s => s.price));
      
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          "@id": `${baseUrl}/products#${product.id}`,
          name: product.name,
          description: product.description,
          category: product.category,
          offers: {
            "@type": "AggregateOffer",
            lowPrice: lowestPrice,
            highPrice: highestPrice,
            priceCurrency: "PKR",
            availability: product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            offerCount: product.sizes.length,
            seller: {
              "@type": "Organization",
              name: "Sultan Cotton & Bandages",
            },
          },
          brand: {
            "@type": "Brand",
            name: "Sultan Bandages",
          },
          manufacturer: {
            "@type": "Organization",
            name: "Sultan Cotton & Bandages",
          },
        },
      };
    }),
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
  const baseUrl = "https://sultanbandages.com";
  const lowestPrice = Math.min(...product.sizes.map(s => s.price));
  const highestPrice = Math.max(...product.sizes.map(s => s.price));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${baseUrl}/products#${product.id}`,
    name: product.name,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: lowestPrice,
      highPrice: highestPrice,
      priceCurrency: "PKR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      offerCount: product.sizes.length,
      seller: {
        "@type": "Organization",
        name: "Sultan Cotton & Bandages",
      },
    },
    brand: {
      "@type": "Brand",
      name: "Sultan Bandages",
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
