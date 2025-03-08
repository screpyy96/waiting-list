import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { User, ShoppingCart, Menu, X, LogOut, UserCircle, Heart } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userType, logout } = useAuth();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path: string) => router.pathname === path;

  return (
    <>
      <header className="bg-white border-b border-emerald-100">
        {/* Top Bar */}
        <div className="bg-emerald-900 text-white py-2">
          <div className="container mx-auto px-4">
            <p className="text-sm text-center">
              🚚 Livrare gratuită pentru comenzi peste 200 RON în zona București-Ilfov
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Farm2Door
              </span>
              <span className="hidden sm:inline-block text-sm text-emerald-600 font-medium px-2 py-1 bg-emerald-50 rounded-full">
                Direct de la Fermier
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                href="/products" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/products')
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                Produse
              </Link>
              <Link 
                href="/farmers" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/farmers')
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                Fermieri
              </Link>
              <Link 
                href="/about" 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/about')
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                Despre Noi
              </Link>
              {userType === 'farmer' && (
                <Link 
                  href="/dashboard" 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  Panou de Control
                </Link>
              )}
            </nav>

            {/* Desktop Auth/User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link 
                    href="/favorites" 
                    className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                  </Link>
                  <Link 
                    href="/cart" 
                    className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                  <div className="relative group">
                    <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-emerald-50 transition-colors">
                      <UserCircle className="h-5 w-5 text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {user.email?.split('@')[0]}
                      </span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 hidden group-hover:block border border-emerald-100">
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        Profil
                      </Link>
                      {userType === 'customer' && (
                        <Link 
                          href="/orders" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          Comenzile Mele
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Deconectare
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                  >
                    Autentificare
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Înregistrare
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-emerald-600">Farm2Door</span>
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="space-y-4">
              <Link
                href="/products"
                className="block px-4 py-2 text-lg font-medium text-gray-700 hover:text-emerald-600"
                onClick={toggleMenu}
              >
                Produse
              </Link>
              <Link
                href="/farmers"
                className="block px-4 py-2 text-lg font-medium text-gray-700 hover:text-emerald-600"
                onClick={toggleMenu}
              >
                Fermieri
              </Link>
              <Link
                href="/about"
                className="block px-4 py-2 text-lg font-medium text-gray-700 hover:text-emerald-600"
                onClick={toggleMenu}
              >
                Despre Noi
              </Link>
              {userType === 'farmer' && (
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-lg font-medium text-gray-700 hover:text-emerald-600"
                  onClick={toggleMenu}
                >
                  Panou de Control
                </Link>
              )}
              
              {user ? (
                <>
                  <hr className="border-emerald-100 my-4" />
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-lg font-medium text-gray-700 hover:text-emerald-600"
                    onClick={toggleMenu}
                  >
                    Profil
                  </Link>
                  <Link
                    href="/favorites"
                    className="block px-4 py-2 text-lg font-medium text-gray-700 hover:text-emerald-600"
                    onClick={toggleMenu}
                  >
                    Favorite
                  </Link>
                  <Link
                    href="/cart"
                    className="block px-4 py-2 text-lg font-medium text-gray-700 hover:text-emerald-600"
                    onClick={toggleMenu}
                  >
                    Coș de Cumpărături
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="block w-full text-left px-4 py-2 text-lg font-medium text-red-600 hover:text-red-700"
                  >
                    Deconectare
                  </button>
                </>
              ) : (
                <>
                  <hr className="border-emerald-100 my-4" />
                  <Link
                    href="/auth/login"
                    className="block px-4 py-2 text-lg font-medium text-emerald-600 hover:text-emerald-700"
                    onClick={toggleMenu}
                  >
                    Autentificare
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-4 py-2 text-lg font-medium text-emerald-600 hover:text-emerald-700"
                    onClick={toggleMenu}
                  >
                    Înregistrare
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header; 