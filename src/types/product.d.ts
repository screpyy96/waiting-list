export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ProductFarmer {
  id: string;
  name: string;
  location: string;
  avatar: string;
  description: string;
}

export interface Product {
  reviews: ReactNode;
  organic: any;
  seasonal: any;
  farmerName: ReactNode;
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  images: string[];
  category: ProductCategory;
  farmer: ProductFarmer;
  isOrganic: boolean;
  rating: number;
  numberOfReviews: number;
  deliveryInfo: string;
  origin: string;
  createdAt?: string;
  updatedAt?: string;
  // Compatibilitate cu versiunea veche
  farmerId?: string;
  imageUrls?: string[];
} 