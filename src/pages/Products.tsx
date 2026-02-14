import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductHero } from "@/components/products/ProductHero";
import { useAirtableProducts } from "@/hooks/useAirtableProducts";
import { SEOHead } from "@/components/seo/SEOHead";
import { ProductStructuredData } from "@/components/seo/ProductStructuredData";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ProductsLoader } from "@/components/ui/ProductsLoader";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Fetch products from Airtable
  const { data, isLoading, error } = useAirtableProducts();
  const products = data?.products || [];
  const categories = data?.categories || [];

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Sort products
    const getLowestPrice = (product: typeof products[number]) => 
      product.sizes.length > 0 ? Math.min(...product.sizes.map(s => s.price)) : 0;
    
    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
        break;
      case "name":
      default:
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEOHead
          title="Medical Cotton Products Catalog"
          description="Browse our complete range of premium medical cotton products including cotton bandages, gauze pads, crepe bandages, and cotton wool. All products are ISO 13485 certified."
          canonical="/products"
          ogType="website"
          keywords={[
            "cotton bandages",
            "gauze pads",
            "crepe bandages",
            "cotton wool",
            "medical supplies",
            "wound dressings",
            "surgical cotton",
            "medical textiles",
          ]}
        />
        <ProductStructuredData products={filteredProducts} />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "/" },
            { name: "Products", url: "/products" },
          ]}
        />
        <Navbar />
        <main>
          <ProductHero />
          
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8">
              {/* Loading State */}
              {isLoading ? (
                <ProductsLoader />
              ) : error ? (
                <div className="text-center py-24">
                  <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Failed to Load Products
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    We couldn't fetch the products. This might be due to a connection issue.
                    Please try again.
                  </p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              ) : products.length === 0 && !searchQuery && selectedCategory === "all" ? (
                <div className="text-center py-24">
                  <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Products Available
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Products haven't been loaded yet. Please make sure Airtable is configured correctly
                    and products have been migrated.
                  </p>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh Page
                  </Button>
                </div>
              ) : (
                <>
                  {/* Filters */}
                  <ProductFilters
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    totalProducts={filteredProducts.length}
                  />

                  {/* Products Grid */}
                  <motion.div
                    layout
                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* No Results */}
                  {filteredProducts.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-16"
                    >
                      <p className="text-xl text-muted-foreground mb-4">
                        No products found matching your criteria.
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCategory("all");
                          setSearchQuery("");
                        }}
                        className="text-primary hover:underline"
                      >
                        Clear filters
                      </button>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Products;
