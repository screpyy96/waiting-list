import React from 'react';
import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import { setFilters } from '@/lib/store/slices/productSlice';
import { categories } from '@/data/products';

interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.products.filters);

  const handleCategoryChange = (category: string) => {
    dispatch(setFilters({ category }));
  };

  const handleOrganicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ organic: e.target.checked }));
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const price = value ? Number(value) : undefined;
    dispatch(setFilters({
      [type === 'min' ? 'minPrice' : 'maxPrice']: price
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-lg">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-emerald-900">Filtrează Produsele</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-emerald-50 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-emerald-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Categorii */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-emerald-900 mb-3">Categorii de Produse</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    filters.category === category.slug
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'hover:bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interval de Preț */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-emerald-900 mb-3">Interval de Preț (RON)</h3>
            <div className="flex gap-4">
              <div>
                <label className="text-sm text-emerald-600">Preț minim</label>
                <input
                  type="number"
                  min="0"
                  value={filters.minPrice || ''}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  className="mt-1 w-full rounded-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-sm text-emerald-600">Preț maxim</label>
                <input
                  type="number"
                  min="0"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  className="mt-1 w-full rounded-lg border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>

          {/* Filtre Suplimentare */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-emerald-900 mb-3">Filtre Suplimentare</h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.organic || false}
                onChange={handleOrganicChange}
                className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-emerald-900">Doar Produse Bio</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters; 