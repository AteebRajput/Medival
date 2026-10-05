// Footer product links. Each entry deep-links to /products?product=<slug>,
// and is matched against Airtable product names using keywords.
export interface ProductLink {
  name: string;
  slug: string;
  keywords: string[];
  exclude?: string[];
}

export const productLinks: ProductLink[] = [
  { name: "Cotton Bandage Roll", slug: "cotton-bandage-roll", keywords: ["cotton bandage"] },
  { name: "Cotton Crepe Bandage BP", slug: "cotton-crepe-bandage-bp", keywords: ["crepe"] },
  { name: "Absorbent Cotton Wool", slug: "absorbent-cotton-wool", keywords: ["cotton wool"] },
  { name: "Absorbent Gauze Roll BPC", slug: "absorbent-gauze-roll-bpc", keywords: ["gauze"], exclude: ["pad", "lint"] },
  { name: "Lint Gauze BPC", slug: "lint-gauze-bpc", keywords: ["lint"] },
  { name: "Pearl White Absorb Surgical Gauze Pads BPC", slug: "surgical-gauze-pads-bpc", keywords: ["surgical", "pad"] },
  { name: "Pearl White Absorbent Gauze Pad USP TYPE-IV", slug: "gauze-pad-usp-type-iv", keywords: ["usp"] },
];

const normalize = (value: string) =>
  value.toLowerCase().replace(/\./g, "").replace(/[^a-z0-9]+/g, " ").trim();

export const productHref = (slug: string) => `/products?product=${slug}`;

export function findProductBySlug<T extends { name: string }>(products: T[], slug: string): T | undefined {
  const link = productLinks.find((l) => l.slug === slug);
  if (!link) return undefined;
  return products.find((product) => {
    const name = normalize(product.name);
    return (
      link.keywords.every((k) => name.includes(k)) &&
      !(link.exclude ?? []).some((k) => name.includes(k))
    );
  });
}
