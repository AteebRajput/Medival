import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Award, 
  ShoppingCart, 
  TrendingUp, 
  Clock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  fetchProducts, 
  fetchCertificates, 
  fetchOrders, 
  isAirtableConfigured,
  AirtableOrder
} from '@/lib/airtable';

interface Stats {
  totalProducts: number;
  totalCertificates: number;
  totalOrders: number;
  pendingOrders: number;
  recentOrders: Array<{
    id: string;
    customerName: string;
    totalamount: number;
    orderstatus: string;
    createdTime: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalCertificates: 0,
    totalOrders: 0,
    pendingOrders: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const configured = isAirtableConfigured();

  useEffect(() => {
    async function loadStats() {
      if (!configured) {
        setLoading(false);
        return;
      }

      try {
        const [products, certificates, orders] = await Promise.all([
          fetchProducts(),
          fetchCertificates(),
          fetchOrders(),
        ]);

        const pendingOrders = orders.filter(
          (o) => o.fields.orderstatus === 'pending'
        ).length;

        setStats({
          totalProducts: products.length,
          totalCertificates: certificates.length,
          totalOrders: orders.length,
          pendingOrders,
          recentOrders: orders.slice(0, 5).map((o) => ({
            id: o.id,
            customerName: o.fields.customerName,
            totalamount: o.fields.totalamount,
            orderstatus: o.fields.orderstatus,
            createdTime: o.createdTime,
          })),
        });
      } catch (err) {
        setError('Failed to load dashboard data. Please check your Airtable configuration.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [configured]);

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'from-emerald-500 to-emerald-600',
      href: '/admin/products',
    },
    {
      title: 'Certificates',
      value: stats.totalCertificates,
      icon: Award,
      color: 'from-green-500 to-green-600',
      href: '/admin/certificates',
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/orders',
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      href: '/admin/orders',
    },
  ];

  if (!configured) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Dashboard</h1>
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-500">Airtable Configuration Required</h3>
                <p className="text-slate-400 mt-2">
                  Please update your <code className="bg-slate-800 px-2 py-1 rounded">.env</code> file with your Airtable Base ID:
                </p>
                <pre className="mt-3 p-4 bg-slate-900 rounded-lg text-sm text-slate-300 overflow-x-auto">
{`VITE_AIRTABLE_API_KEY=your_api_key
VITE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX`}
                </pre>
                <p className="text-slate-400 mt-3 text-sm">
                  You can find your Base ID in your Airtable URL when viewing the base.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Dashboard</h1>
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold text-red-500">Error Loading Dashboard</h3>
                <p className="text-slate-400 mt-2">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400">Welcome back, Administrator</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={stat.href}>
              <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{stat.title}</p>
                      <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold text-white">Recent Orders</CardTitle>
          <Link to="/admin/orders">
            <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {stats.recentOrders.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-900/50 rounded-lg gap-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{order.customerName}</p>
                      <p className="text-sm text-slate-400">
                        {new Date(order.createdTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-14 sm:ml-0">
                    <p className="font-semibold text-green-400">
                      Rs. {order.totalamount?.toLocaleString() || 0}
                    </p>
                    <Badge
                      variant="outline"
                      className={
                        order.orderstatus === 'delivered'
                          ? 'border-emerald-500 text-emerald-500'
                          : order.orderstatus === 'pending'
                          ? 'border-yellow-500 text-yellow-500'
                          : order.orderstatus === 'active'
                          ? 'border-cyan-500 text-cyan-500'
                          : 'border-slate-500 text-slate-500'
                      }
                    >
                      {order.orderstatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/admin/products">
          <Card className="bg-slate-800 border-slate-700 hover:border-emerald-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Package className="w-8 h-8 text-emerald-500" />
                <div>
                  <p className="font-medium text-white">Add New Product</p>
                  <p className="text-sm text-slate-400">Create a new product listing</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/certificates">
          <Card className="bg-slate-800 border-slate-700 hover:border-green-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Award className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-medium text-white">Add Certificate</p>
                  <p className="text-sm text-slate-400">Upload a new certificate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/admin/orders">
          <Card className="bg-slate-800 border-slate-700 hover:border-purple-500/50 transition-colors cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <TrendingUp className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="font-medium text-white">View Analytics</p>
                  <p className="text-sm text-slate-400">Check order statistics</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
