import { useQuery } from '@tanstack/react-query';
import { fetchCertificates } from '@/lib/airtable';
import { certificates as localCertificates } from '@/data/certificates';

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

// Helper function to parse image field (can be single URL, JSON array, or comma-separated)
function parseImageField(imageField: string | null | undefined): string | string[] | null {
  if (!imageField) return null;
  
  // Try to parse as JSON array
  if (imageField.startsWith('[')) {
    try {
      const parsed = JSON.parse(imageField);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      // Not valid JSON, continue to other methods
    }
  }
  
  // Check if it's comma-separated URLs (only if contains comma and looks like URLs)
  if (imageField.includes(',') && imageField.includes('http')) {
    const urls = imageField.split(',').map(url => url.trim()).filter(url => url.startsWith('http'));
    if (urls.length > 1) {
      return urls;
    }
  }
  
  // Return as single string
  return imageField;
}

export function useAirtableCertificates() {
  return useQuery({
    queryKey: ['airtable-certificates'],
    queryFn: async () => {
      const certificatesData = await fetchCertificates();

      // Transform Airtable data to match the Certificate interface
      const airtableCertificates: Certificate[] = certificatesData.map((record) => ({
        id: record.id,
        name: record.fields.name || '',
        category: record.fields.category ? record.fields.category.toUpperCase() : 'Quality',
        issueDate: record.fields.issueDate || '',
        expiryDate: record.fields.expireDate || '',
        issuingBody: record.fields.issueBody || '',
        image: parseImageField(record.fields.image),
        description: record.fields.discription || '',
      }));

      // Get local certificates that have multiple images (like DRAP Product Registration)
      // These are not in Airtable or have special multi-image data
      const localMultiImageCerts: Certificate[] = localCertificates
        .filter(cert => Array.isArray(cert.image)) // Only include certs with multiple images
        .map(cert => ({
          id: `local-${cert.id}`,
          name: cert.name,
          category: cert.category.toUpperCase(),
          issueDate: cert.issueDate,
          expiryDate: cert.expiryDate,
          issuingBody: cert.issuingBody,
          image: cert.image,
          description: cert.description,
        }));

      // Merge: Airtable certificates + local multi-image certificates
      // Avoid duplicates by checking name
      const airtableNames = new Set(airtableCertificates.map(c => c.name.toLowerCase()));
      const uniqueLocalCerts = localMultiImageCerts.filter(
        c => !airtableNames.has(c.name.toLowerCase())
      );
      
      const certificates = [...airtableCertificates, ...uniqueLocalCerts];

      // Generate categories from all certificates
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
