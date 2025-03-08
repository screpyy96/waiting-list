import React from 'react';
import Link from 'next/link';
import { Star, MessageCircle } from 'lucide-react';
import type { Product } from '@/types';
import Badge from '@/components/common/Badge';
import OptimizedImage from '@/components/common/OptimizedImage';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl = Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]
    : '/images/placeholder.jpg';

  return (
    <article 
      itemScope 
      itemType="https://schema.org/Product"
      className="h-full"
    >
      <Link href={`/products/${product.slug}`} className="group h-full">
        <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg shadow-sm h-full flex flex-col">
          <div className="relative w-full">
            <OptimizedImage
              src={imageUrl}
              alt={product.name}
              aspectRatio="square"
              priority={false}
              containerClassName="w-full"
            />
            {product.isOrganic && (
              <div className="absolute top-2 left-2 z-10">
                <Badge variant="success">Produs Bio 🌱</Badge>
              </div>
            )}
          </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 
                className="text-lg font-semibold text-emerald-900 group-hover:text-emerald-600 transition-colors line-clamp-2"
                itemProp="name"
              >
                {product.name}
              </h3>
              <Badge 
                variant="info" 
                icon={<Star className="h-4 w-4 text-amber-400 fill-current" />}
                className="flex-shrink-0 ml-2"
              >
                {product.rating.toFixed(1)}
              </Badge>
            </div>

            <p 
              className="text-sm text-emerald-600 mb-3 line-clamp-2 flex-grow"
              itemProp="description"
            >
              {product.description}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div 
                itemProp="offers" 
                itemScope 
                itemType="https://schema.org/Offer"
                className="flex-shrink-0"
              >
                <span 
                  className="text-xl font-bold text-emerald-700"
                  itemProp="price"
                >
                  {product.price.toFixed(2)}
                </span>
                <span 
                  className="text-sm text-emerald-600 ml-1"
                  itemProp="priceCurrency"
                >
                  RON/{product.unit}
                </span>
              </div>

              <Badge 
                variant="info" 
                icon={<MessageCircle className="h-4 w-4" />}
                className="flex-shrink-0"
              >
                {product.numberOfReviews} recenzii
              </Badge>
            </div>

            <div className="mt-3 pt-3 border-t border-emerald-100">
              <div 
                className="flex items-center text-sm text-emerald-600"
                itemProp="brand"
                itemScope 
                itemType="https://schema.org/Brand"
              >
                <span>Produs de</span>
                <span 
                  className="font-medium ml-1 text-emerald-700 truncate"
                  itemProp="name"
                >
                  {product.farmer.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard; 