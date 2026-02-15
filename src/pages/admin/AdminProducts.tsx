import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Upload,
  CheckCircle2,
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
import {
  uploadToCloudinary,
  isValidImageFile,
  formatFileSize,
  UploadProgress,
} from '@/lib/cloudinary';
import { toast } from 'sonner';

const CATEGORIES = [
  'Gauze Pads',
  'Gauze Lint',
  'Crepe Bandages',
  'Cotton Wool',
  'Plaster Of Paris',
  'Gauze Roll',
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

  // Image upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
      product.fields.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Open form for new product
  function handleAddNew() {
    setEditingProduct(null);
    setFormData(defaultFormData);
    setSizes([{ size: '', price: 0 }]);
    setSelectedFile(null);
    setUploadProgress(null);
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
      shelfLife: product.fields.shelfLife || '',
      storageCondition: product.fields.storageCondition || '',
      precautions: product.fields.precautions || '',
    });
    setSizes(
      product.sizes.length > 0
        ? product.sizes.map((s) => ({ size: s.fields.size, price: s.fields.price }))
        : [{ size: '', price: 0 }]
    );
    setSelectedFile(null);
    setUploadProgress(null);
    setIsFormOpen(true);
  }

  // Handle file selection
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF, WebP, or SVG)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setUploadProgress(null);
  }

  // Upload image to Cloudinary
  async function handleImageUpload() {
    if (!selectedFile) return;

    setUploadingImage(true);
    setUploadProgress({ loaded: 0, total: 100, percentage: 0 });

    try {
      const result = await uploadToCloudinary(
        selectedFile,
        'products',
        (progress) => setUploadProgress(progress)
      );

      setFormData({ ...formData, productImage: result.secure_url });
      setSelectedFile(null);
      setUploadProgress(null);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  }

  // Remove selected file
  function handleRemoveFile() {
    setSelectedFile(null);
    setUploadProgress(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
    
    // Auto-upload image if a file is selected but not yet uploaded
    let finalFormData = { ...formData };
    if (selectedFile && !formData.productImage) {
      try {
        toast.info('Uploading image...');
        const result = await uploadToCloudinary(selectedFile, 'products');
        finalFormData.productImage = result.secure_url;
        setSelectedFile(null);
        toast.success('Image uploaded successfully');
      } catch (error) {
        console.error('Image upload error:', error);
        toast.error('Failed to upload image. Product will be created without image.');
      }
    }

    try {
      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct.id, finalFormData);

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
        const newProduct = await createProduct(finalFormData);

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
              <SelectItem key={cat} value={cat} className="text-white">
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

              {/* Product Image Upload Section */}
              <div className="space-y-3">
                <Label className="text-slate-300">Product Image</Label>
                
                {/* Current Image Preview */}
                {formData.productImage && (
                  <div className="relative w-full h-40 bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                    <img
                      src={formData.productImage}
                      alt="Product preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, productImage: '' })}
                      className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-500 rounded-full text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-emerald-600/90 rounded text-xs text-white flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Uploaded
                    </div>
                  </div>
                )}

                {/* File Upload Area */}
                {!formData.productImage && (
                  <div className="space-y-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    
                    {!selectedFile ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-32 border-2 border-dashed border-slate-600 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-emerald-500 hover:bg-slate-800/50 transition-colors"
                      >
                        <Upload className="w-8 h-8 text-slate-400" />
                        <span className="text-sm text-slate-400">Click to upload image</span>
                        <span className="text-xs text-slate-500">JPEG, PNG, GIF, WebP (max 10MB)</span>
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <ImageIcon className="w-8 h-8 text-emerald-500" />
                            <div>
                              <p className="text-sm text-white truncate max-w-[200px]">{selectedFile.name}</p>
                              <p className="text-xs text-slate-400">{formatFileSize(selectedFile.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {uploadProgress && (
                          <div className="mb-3">
                            <Progress value={uploadProgress.percentage} className="h-2" />
                            <p className="text-xs text-slate-400 mt-1">{uploadProgress.percentage}% uploaded</p>
                          </div>
                        )}

                        <Button
                          type="button"
                          onClick={handleImageUpload}
                          disabled={uploadingImage}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
                        >
                          {uploadingImage ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload to Cloud
                            </>
                          )}
                        </Button>
                      </div>
                    )}

                    {/* Or enter URL manually */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-700" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-slate-800 px-2 text-slate-500">Or enter URL</span>
                      </div>
                    </div>

                    <Input
                      value={formData.productImage}
                      onChange={(e) =>
                        setFormData({ ...formData, productImage: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="bg-slate-900 border-slate-700 text-white"
                    />
                  </div>
                )}
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
