import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Plus, Package, MessageCircle, Settings, Trash, Edit } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const router = useRouter();
  const { user, userType } = useAuth();
  const { products, isLoading } = useProducts();
  const [activeTab, setActiveTab] = useState<'products' | 'messages' | 'settings'>('products');

  // Redirect if not logged in or not a farmer
  if (!user || userType !== 'farmer') {
    if (typeof window !== 'undefined') {
      router.push('/auth/login');
    }
    return null;
  }

  const myProducts = products.filter(product => product.farmerId === user.id);

  const handleDeleteProduct = async (productId: string) => {
    try {
      // Here you would typically delete the product from Firestore
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
        <button
          onClick={() => router.push('/dashboard/products/new')}
          className="btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Product
        </button>
      </div>

      {/* Dashboard Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'products'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Package className="h-5 w-5 inline-block mr-2" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MessageCircle className="h-5 w-5 inline-block mr-2" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="h-5 w-5 inline-block mr-2" />
            Settings
          </button>
        </nav>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg h-48 animate-pulse"
                />
              ))}
            </div>
          ) : myProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProducts.map((product) => (
                <div key={product.id} className="card overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={product.imageUrls[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-gray-600">
                      ${product.price.toFixed(2)} / {product.unit}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Stock: {product.stock} {product.unit}s
                    </p>
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        onClick={() => router.push(`/dashboard/products/${product.id}/edit`)}
                        className="p-2 text-gray-600 hover:text-primary"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-gray-600 hover:text-red-600"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating a new product.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/dashboard/products/new')}
                  className="btn-primary"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Product
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="text-center py-12">
          <MessageCircle className="h-12 w-12 mx-auto text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No messages yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Messages from customers will appear here.
          </p>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Account Settings
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Manage your account settings and preferences.</p>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => router.push('/dashboard/settings')}
                >
                  Update Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage; 