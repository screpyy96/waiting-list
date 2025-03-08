import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { products as initialProducts } from '@/data/products';
import type { Product } from '@/types/product';

interface ProductFilters {
  searchQuery?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  organic?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

interface ProductState {
  products: Product[];
  filters: ProductFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: initialProducts,
  filters: {},
  isLoading: false,
  error: null
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setFilters, clearFilters, setLoading, setError } = productSlice.actions;
export default productSlice.reducer; 