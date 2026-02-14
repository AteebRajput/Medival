import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, CheckCircle2, ShoppingCart, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createOrder, isAirtableConfigured, fetchProductSizes } from '@/lib/airtable';
import { useNotifications } from '@/contexts/NotificationContext';
import { toast } from 'sonner';

interface ProductSize {
  size: string;
  price: number;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    sizes: ProductSize[];
    image: string | null;
  } | null;
}

interface OrderFormData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

const PAKISTAN_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Sukkur',
  'Larkana',
  'Sheikhupura',
  'Jhang',
  'Rahim Yar Khan',
  'Gujrat',
  'Mardan',
  'Kasur',
  'Dera Ghazi Khan',
  'Sahiwal',
  'Nawabshah',
  'Mirpur Khas',
  'Other',
];

const defaultFormData: OrderFormData = {
  customerName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
};

export default function OrderModal({ isOpen, onClose, product }: OrderModalProps) {
  const [formData, setFormData] = useState<OrderFormData>(defaultFormData);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addNotification } = useNotifications();

  const selectedSizeData = product?.sizes.find((s) => s.size === selectedSize);
  const totalAmount = (selectedSizeData?.price || 0) * quantity;

  function handleClose() {
    setFormData(defaultFormData);
    setSelectedSize('');
    setQuantity(1);
    setSuccess(false);
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!product || !selectedSize || !selectedSizeData) {
      toast.error('Please select a product size');
      return;
    }

    if (!formData.customerName || !formData.email || !formData.phone || !formData.address || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate phone number
    const phoneRegex = /^(\+92|0)?[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid Pakistani phone number');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      if (isAirtableConfigured()) {
        // Find the productSize record ID from Airtable
        let productSizeId: string | null = null;
        
        try {
          const allSizes = await fetchProductSizes(product.id);
          const matchingSize = allSizes.find(
            (s) => s.fields.size === selectedSize && s.fields.product?.includes(product.id)
          );
          if (matchingSize) {
            productSizeId = matchingSize.id;
          }
        } catch (sizeError) {
          console.log('Could not find productSize, creating order without size link');
        }

        // Create order in Airtable with proper links
        await createOrder({
          customerName: formData.customerName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          totalamount: totalAmount,
          orderstatus: 'pending',
          product: [product.id], // Link to the product
          productSize: productSizeId ? [productSizeId] : [], // Link to the productSize if found
        });
      }

      // Add notification for admin
      addNotification({
        orderId: `order-${Date.now()}`,
        customerName: formData.customerName,
        productName: product.name,
        productSize: selectedSize,
        totalAmount,
      });

      setSuccess(true);
      toast.success('Order placed successfully!');

      // Auto close after success
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-white max-h-[90vh]">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-12 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h3>
              <p className="text-gray-600 mb-4">
                Thank you for your order. We will contact you shortly to confirm.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-left max-w-sm mx-auto">
                <p className="text-sm text-gray-500">Order Summary</p>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">Size: {selectedSize}</p>
                <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                <p className="font-bold text-green-600 mt-2">Total: Rs. {totalAmount.toLocaleString()}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  Place Order
                </DialogTitle>
                <DialogDescription>
                  Fill in your details to order this product
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="max-h-[60vh] pr-4">
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                  {/* Product Info */}
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">Select size and quantity below</p>
                    </div>
                  </div>

                  {/* Size and Quantity */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Size *</Label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes.map((size) => (
                            <SelectItem key={size.size} value={size.size}>
                              {size.size} - Rs. {size.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity *</Label>
                      <Input
                        type="number"
                        min={1}
                        max={100}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                    </div>
                  </div>

                  {/* Price Display */}
                  {selectedSizeData && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Amount</span>
                        <span className="text-2xl font-bold text-green-600">
                          Rs. {totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Customer Details */}
                  <div className="border-t pt-4">
                    <p className="font-medium text-gray-900 mb-3">Customer Details</p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Full Name *</Label>
                        <Input
                          value={formData.customerName}
                          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Email *</Label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone *</Label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="03XX XXXXXXX"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>City *</Label>
                        <Select
                          value={formData.city}
                          onValueChange={(value) => setFormData({ ...formData, city: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                          <SelectContent>
                            {PAKISTAN_CITIES.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Delivery Address *</Label>
                        <Textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Enter your complete delivery address"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </ScrollArea>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !selectedSize}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Place Order
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
