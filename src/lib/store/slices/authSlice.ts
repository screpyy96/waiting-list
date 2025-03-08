import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  uid: any;
  displayName: string;
  id: string;
  email: string;
  name?: string;
  userType?: 'customer' | 'farmer' | 'admin';
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  userType: 'customer' | 'farmer' | 'admin' | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  userType: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.userType = action.payload?.userType || null;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setUserType: (state, action: PayloadAction<'customer' | 'farmer' | 'admin' | null>) => {
      state.userType = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.userType = null;
      state.error = null;
      state.isLoading = false;
    }
  }
});

export const { setUser, setLoading, setError, setUserType, clearAuth } = authSlice.actions;
export default authSlice.reducer; 