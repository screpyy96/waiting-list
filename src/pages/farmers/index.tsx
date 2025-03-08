import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Star, ChevronRight, X } from 'lucide-react';
import { farmers, products } from '@/data/products';
import type { ProductFarmer } from '@/types/product';

const FarmersPage = () => {
  const [selectedFarmer, setSelectedFarmer] = useState<ProductFarmer | null>(null);

  const getFarmerProducts = (farmerId: string) => {
    return products.filter(product => product.farmer.id === farmerId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">
            Fermierii Noștri
            <span className="block text-lg font-normal text-emerald-600 mt-1">
              Cunoaște producătorii locali care aduc prospețime pe masa ta
            </span>
          </h1>
        </div>

        {/* Farmers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers.map((farmer) => (
            <div
              key={farmer.id}
              onClick={() => setSelectedFarmer(farmer)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            >
              {/* Farmer Card */}
              <div className="relative h-48">
                <Image
                  src={farmer.avatar}
                  alt={farmer.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h2 className="text-xl font-bold">{farmer.name}</h2>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{farmer.location}</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-emerald-600 line-clamp-2 mb-4">
                  {farmer.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-700">
                    {getFarmerProducts(farmer.id).length} produse
                  </span>
                  <ChevronRight className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farmer Details Drawer */}
      {selectedFarmer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl">
            <div className="h-full overflow-y-auto">
              {/* Header */}
              <div className="relative h-64">
                <Image
                  src={selectedFarmer.avatar}
                  alt={selectedFarmer.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setSelectedFarmer(null)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{selectedFarmer.name}</h2>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{selectedFarmer.location}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-emerald-900 mb-4">Despre Fermă</h3>
                  <p className="text-emerald-700 mb-8">{selectedFarmer.description}</p>

                  <h3 className="text-xl font-semibold text-emerald-900 mb-4">Produsele Noastre</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {getFarmerProducts(selectedFarmer.id).map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-xl"
                      >
                        <div className="relative h-20 w-20 flex-shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-emerald-900">{product.name}</h4>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-400 fill-current" />
                              <span className="ml-1 text-sm font-medium text-emerald-700">
                                {product.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-emerald-600 line-clamp-2 mt-1">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-emerald-700 font-medium">
                              {product.price.toFixed(2)} RON/{product.unit}
                            </span>
                            {product.isOrganic && (
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                Bio 🌱
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmersPage; 