import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ShoppingCart,
  Loader2,
  Search,
  Eye,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Package,
  Calendar,
  DollarSign,
  Ruler,
  Hash,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  fetchOrders,
  updateOrder,
  deleteOrder,
  fetchProducts,
  fetchProductSizes,
  AirtableOrder,
} from '@/lib/airtable';
import { toast } from 'sonner';

const ORDER_STATUSES = ['pending', 'active', 'delivered', 'closed'];

interface OrderRecord {
  id: string;
  fields: AirtableOrder;
  createdTime: string;
}

interface OrderWithDetails extends OrderRecord {
  productNames: string[];
  sizeNames: string[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Dialog states
  const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingOrder, setDeletingOrder] = useState<OrderWithDetails | null>(null);

  // Load orders
  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    try {
      const [ordersData, productsData, sizesData] = await Promise.all([
        fetchOrders(),
        fetchProducts(),
        fetchProductSizes(),
      ]);

      // Create lookup maps
      const productMap = new Map(productsData.map((p) => [p.id, p.fields.productName]));
      const sizeMap = new Map(sizesData.map((s) => [s.id, s.fields.size]));

      // Enrich orders with product and size names
      const enrichedOrders: OrderWithDetails[] = ordersData.map((order) => ({
        ...order,
        productNames: (order.fields.product || []).map(
          (id) => productMap.get(id) || 'Unknown Product'
        ),
        sizeNames: (order.fields.productSize || []).map(
          (id) => sizeMap.get(id) || 'Unknown Size'
        ),
      }));

      setOrders(enrichedOrders);
    } catch (error) {
      toast.error('Failed to load orders');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.fields.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.fields.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.fields.phone?.includes(searchTerm);
    const matchesStatus =
      selectedStatus === 'all' || order.fields.orderstatus === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // View order details
  function handleView(order: OrderWithDetails) {
    setSelectedOrder(order);
    setIsViewOpen(true);
  }

  // Handle delete confirmation
  function handleDeleteClick(order: OrderWithDetails) {
    setDeletingOrder(order);
    setIsDeleteOpen(true);
  }

  // Update order status
  async function handleStatusChange(orderId: string, newStatus: string) {
    setSaving(true);
    try {
      await updateOrder(orderId, { orderstatus: newStatus as AirtableOrder['orderstatus'] });
      toast.success('Order status updated');
      loadOrders();
    } catch (error) {
      toast.error('Failed to update order status');
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  // Delete order
  async function handleDelete() {
    if (!deletingOrder) return;

    setSaving(true);
    try {
      await deleteOrder(deletingOrder.id);
      toast.success('Order deleted successfully');
      setIsDeleteOpen(false);
      setDeletingOrder(null);
      loadOrders();
    } catch (error) {
      toast.error('Failed to delete order');
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  // Get status badge variant
  function getStatusColor(status: string) {
    switch (status) {
      case 'pending':
        return 'border-yellow-500 text-yellow-500 bg-yellow-500/10';
      case 'active':
        return 'border-cyan-500 text-cyan-500 bg-cyan-500/10';
      case 'delivered':
        return 'border-green-500 text-green-500 bg-green-500/10';
      case 'closed':
        return 'border-slate-500 text-slate-500 bg-slate-500/10';
      default:
        return 'border-slate-500 text-slate-500';
    }
  }

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.fields.orderstatus === 'pending').length,
    active: orders.filter((o) => o.fields.orderstatus === 'active').length,
    delivered: orders.filter((o) => o.fields.orderstatus === 'delivered').length,
    totalRevenue: orders
      .filter((o) => o.fields.orderstatus === 'delivered')
      .reduce((sum, o) => sum + (o.fields.totalamount || 0), 0),
  };

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
      <h1 className="text-2xl lg:text-3xl font-bold text-white">Manage Orders</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-slate-400">Total Orders</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-yellow-400">Pending</p>
            <p className="text-2xl font-bold text-white">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-cyan-400">Active</p>
            <p className="text-2xl font-bold text-white">{stats.active}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-green-400">Delivered</p>
            <p className="text-2xl font-bold text-white">{stats.delivered}</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700 col-span-2 lg:col-span-1">
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-slate-400">Total Revenue</p>
            <p className="text-2xl font-bold text-green-400">Rs. {stats.totalRevenue.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all" className="text-white">All Statuses</SelectItem>
            {ORDER_STATUSES.map((status) => (
              <SelectItem key={status} value={status} className="text-white capitalize">
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table - Desktop */}
      <div className="hidden lg:block">
        <Card className="bg-slate-800 border-slate-700">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-400">Customer</TableHead>
                <TableHead className="text-slate-400">Product</TableHead>
                <TableHead className="text-slate-400">Amount</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Date</TableHead>
                <TableHead className="text-slate-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id} className="border-slate-700">
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{order.fields.customerName}</p>
                      <p className="text-sm text-slate-400">{order.fields.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-white truncate max-w-[200px]">
                        {order.productNames.join(', ') || 'N/A'}
                      </p>
                      <p className="text-sm text-slate-400">
                        {order.sizeNames.join(', ') || 'N/A'}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-green-400 font-semibold">
                    Rs. {order.fields.totalamount?.toLocaleString() || 0}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.fields.orderstatus}
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                      disabled={saving}
                    >
                      <SelectTrigger className={`w-32 border ${getStatusColor(order.fields.orderstatus)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {ORDER_STATUSES.map((status) => (
                          <SelectItem key={status} value={status} className="text-white capitalize">
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {new Date(order.createdTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        onClick={() => handleView(order)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white h-8 w-8"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => handleDeleteClick(order)}
                        className="bg-rose-600 hover:bg-rose-500 text-white h-8 w-8"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Orders Cards - Mobile */}
      <div className="lg:hidden space-y-4">
        {filteredOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-white">{order.fields.customerName}</p>
                    <p className="text-sm text-slate-400">{order.fields.email}</p>
                  </div>
                  <Badge className={getStatusColor(order.fields.orderstatus)}>
                    {order.fields.orderstatus}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Package className="w-4 h-4" />
                    <span className="truncate">{order.productNames.join(', ') || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-green-400 font-semibold">
                      Rs. {order.fields.totalamount?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(order.createdTime).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Select
                    value={order.fields.orderstatus}
                    onValueChange={(value) => handleStatusChange(order.id, value)}
                    disabled={saving}
                  >
                    <SelectTrigger className="flex-1 bg-slate-900 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {ORDER_STATUSES.map((status) => (
                        <SelectItem key={status} value={status} className="text-white capitalize">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="icon"
                    onClick={() => handleView(order)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleDeleteClick(order)}
                    className="bg-rose-600 hover:bg-rose-500 text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 mx-auto text-slate-600 mb-4" />
          <p className="text-slate-400">No orders found</p>
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
              Order Details
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Order placed on {selectedOrder && new Date(selectedOrder.createdTime).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-5">
              {/* Order Status */}
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                <span className="text-slate-400 text-sm">Order Status</span>
                <Badge className={`${getStatusColor(selectedOrder.fields.orderstatus)} px-4 py-1 text-sm capitalize`}>
                  {selectedOrder.fields.orderstatus}
                </Badge>
              </div>

              {/* Customer Information */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-400" />
                  Customer Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
                    <User className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">Name</p>
                      <p className="text-white truncate">{selectedOrder.fields.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
                    <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="text-white truncate">{selectedOrder.fields.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
                    <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">Phone</p>
                      <p className="text-white">{selectedOrder.fields.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
                    <Building2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">City</p>
                      <p className="text-white">{selectedOrder.fields.city}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-900 rounded-lg">
                  <MapPin className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Delivery Address</p>
                    <p className="text-white">{selectedOrder.fields.address}</p>
                  </div>
                </div>
              </div>

              {/* Products Ordered - Enhanced View */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-400" />
                  Products Ordered ({selectedOrder.productNames.length} {selectedOrder.productNames.length === 1 ? 'item' : 'items'})
                </h4>
                <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
                  {selectedOrder.productNames.length > 0 ? (
                    <div className="divide-y divide-slate-700">
                      {selectedOrder.productNames.map((name, idx) => (
                        <div key={idx} className="p-4 hover:bg-slate-800/50 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                              <Hash className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-white mb-1">{name}</p>
                              <div className="flex items-center gap-2 text-sm">
                                <Ruler className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-400">Size:</span>
                                <span className="text-emerald-400 font-medium">
                                  {selectedOrder.sizeNames[idx] || 'Not specified'}
                                </span>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                                Item {idx + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-slate-500">
                      <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                      <p>No products linked to this order</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl">
                <div>
                  <span className="text-slate-400 text-sm">Total Amount</span>
                  <p className="text-xs text-slate-500 mt-0.5">Including all items</p>
                </div>
                <span className="text-3xl font-bold text-emerald-400">
                  Rs. {selectedOrder.fields.totalamount?.toLocaleString() || 0}
                </span>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsViewOpen(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Order</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete this order from {deletingOrder?.fields.customerName}?
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
