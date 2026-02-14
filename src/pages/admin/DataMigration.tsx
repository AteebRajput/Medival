import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Database, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  AlertTriangle,
  Package,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  bulkCreateProducts, 
  bulkCreateProductSizes, 
  bulkCreateCertificates,
  isAirtableConfigured,
  AirtableProduct,
  AirtableProductSize,
  AirtableCertificate,
} from '@/lib/airtable';
import { products as localProducts } from '@/data/products';
import { certificates as localCertificates } from '@/data/certificates';
import { toast } from 'sonner';

interface MigrationLog {
  type: 'info' | 'success' | 'error';
  message: string;
  timestamp: Date;
}

export default function DataMigration() {
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<MigrationLog[]>([]);
  const [completed, setCompleted] = useState({
    products: false,
    sizes: false,
    certificates: false,
  });

  const addLog = (type: MigrationLog['type'], message: string) => {
    setLogs(prev => [...prev, { type, message, timestamp: new Date() }]);
  };

  async function migrateProducts() {
    addLog('info', 'Starting product migration...');
    setProgress(10);

    const airtableProducts: AirtableProduct[] = localProducts.map(product => ({
      productName: product.name,
      productDiscription: product.description,
      productImage: product.image || '',
      category: product.category.toLowerCase(),
      features: product.features.join('\n'),
      shelfLife: product.shelfLife,
      storageCondition: product.storageCondition,
      precautions: product.precautions,
      inStock: product.inStock,
      comingSoon: product.comingSoon,
    }));

    try {
      const createdProducts = await bulkCreateProducts(airtableProducts);
      addLog('success', `Created ${createdProducts.length} products in Airtable`);
      setProgress(40);
      setCompleted(prev => ({ ...prev, products: true }));

      // Now create sizes linked to products
      addLog('info', 'Creating product sizes...');
      const allSizes: AirtableProductSize[] = [];

      for (let i = 0; i < localProducts.length; i++) {
        const localProduct = localProducts[i];
        const airtableProduct = createdProducts[i];

        for (const size of localProduct.sizes) {
          allSizes.push({
            size: size.size,
            price: size.price,
            product: [airtableProduct.id],
          });
        }
      }

      const createdSizes = await bulkCreateProductSizes(allSizes);
      addLog('success', `Created ${createdSizes.length} product sizes in Airtable`);
      setProgress(60);
      setCompleted(prev => ({ ...prev, sizes: true }));

    } catch (error) {
      addLog('error', `Failed to migrate products: ${error}`);
      throw error;
    }
  }

  async function migrateCertificates() {
    addLog('info', 'Starting certificate migration...');
    setProgress(70);

    const airtableCertificates: AirtableCertificate[] = localCertificates.map(cert => ({
      name: cert.name,
      category: cert.category.toLowerCase(),
      issueDate: cert.issueDate,
      expireDate: cert.expiryDate,
      issueBody: cert.issuingBody,
      image: Array.isArray(cert.image) ? cert.image[0] || '' : cert.image || '',
      discription: cert.description,
    }));

    try {
      const createdCerts = await bulkCreateCertificates(airtableCertificates);
      addLog('success', `Created ${createdCerts.length} certificates in Airtable`);
      setProgress(100);
      setCompleted(prev => ({ ...prev, certificates: true }));
    } catch (error) {
      addLog('error', `Failed to migrate certificates: ${error}`);
      throw error;
    }
  }

  async function runMigration() {
    if (!isAirtableConfigured()) {
      toast.error('Please configure Airtable credentials first');
      return;
    }

    setMigrating(true);
    setLogs([]);
    setProgress(0);
    setCompleted({ products: false, sizes: false, certificates: false });

    try {
      await migrateProducts();
      await migrateCertificates();
      addLog('success', 'Migration completed successfully!');
      toast.success('Data migration completed!');
    } catch (error) {
      toast.error('Migration failed. Check the logs for details.');
    } finally {
      setMigrating(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Data Migration</h1>
        <p className="text-slate-400 mt-1">
          Migrate existing products and certificates to Airtable
        </p>
      </div>

      {!isAirtableConfigured() && (
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-500">Configuration Required</h3>
                <p className="text-slate-400 mt-2">
                  Please update your <code className="bg-slate-800 px-2 py-1 rounded">.env</code> file with your Airtable Base ID before running migration.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Package className="w-5 h-5 text-emerald-500" />
              Products
            </CardTitle>
            <CardDescription className="text-slate-400">
              Ready to migrate from local data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{localProducts.length}</span>
              <Badge className={completed.products ? 'bg-green-500' : 'bg-slate-600'}>
                {completed.products ? 'Migrated' : 'Pending'}
              </Badge>
            </div>
            <p className="text-sm text-slate-400 mt-2">
              Including {localProducts.reduce((sum, p) => sum + p.sizes.length, 0)} size variants
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Award className="w-5 h-5 text-green-500" />
              Certificates
            </CardTitle>
            <CardDescription className="text-slate-400">
              Ready to migrate from local data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-white">{localCertificates.length}</span>
              <Badge className={completed.certificates ? 'bg-green-500' : 'bg-slate-600'}>
                {completed.certificates ? 'Migrated' : 'Pending'}
              </Badge>
            </div>
            <p className="text-sm text-slate-400 mt-2">
              ISO, Medical, and Quality certifications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Migration Action */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Database className="w-5 h-5 text-purple-500" />
            Run Migration
          </CardTitle>
          <CardDescription className="text-slate-400">
            This will create all records in your Airtable base
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {migrating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Progress</span>
                <span className="text-white">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <Button
            onClick={runMigration}
            disabled={migrating || !isAirtableConfigured()}
            className="w-full bg-purple-600 hover:bg-purple-500"
          >
            {migrating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Migrating...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Start Migration
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Migration Logs */}
      {logs.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Migration Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {logs.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-2 p-2 rounded text-sm ${
                      log.type === 'success'
                        ? 'bg-green-500/10 text-green-400'
                        : log.type === 'error'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    {log.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                    ) : log.type === 'error' ? (
                      <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    ) : (
                      <Loader2 className="w-4 h-4 mt-0.5 shrink-0 animate-spin" />
                    )}
                    <span>{log.message}</span>
                    <span className="ml-auto text-xs text-slate-500">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
