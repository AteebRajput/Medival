import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
  Award,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Search,
  Calendar,
  Building2,
  Image as ImageIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  AirtableCertificate,
} from '@/lib/airtable';
import { toast } from 'sonner';

const CATEGORIES = ['iso', 'medical', 'quality'];

interface CertificateRecord {
  id: string;
  fields: AirtableCertificate;
  createdTime: string;
}

interface FormData {
  name: string;
  category: string;
  issueDate: string;
  expireDate: string;
  issueBody: string;
  image: string;
  discription: string;
}

const defaultFormData: FormData = {
  name: '',
  category: '',
  issueDate: '',
  expireDate: '',
  issueBody: '',
  image: '',
  discription: '',
};

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<CertificateRecord | null>(null);
  const [deletingCertificate, setDeletingCertificate] = useState<CertificateRecord | null>(null);

  // Form state
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  // Load certificates
  useEffect(() => {
    loadCertificates();
  }, []);

  async function loadCertificates() {
    setLoading(true);
    try {
      const data = await fetchCertificates();
      setCertificates(data);
    } catch (error) {
      toast.error('Failed to load certificates');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Filter certificates
  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch = cert.fields.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      cert.fields.category?.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Open form for new certificate
  function handleAddNew() {
    setEditingCertificate(null);
    setFormData(defaultFormData);
    setIsFormOpen(true);
  }

  // Open form for editing
  function handleEdit(cert: CertificateRecord) {
    setEditingCertificate(cert);
    setFormData({
      name: cert.fields.name || '',
      category: cert.fields.category || '',
      issueDate: cert.fields.issueDate || '',
      expireDate: cert.fields.expireDate || '',
      issueBody: cert.fields.issueBody || '',
      image: cert.fields.image || '',
      discription: cert.fields.discription || '',
    });
    setIsFormOpen(true);
  }

  // Handle delete confirmation
  function handleDeleteClick(cert: CertificateRecord) {
    setDeletingCertificate(cert);
    setIsDeleteOpen(true);
  }

  // Save certificate
  async function handleSave() {
    if (!formData.name || !formData.category) {
      toast.error('Please fill in required fields');
      return;
    }

    setSaving(true);
    try {
      if (editingCertificate) {
        await updateCertificate(editingCertificate.id, formData);
        toast.success('Certificate updated successfully');
      } else {
        await createCertificate(formData);
        toast.success('Certificate created successfully');
      }

      setIsFormOpen(false);
      loadCertificates();
    } catch (error) {
      toast.error('Failed to save certificate');
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  // Delete certificate
  async function handleDelete() {
    if (!deletingCertificate) return;

    setSaving(true);
    try {
      await deleteCertificate(deletingCertificate.id);
      toast.success('Certificate deleted successfully');
      setIsDeleteOpen(false);
      setDeletingCertificate(null);
      loadCertificates();
    } catch (error) {
      toast.error('Failed to delete certificate');
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  // Get category color
  function getCategoryColor(category: string) {
    switch (category?.toLowerCase()) {
      case 'iso':
        return 'bg-blue-600';
      case 'medical':
        return 'bg-green-600';
      case 'quality':
        return 'bg-purple-600';
      default:
        return 'bg-slate-600';
    }
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
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Manage Certificates</h1>
        <Button onClick={handleAddNew} className="bg-emerald-600 hover:bg-emerald-500 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Add Certificate
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <Input
            placeholder="Search certificates..."
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
              <SelectItem key={cat} value={cat} className="text-white uppercase">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <AnimatePresence>
          {filteredCertificates.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <div className="aspect-[4/3] bg-slate-900 relative">
                  {cert.fields.image ? (
                    <img
                      src={cert.fields.image}
                      alt={cert.fields.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Award className="w-16 h-16 text-slate-700" />
                    </div>
                  )}
                  <Badge className={`absolute top-2 right-2 uppercase ${getCategoryColor(cert.fields.category)}`}>
                    {cert.fields.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white text-lg line-clamp-2">
                    {cert.fields.name}
                  </h3>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Building2 className="w-4 h-4" />
                      <span>{cert.fields.issueBody || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {cert.fields.issueDate || 'N/A'} - {cert.fields.expireDate || 'N/A'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 mt-3 line-clamp-2">
                    {cert.fields.discription}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(cert)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDeleteClick(cert)}
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

      {filteredCertificates.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 mx-auto text-slate-600 mb-4" />
          <p className="text-slate-400">No certificates found</p>
        </div>
      )}

      {/* Certificate Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Fill in the certificate details below
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Certificate Name *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
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
                        <SelectItem key={cat} value={cat} className="text-white uppercase">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Issuing Body</Label>
                <Input
                  value={formData.issueBody}
                    onChange={(e) =>
                    setFormData({ ...formData, issueBody: e.target.value })
                  }
                  placeholder="e.g., UKcert, DRAP"
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Issue Date</Label>
                  <Input
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, issueDate: e.target.value })
                    }
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-300">Expiry Date</Label>
                  <Input
                    type="date"
                    value={formData.expireDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expireDate: e.target.value })
                    }
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Certificate Image URL</Label>
                <Input
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://..."
                  className="bg-slate-900 border-slate-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Description</Label>
                <Textarea
                  value={formData.discription}
                  onChange={(e) =>
                    setFormData({ ...formData, discription: e.target.value })
                  }
                  className="bg-slate-900 border-slate-700 text-white min-h-[100px]"
                />
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
              {editingCertificate ? 'Update' : 'Create'} Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Certificate</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete "{deletingCertificate?.fields.name}"?
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
