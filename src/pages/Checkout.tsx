import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Truck, 
  ShoppingBag, 
  Package,
  CheckCircle,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import { createOrder, isAirtableConfigured, fetchProductSizes } from "@/lib/airtable";
import { useNotifications } from "@/contexts/NotificationContext";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate phone
    const phoneRegex = /^(\+92|0)?[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order in Airtable for each cart item
      if (isAirtableConfigured()) {
        // First, fetch all product sizes to look up their IDs
        const allProductSizes = await fetchProductSizes();
        
        // Create a map of productId + size -> productSizeId for quick lookup
        const productSizeMap = new Map<string, string>();
        allProductSizes.forEach((ps) => {
          const productIds = ps.fields.product || [];
          productIds.forEach((productId) => {
            const key = `${productId}::${ps.fields.size}`;
            productSizeMap.set(key, ps.id);
          });
        });

        // Collect all product IDs and their size IDs for a single combined order
        const productIds: string[] = [];
        const productSizeIds: string[] = [];
        let totalOrderAmount = 0;
        const orderItems: { name: string; size: string; amount: number }[] = [];

        // Process each cart item
        for (const item of items) {
          // Add product ID
          productIds.push(item.productId);
          
          // Look up productSize ID
          const sizeKey = `${item.productId}::${item.size}`;
          const productSizeId = productSizeMap.get(sizeKey);
          if (productSizeId) {
            productSizeIds.push(productSizeId);
          }
          
          totalOrderAmount += item.price * item.quantity;
          orderItems.push({
            name: item.productName,
            size: item.size,
            amount: item.price * item.quantity,
          });
        }

        // Create a single order with all products and sizes
        await createOrder({
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address + (formData.notes ? ` (Notes: ${formData.notes})` : ''),
          city: formData.city,
          totalamount: totalOrderAmount,
          orderstatus: 'pending',
          product: productIds, // Array of all product IDs
          productSize: productSizeIds, // Array of all productSize IDs
        });

        // Add notification for admin with all items
        const itemsSummary = orderItems.map(i => `${i.name} (${i.size})`).join(', ');
        addNotification({
          orderId: `order-${Date.now()}`,
          customerName: formData.name,
          productName: itemsSummary,
          productSize: orderItems.map(i => i.size).join(', '),
          totalAmount: totalOrderAmount,
        });

        toast.success("Order placed successfully!");
      } else {
        // If Airtable is not configured, just simulate success
        toast.warning("Order recorded locally (Airtable not configured)");
      }

      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <SEOHead title="Checkout - Sultan Cotton & Bandages" />
          <Navbar />
          <main className="pt-28 pb-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-24 h-24 rounded-full bg-secondary mx-auto flex items-center justify-center mb-6">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                </div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                  Your cart is empty
                </h1>
                <p className="text-muted-foreground mb-8">
                  Add products to your cart to proceed with checkout
                </p>
                <Button asChild size="lg" className="bg-gradient-medical hover:opacity-90">
                  <Link to="/products">
                    <Package className="w-5 h-5 mr-2" />
                    Browse Products
                  </Link>
                </Button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  if (isSuccess) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-background">
          <SEOHead title="Order Confirmed - Sultan Cotton & Bandages" />
          <Navbar />
          <main className="pt-28 pb-20">
            <div className="container mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-green-500/10 mx-auto flex items-center justify-center mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-green-500" />
                </motion.div>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
                  Order Placed Successfully!
                </h1>
                <p className="text-muted-foreground mb-8">
                  Thank you for your order. We will contact you shortly to confirm your order details.
                  Payment will be collected on delivery.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-gradient-medical hover:opacity-90">
                    <Link to="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/">
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <SEOHead
          title="Checkout - Sultan Cotton & Bandages"
          description="Complete your order for premium medical supplies"
        />
        <Navbar />
        
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Checkout Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                  Checkout
                </h1>
                <p className="text-muted-foreground mb-8">
                  Complete your order details below
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Personal Information
                    </h3>

                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name *"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Delivery Address
                    </h3>

                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                      <textarea
                        name="address"
                        placeholder="Full Address *"
                        required
                        rows={3}
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>

                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <textarea
                        name="notes"
                        placeholder="Order Notes (Optional)"
                        rows={2}
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      Payment Method
                    </h3>

                    <div className="p-4 bg-green-500/10 border-2 border-green-500/30 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-medical hover:opacity-90 text-white py-6 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Placing Order...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Place Order - Rs. {totalPrice.toLocaleString()}
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="sticky top-28 bg-card rounded-3xl border border-border p-6 lg:p-8">
                  <h2 className="text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    Order Summary
                  </h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div
                        key={`${item.productId}-${item.size}`}
                        className="flex gap-4 p-3 bg-secondary/30 rounded-xl"
                      >
                        <div className="w-16 h-16 rounded-lg bg-secondary overflow-hidden shrink-0">
                          {item.productImage ? (
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-6 h-6 text-muted-foreground/50" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground text-sm line-clamp-1">
                            {item.productName}
                          </h4>
                          <p className="text-xs text-muted-foreground">{item.size}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                            <span className="text-sm font-semibold text-primary">
                              Rs. {(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t border-border pt-4 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">Rs. {totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-500 font-medium">Free</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="text-lg font-semibold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        Rs. {totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-6 p-4 bg-primary/5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Free Delivery</p>
                        <p className="text-xs text-muted-foreground">
                          Delivery within 3-5 business days in Karachi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Checkout;
