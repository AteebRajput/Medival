import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Search,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProductSizes,
  createProductSize,
  updateProductSize,
  deleteProductSize,
  AirtableProduct,
  AirtableProductSize,
} from '@/lib/airtable';
import { toast } from 'sonner';

const CATEGORIES = [
  'cotton bandages',
  'gauze pads',
  'gauze lint',
  'crepe bandages',
  'cotton wool',
  'plaster of paris',
];

interface ProductWithSizes {
  id: string;
  fields: AirtableProduct;
  sizes: Array<{ id: string; fields: AirtableProductSize }>;
  createdTime: string;
}

interface ProductFormData {
  productName: string;
  productDiscription: string;
  productImage: string;
  category: string;
  features: string;
  shelfLife: string;
  storageCondition: string;
  precautions: string;
}

interface SizeFormData {
  size: string;
  price: number;
}

const defaultFormData: ProductFormData = {
  productName: '',
  productDiscription: '',
  productImage: '',
  category: '',
  features: '',
  shelfLife: '',
  storageCondition: '',
  precautions: '',
};

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductWithSizes[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithSizes | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<ProductWithSizes | null>(null);

  // Form state
  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);
  const [sizes, setSizes] = useState<SizeFormData[]>([{ size: '', price: 0 }]);

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const [productsData, sizesData] = await Promise.all([
        fetchProducts(),
        fetchProductSizes(),
      ]);

      const productsWithSizes: ProductWithSizes[] = productsData.map((product) => ({
        ...product,
        sizes: sizesData.filter((size) =>
          size.fields.product?.includes(product.id)
        ),
      }));

      setProducts(productsWithSizes);
    } catch (error) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.fields.productName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      product.fields.category?.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Open form for new product
  function handleAddNew() {
    setEditingProduct(null);
    setFormData(defaultFormData);
    setSizes([{ size: '', price: 0 }]);
    setIsFormOpen(true);
  }

  // Open form for editing
  function handleEdit(product: ProductWithSizes) {
    setEditingProduct(product);
    setFormData({
      productName: product.fields.productName || '',
      productDiscription: product.fields.productDiscription || '',
      productImage: product.fields.productImage || '',
      category: product.fields.category || '',
      features: product.fields.features || '',
      shelfLife: product.fields.shelfLife || '',
      storageCondition: product.fields.storageCondition || '',
      precautions: product.fields.precautions || '',
    });
    setSizes(
      product.sizes.length > 0
        ? product.sizes.map((s) => ({ size: s.fields.size, price: s.fields.price }))
        : [{ size: '', price: 0 }]
    );
    setIsFormOpen(true);
  }

  // Handle delete confirmation
  function handleDeleteClick(product: ProductWithSizes) {
    setDeletingProduct(product);
    setIsDeleteOpen(true);
  }

  // Save product
  async function handleSave() {
    if (!formData.productName || !formData.category) {
      toast.error('Please fill in required fields');
      return;
    }

    setSaving(true);
    try {
      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct.id, formData);

        // Update sizes - delete old ones and create new ones
        for (const oldSize of editingProduct.sizes) {
          await deleteProductSize(oldSize.id);
        }

        for (const size of sizes) {
          if (size.size && size.price >= 0) {
            await createProductSize({
              size: size.size,
              price: size.price,
              product: [editingProduct.id],
            });
          }
        }

        toast.success('Product updated successfully');
      } else {
        // Create new product
        const newProduct = await createProduct(formData);

        // Create sizes
        for (const size of sizes) {
          if (size.size && size.price >= 0) {
            await createProductSize({
              size: size.size,
              price: size.price,
              product: [newProduct.id],
            });
          }
        }

        toast.success('Product created successfully');
      }

      setIsFormOpen(false);
      loadProducts();
    } catch (error) {
      toast.error('Failed to save product');
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  // Delete product
  async function handleDelete() {
    if (!deletingProduct) return;

    setSaving(true);
    try {
      // Delete all sizes first
      for (const size of deletingProduct.sizes) {
        await deleteProductSize(size.id);
      }

      // Delete product
      await deleteProduct(deletingProduct.id);

      toast.success('Product deleted successfully');
      setIsDeleteOpen(false);
      setDeletingProduct(null);
      loadProducts();
    } catch (error) {
      toast.error('Failed to delete product');
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  // Add size row
  function addSizeRow() {
    setSizes([...sizes, { size: '', price: 0 }]);
  }

  // Remove size row
  function removeSizeRow(index: number) {
    if (sizes.length > 1) {
      setSizes(sizes.filter((_, i) => i !== index));
    }
  }

  // Update size row
  function updateSizeRow(index: number, field: 'size' | 'price', value: string | number) {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizes(newSizes);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Manage Products</h1>
        <Button onClick={handleAddNew} className="bg-emerald-600 hover:bg-emerald-500 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-white">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat} className="text-white capitalize">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <div className="aspect-video bg-slate-900 relative">
                  {product.fields.productImage ? (
                    <img
                      src={product.fields.productImage}
                      alt={product.fields.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-700" />
                    </div>
                  )}
                  <Badge className="absolute top-2 right-2 capitalize bg-emerald-600">
                    {product.fields.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white text-lg truncate">
                    {product.fields.productName}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                    {product.fields.productDiscription}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {product.sizes.slice(0, 3).map((size) => (
                      <Badge
                        key={size.id}
                        variant="outline"
                        className="text-xs border-slate-600 text-slate-300"
                      >
                        {size.fields.size} - Rs.{size.fields.price}
                      </Badge>
                    ))}
                    {product.sizes.length > 3 && (
                      <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                        +{product.sizes.length - 3} more
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(product)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDeleteClick(product)}
                      className="bg-rose-600 hover:bg-rose-500 text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-slate-600 mb-4" />
          <p className="text-slate-400">No products found</p>
        </div>
      )}

      {/* Product Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Fill in the product details below
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Product Name *</Label>
                  <Input
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat} className="text-white capitalize">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Product Image URL</Label>
                <Input
                  value={formData.productImage}
                  onChange={(e) =>
                    setFormData({ ...formData, productImage: e.target.value })
                  }
                  placeholder="https://..."
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Description</Label>
                <Textarea
                  value={formData.productDiscription}
                  onChange={(e) =>
                    setFormData({ ...formData, productDiscription: e.target.value })
                  }
                  className="bg-slate-900 border-slate-700 text-white min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Features (one per line)</Label>
                <Textarea
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  placeholder="Enter features, one per line..."
                  className="bg-slate-900 border-slate-700 text-white min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Shelf Life</Label>
                  <Input
                    value={formData.shelfLife}
                    onChange={(e) =>
                      setFormData({ ...formData, shelfLife: e.target.value })
                    }
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Storage Condition</Label>
                  <Input
                    value={formData.storageCondition}
                    onChange={(e) =>
                      setFormData({ ...formData, storageCondition: e.target.value })
                    }
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Precautions</Label>
                <Textarea
                  value={formData.precautions}
                  onChange={(e) =>
                    setFormData({ ...formData, precautions: e.target.value })
                  }
                  className="bg-slate-900 border-slate-700 text-white min-h-[60px]"
                />
              </div>

              {/* Sizes Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-slate-300">Product Sizes</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSizeRow}
                    className="border-slate-600 text-slate-300"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Size
                  </Button>
                </div>
                {sizes.map((size, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1 space-y-1">
                      <Label className="text-xs text-slate-400">Size</Label>
                      <Input
                        value={size.size}
                        onChange={(e) => updateSizeRow(index, 'size', e.target.value)}
                        placeholder="e.g., 10 CM × 10 CM"
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    <div className="w-32 space-y-1">
                      <Label className="text-xs text-slate-400">Price (Rs.)</Label>
                      <Input
                        type="number"
                        value={size.price}
                        onChange={(e) =>
                          updateSizeRow(index, 'price', parseFloat(e.target.value) || 0)
                        }
                        className="bg-slate-900 border-slate-700 text-white"
                      />
                    </div>
                    {sizes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSizeRow(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsFormOpen(false)}
              className="border-slate-600 text-slate-300"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-emerald-600 hover:bg-emerald-500 text-white">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingProduct ? 'Update' : 'Create'} Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Product</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete "{deletingProduct?.fields.productName}"?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-600 text-slate-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={saving}
              className="bg-red-600 hover:bg-red-500"
            >
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
