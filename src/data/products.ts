import type { Product, ProductCategory, ProductFarmer } from '@/types/product';

export const categories: ProductCategory[] = [
  {
    id: '1',
    name: 'Legume',
    slug: 'legume'
  },
  {
    id: '2',
    name: 'Fructe',
    slug: 'fructe'
  },
  {
    id: '3',
    name: 'Lactate',
    slug: 'lactate'
  },
  {
    id: '4',
    name: 'Carne',
    slug: 'carne'
  },
  {
    id: '5',
    name: 'Miere și dulcețuri',
    slug: 'miere-si-dulceturi'
  }
];

export const farmers: ProductFarmer[] = [
  {
    id: '1',
    name: 'Ferma Apuseni',
    location: 'Cluj, Transilvania',
    avatar: 'https://images.unsplash.com/photo-1507662228758-08d030c4820b?w=200',
    description: 'Produse tradiționale din inima Munților Apuseni, cultivate cu grijă și respect pentru natură.'
  },
  {
    id: '2',
    name: 'Grădina Moldovei',
    location: 'Iași, Moldova',
    avatar: 'https://images.unsplash.com/photo-1595438280062-88a0wild=1&w=200',
    description: 'Legume și fructe proaspete din cea mai fertilă zonă a Moldovei.'
  },
  {
    id: '3',
    name: 'Ferma Bio Dâmbovița',
    location: 'Târgoviște, Muntenia',
    avatar: 'https://images.unsplash.com/photo-1592878840630-2333F1b4901?w=200',
    description: 'Produse certificate bio, crescute cu pasiune și expertiză în agricultura ecologică.'
  }
];

export const products: Product[] = [
  {
      id: '1',
      name: 'Roșii Bio Cherry',
      slug: 'rosii-bio-cherry',
      description: 'Roșii cherry crescute în solar, perfecte pentru salate sau gustări. Dulci și aromate, sunt cultivate fără pesticide.',
      price: 15.99,
      unit: 'kg',
      stock: 50,
      images: [
          'https://images.unsplash.com/photo-1546470427-f5c9106f1b29?w=800',
          'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800'
      ],
      category: categories[0],
      farmer: farmers[0],
      isOrganic: true,
      rating: 4.8,
      numberOfReviews: 124,
      deliveryInfo: 'Livrare în 24-48 ore',
      origin: 'Cluj, România',
      reviews: undefined,
      organic: undefined,
      seasonal: undefined,
      farmerName: undefined
  },
  {
      id: '2',
      name: 'Brânză de Capră Maturată',
      slug: 'branza-de-capra-maturata',
      description: 'Brânză maturată timp de 30 de zile, din lapte de capră de la ferma noastră din Munții Apuseni.',
      price: 45.00,
      unit: '500g',
      stock: 20,
      images: [
          'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800',
          'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=800'
      ],
      category: categories[2],
      farmer: farmers[0],
      isOrganic: true,
      rating: 4.9,
      numberOfReviews: 89,
      deliveryInfo: 'Livrare refrigerată în 24 ore',
      origin: 'Munții Apuseni, România',
      reviews: undefined,
      organic: undefined,
      seasonal: undefined,
      farmerName: undefined
  },
  {
      id: '3',
      name: 'Mere Ionatan',
      slug: 'mere-ionatan',
      description: 'Mere dulci-acrișoare, crescute în livada noastră tradițională din Moldova. Perfect pentru desert sau suc natural.',
      price: 8.99,
      unit: 'kg',
      stock: 100,
      images: [
          'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=800',
          'https://images.unsplash.com/photo-1610397962076-02407a169302?w=800'
      ],
      category: categories[1],
      farmer: farmers[1],
      isOrganic: false,
      rating: 4.7,
      numberOfReviews: 156,
      deliveryInfo: 'Livrare în 24-48 ore',
      origin: 'Iași, România',
      reviews: undefined,
      organic: undefined,
      seasonal: undefined,
      farmerName: undefined
  },
  {
      id: '4',
      name: 'Miere de Salcâm',
      slug: 'miere-de-salcam',
      description: 'Miere pură de salcâm, recoltată din stupii noștri amplasați în zone nepoluate din Munții Apuseni.',
      price: 35.00,
      unit: '500g',
      stock: 30,
      images: [
          'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800',
          'https://images.unsplash.com/photo-1582993728648-1f29c748e5d9?w=800'
      ],
      category: categories[4],
      farmer: farmers[0],
      isOrganic: true,
      rating: 5.0,
      numberOfReviews: 201,
      deliveryInfo: 'Livrare în 24-48 ore',
      origin: 'Munții Apuseni, România',
      reviews: undefined,
      organic: undefined,
      seasonal: undefined,
      farmerName: undefined
  },
  {
      id: '5',
      name: 'Cartofi Roșii Bio',
      slug: 'cartofi-rosii-bio',
      description: 'Cartofi roșii cultivați bio, perfect pentru copt sau piure. Recoltați manual din solul fertil al Moldovei.',
      price: 6.99,
      unit: 'kg',
      stock: 150,
      images: [
          'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800',
          'https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=800'
      ],
      category: categories[0],
      farmer: farmers[1],
      isOrganic: true,
      rating: 4.6,
      numberOfReviews: 78,
      deliveryInfo: 'Livrare în 24-48 ore',
      origin: 'Iași, România',
      reviews: undefined,
      organic: undefined,
      seasonal: undefined,
      farmerName: undefined
  },
  {
      id: '6',
      name: 'Carne de Vită Maturat',
      slug: 'carne-de-vita-maturat',
      description: 'Carne de vită maturată uscat timp de 28 de zile, de la vaci crescute în mod natural, cu iarbă.',
      price: 129.99,
      unit: 'kg',
      stock: 15,
      images: [
          'https://images.unsplash.com/photo-1603048297172-c84c8583dde3?w=800',
          'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800'
      ],
      category: categories[3],
      farmer: farmers[2],
      isOrganic: true,
      rating: 4.9,
      numberOfReviews: 45,
      deliveryInfo: 'Livrare refrigerată în 24 ore',
      origin: 'Târgoviște, România',
      reviews: undefined,
      organic: undefined,
      seasonal: undefined,
      farmerName: undefined
  }
]; 