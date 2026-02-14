import { useQuery } from '@tanstack/react-query';
import { fetchCertificates } from '@/lib/airtable';

export interface Certificate {
  id: string;
  name: string;
  category: string;
  issueDate: string;
  expiryDate: string;
  issuingBody: string;
  image: string | string[] | null;
  description: string;
}

export interface CertificateCategory {
  id: string;
  name: string;
}

export function useAirtableCertificates() {
  return useQuery({
    queryKey: ['airtable-certificates'],
    queryFn: async () => {
      const certificatesData = await fetchCertificates();

      // Transform Airtable data to match the Certificate interface
      const certificates: Certificate[] = certificatesData.map((record) => ({
        id: record.id,
        name: record.fields.name || '',
        category: record.fields.category ? record.fields.category.toUpperCase() : 'Quality',
        issueDate: record.fields.issueDate || '',
        expiryDate: record.fields.expireDate || '',
        issuingBody: record.fields.issueBody || '',
        image: record.fields.image || null,
        description: record.fields.discription || '',
      }));

      // Generate categories from certificates
      const categorySet = new Set<string>();
      certificates.forEach((cert) => {
        if (cert.category) {
          categorySet.add(cert.category);
        }
      });

      const certificateCategories: CertificateCategory[] = [
        { id: 'all', name: 'All Certificates' },
        ...Array.from(categorySet).map((cat) => ({
          id: cat,
          name: `${cat} Certifications`,
        })),
      ];

      return { certificates, certificateCategories };
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
}
