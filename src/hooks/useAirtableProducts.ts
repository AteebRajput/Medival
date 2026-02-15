import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductSizes, isAirtableConfigured } from '@/lib/airtable';

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

export function useAirtableProducts() {
  return useQuery({
    queryKey: ['airtable-products'],
    queryFn: async () => {
      // Check if Airtable is configured
      if (!isAirtableConfigured()) {
        console.warn('Airtable is not configured. Please check your environment variables.');
        return { products: [], categories: [{ id: 'all', name: 'All Products', count: 0 }] };
      }

      try {
        const [productsData, sizesData] = await Promise.all([
          fetchProducts(),
          fetchProductSizes(),
        ]);

        console.log('Fetched products:', productsData.length);
        console.log('Fetched sizes:', sizesData.length);

        // Transform Airtable data to match the Product interface
        const products: Product[] = productsData.map((record) => {
          // Find sizes for this product
          const productSizes = sizesData
            .filter((size) => size.fields.product?.includes(record.id))
            .map((size) => ({
              size: size.fields.size || '',
              price: size.fields.price || 0,
            }));

          return {
            id: record.id,
            name: record.fields.productName || '',
            description: record.fields.productDiscription || '',
            category: record.fields.category || '',
            sizes: productSizes,
            image: record.fields.productImage || null,
            inStock: productSizes.length > 0,
            shelfLife: record.fields.shelfLife || '',
            storageCondition: record.fields.storageCondition || '',
            precautions: record.fields.precautions || '',
            comingSoon: productSizes.some((s) => s.price === 0),
          };
        });

        // Generate categories from products
        const categoryMap = new Map<string, number>();
        products.forEach((product) => {
          const cat = product.category;
          if (cat) {
            categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
          }
        });

        const categories: Category[] = [
          { id: 'all', name: 'All Products', count: products.length },
          ...Array.from(categoryMap.entries()).map(([name, count]) => ({
            id: name,
            name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize
            count,
          })),
        ];

        return { products, categories };
      } catch (error) {
        console.error('Error fetching products from Airtable:', error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
