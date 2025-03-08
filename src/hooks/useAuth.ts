import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/lib/store/store';
import { setUser, setLoading, setError, setUserType, clearAuth } from '@/lib/store/slices/authSlice';
import type { User } from '@/lib/store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const loginWithEmail = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      // Aici ar trebui să fie logica de autentificare reală
      // Pentru moment simulăm un login
      const mockUser: User = {
          id: '1',
          email,
          userType: 'customer',
          uid: undefined,
          displayName: ''
      };
      dispatch(setUser(mockUser));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Autentificare eșuată'));
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      dispatch(setLoading(true));
      // Aici ar trebui să fie logica de autentificare cu Google
      // Pentru moment simulăm un login
      const mockUser: User = {
          id: '2',
          email: 'google@example.com',
          userType: 'customer',
          uid: undefined,
          displayName: ''
      };
      dispatch(setUser(mockUser));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Autentificare Google eșuată'));
      throw error;
    }
  };

  const signup = async (email: string, password: string, userType: 'customer' | 'farmer') => {
    try {
      dispatch(setLoading(true));
      // Aici ar trebui să fie logica de înregistrare reală
      // Pentru moment simulăm o înregistrare
      const mockUser: User = {
          id: '3',
          email,
          userType,
          uid: undefined,
          displayName: ''
      };
      dispatch(setUser(mockUser));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Înregistrare eșuată'));
      throw error;
    }
  };

  const logout = () => {
    dispatch(clearAuth());
  };

  const updateUserType = (type: 'customer' | 'farmer' | 'admin' | null) => {
    dispatch(setUserType(type));
  };

  return {
    user: auth.user,
    isLoading: auth.isLoading,
    error: auth.error,
    userType: auth.userType,
    isAuthenticated: !!auth.user,
    loginWithEmail,
    loginWithGoogle,
    signup,
    logout,
    updateUserType
  };
};

export default useAuth; 