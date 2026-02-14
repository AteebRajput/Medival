// Airtable API Configuration
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

// Types for Airtable records
export interface AirtableProduct {
  id?: string;
  productName: string;
  productDiscription: string;
  productImage: string;
  category: string;
  features: string;
  shelfLife: string;
  storageCondition: string;
  precautions: string;
}

export interface AirtableProductSize {
  id?: string;
  size: string;
  price: number;
  product: string[]; // Linked record IDs
}

export interface AirtableCertificate {
  id?: string;
  name: string;
  category: string;
  issueDate: string;
  expireDate: string;
  issueBody: string;
  image: string;
  discription: string;
}

export interface AirtableOrder {
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  totalamount: number;
  orderstatus: 'pending' | 'active' | 'delivered' | 'closed';
  product: string[]; // Linked record IDs
  productSize: string[]; // Linked record IDs
  createdAt?: string;
}

// Generic Airtable response types
interface AirtableRecord<T> {
  id: string;
  fields: T;
  createdTime: string;
}

interface AirtableListResponse<T> {
  records: AirtableRecord<T>[];
  offset?: string;
}

// Helper function for API requests
async function airtableRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
  body?: unknown
): Promise<T> {
  const headers: HeadersInit = {
    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${AIRTABLE_API_URL}/${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Airtable API error');
  }

  // DELETE requests may not return JSON
  if (method === 'DELETE') {
    return { deleted: true } as T;
  }

  return response.json();
}

// ==================== PRODUCTS API ====================

export async function fetchProducts(): Promise<AirtableRecord<AirtableProduct>[]> {
  const response = await airtableRequest<AirtableListResponse<AirtableProduct>>('products');
  return response.records;
}

export async function fetchProduct(id: string): Promise<AirtableRecord<AirtableProduct>> {
  return airtableRequest<AirtableRecord<AirtableProduct>>(`products/${id}`);
}

export async function createProduct(product: AirtableProduct): Promise<AirtableRecord<AirtableProduct>> {
  return airtableRequest<AirtableRecord<AirtableProduct>>('products', 'POST', {
    fields: product,
  });
}

export async function updateProduct(id: string, product: Partial<AirtableProduct>): Promise<AirtableRecord<AirtableProduct>> {
  return airtableRequest<AirtableRecord<AirtableProduct>>(`products/${id}`, 'PATCH', {
    fields: product,
  });
}

export async function deleteProduct(id: string): Promise<{ deleted: boolean }> {
  return airtableRequest<{ deleted: boolean }>(`products/${id}`, 'DELETE');
}

// ==================== PRODUCT SIZES API ====================

export async function fetchProductSizes(productId?: string): Promise<AirtableRecord<AirtableProductSize>[]> {
  let endpoint = 'productSize';
  if (productId) {
    endpoint += `?filterByFormula=FIND("${productId}", ARRAYJOIN(product, ","))`;
  }
  const response = await airtableRequest<AirtableListResponse<AirtableProductSize>>(endpoint);
  return response.records;
}

export async function createProductSize(productSize: AirtableProductSize): Promise<AirtableRecord<AirtableProductSize>> {
  return airtableRequest<AirtableRecord<AirtableProductSize>>('productSize', 'POST', {
    fields: productSize,
  });
}

export async function updateProductSize(id: string, productSize: Partial<AirtableProductSize>): Promise<AirtableRecord<AirtableProductSize>> {
  return airtableRequest<AirtableRecord<AirtableProductSize>>(`productSize/${id}`, 'PATCH', {
    fields: productSize,
  });
}

export async function deleteProductSize(id: string): Promise<{ deleted: boolean }> {
  return airtableRequest<{ deleted: boolean }>(`productSize/${id}`, 'DELETE');
}

// ==================== CERTIFICATES API ====================

export async function fetchCertificates(): Promise<AirtableRecord<AirtableCertificate>[]> {
  const response = await airtableRequest<AirtableListResponse<AirtableCertificate>>('certificates');
  return response.records;
}

export async function fetchCertificate(id: string): Promise<AirtableRecord<AirtableCertificate>> {
  return airtableRequest<AirtableRecord<AirtableCertificate>>(`certificates/${id}`);
}

export async function createCertificate(certificate: AirtableCertificate): Promise<AirtableRecord<AirtableCertificate>> {
  return airtableRequest<AirtableRecord<AirtableCertificate>>('certificates', 'POST', {
    fields: certificate,
  });
}

export async function updateCertificate(id: string, certificate: Partial<AirtableCertificate>): Promise<AirtableRecord<AirtableCertificate>> {
  return airtableRequest<AirtableRecord<AirtableCertificate>>(`certificates/${id}`, 'PATCH', {
    fields: certificate,
  });
}

export async function deleteCertificate(id: string): Promise<{ deleted: boolean }> {
  return airtableRequest<{ deleted: boolean }>(`certificates/${id}`, 'DELETE');
}

// ==================== ORDERS API ====================

export async function fetchOrders(): Promise<AirtableRecord<AirtableOrder>[]> {
  const response = await airtableRequest<AirtableListResponse<AirtableOrder>>('order?sort%5B0%5D%5Bfield%5D=createdAt&sort%5B0%5D%5Bdirection%5D=desc');
  return response.records;
}

export async function fetchOrder(id: string): Promise<AirtableRecord<AirtableOrder>> {
  return airtableRequest<AirtableRecord<AirtableOrder>>(`order/${id}`);
}

export async function createOrder(order: AirtableOrder): Promise<AirtableRecord<AirtableOrder>> {
  return airtableRequest<AirtableRecord<AirtableOrder>>('order', 'POST', {
    fields: order,
  });
}

export async function updateOrder(id: string, order: Partial<AirtableOrder>): Promise<AirtableRecord<AirtableOrder>> {
  return airtableRequest<AirtableRecord<AirtableOrder>>(`order/${id}`, 'PATCH', {
    fields: order,
  });
}

export async function deleteOrder(id: string): Promise<{ deleted: boolean }> {
  return airtableRequest<{ deleted: boolean }>(`order/${id}`, 'DELETE');
}

// ==================== BULK OPERATIONS FOR MIGRATION ====================

export async function bulkCreateProducts(products: AirtableProduct[]): Promise<AirtableRecord<AirtableProduct>[]> {
  const results: AirtableRecord<AirtableProduct>[] = [];
  
  // Airtable allows max 10 records per request
  for (let i = 0; i < products.length; i += 10) {
    const batch = products.slice(i, i + 10);
    const response = await airtableRequest<{ records: AirtableRecord<AirtableProduct>[] }>(
      'products',
      'POST',
      { records: batch.map(p => ({ fields: p })) }
    );
    results.push(...response.records);
  }
  
  return results;
}

export async function bulkCreateProductSizes(sizes: AirtableProductSize[]): Promise<AirtableRecord<AirtableProductSize>[]> {
  const results: AirtableRecord<AirtableProductSize>[] = [];
  
  for (let i = 0; i < sizes.length; i += 10) {
    const batch = sizes.slice(i, i + 10);
    const response = await airtableRequest<{ records: AirtableRecord<AirtableProductSize>[] }>(
      'productSize',
      'POST',
      { records: batch.map(s => ({ fields: s })) }
    );
    results.push(...response.records);
  }
  
  return results;
}

export async function bulkCreateCertificates(certificates: AirtableCertificate[]): Promise<AirtableRecord<AirtableCertificate>[]> {
  const results: AirtableRecord<AirtableCertificate>[] = [];
  
  for (let i = 0; i < certificates.length; i += 10) {
    const batch = certificates.slice(i, i + 10);
    const response = await airtableRequest<{ records: AirtableRecord<AirtableCertificate>[] }>(
      'certificates',
      'POST',
      { records: batch.map(c => ({ fields: c })) }
    );
    results.push(...response.records);
  }
  
  return results;
}

// Helper to check if Airtable is configured
export function isAirtableConfigured(): boolean {
  return Boolean(AIRTABLE_API_KEY && AIRTABLE_BASE_ID && AIRTABLE_BASE_ID !== 'appXXXXXXXXXXXXXX');
}
