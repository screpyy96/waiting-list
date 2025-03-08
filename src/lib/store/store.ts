import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 