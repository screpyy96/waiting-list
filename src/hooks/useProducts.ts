import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/lib/store/store';

export const useProducts = () => {
  const { products, filters } = useSelector((state: RootState) => state.products);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(product => product.category.slug === filters.category);
    }

    // Apply price filters
    if (filters.minPrice !== undefined) {
      result = result.filter(product => product.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter(product => product.price <= filters.maxPrice!);
    }

    // Apply organic filter
    if (filters.organic !== undefined) {
      result = result.filter(product => product.isOrganic === filters.organic);
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => b.id.localeCompare(a.id));
          break;
      }
    }

    return result;
  }, [products, filters]);

  return {
    products,
    filteredProducts,
    isLoading: false
  };
}; 