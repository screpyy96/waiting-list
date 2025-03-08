import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Clock, ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setFilters, clearFilters } from '@/lib/store/slices/productSlice';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import { useProducts } from '@/hooks/useProducts';

const sortOptions = [
  { value: '', label: 'Sortează după' },
  { value: 'price-asc', label: 'Preț: Crescător' },
  { value: 'price-desc', label: 'Preț: Descrescător' },
  { value: 'rating', label: 'Cele mai apreciate' },
  { value: 'newest', label: 'Cele mai noi' },
];

const ProductsPage = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { filteredProducts, isLoading } = useProducts();
  const filters = useSelector((state: RootState) => state.products.filters);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    dispatch(setFilters({ searchQuery: query }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ sortBy: e.target.value as any }));
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <>
      <Head>
        <title>Produse Proaspete - Farm2Door</title>
        <meta 
          name="description" 
          content="Descoperă produse proaspete direct de la fermierii locali. Legume, fructe, lactate și alte produse naturale livrate la tine acasă." 
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold text-emerald-900">
              Produse Proaspete
              <span className="block text-lg font-normal text-emerald-600 mt-1">
                Direct de la fermierii locali
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Căutare */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Caută produse..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2.5 w-full sm:w-64 rounded-xl border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-sm"
                />
              </div>

              {/* Sortare */}
              <div className="relative">
                <select
                  value={filters.sortBy || ''}
                  onChange={handleSortChange}
                  className="appearance-none w-full sm:w-48 px-4 py-2.5 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm text-emerald-800"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-emerald-500 h-5 w-5 pointer-events-none" />
              </div>

              {/* Buton Filtrare */}
              <button
                onClick={toggleFilters}
                className="flex items-center justify-center px-4 py-2.5 border border-emerald-200 rounded-xl bg-white text-emerald-700 hover:bg-emerald-50 shadow-sm transition-colors"
              >
                Filtrează Produsele
              </button>
            </div>
          </div>

          {/* Grid Produse */}
          <div className="w-full">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl h-80 animate-pulse shadow-sm"
                  />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                <p className="text-emerald-800 text-lg">
                  Nu am găsit produse care să corespundă criteriilor tale
                </p>
                <button
                  onClick={() => dispatch(clearFilters())}
                  className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Șterge toate filtrele
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Drawer Filtre */}
      <ProductFilters isOpen={isFiltersOpen} onClose={() => setIsFiltersOpen(false)} />
    </>
  );
};

export default ProductsPage; 