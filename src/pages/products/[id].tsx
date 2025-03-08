import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Star, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store/store';
import useAuth from '@/hooks/useAuth';
import { useProducts } from '@/hooks/useProducts';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, userType } = useAuth();
  const { products } = useProducts();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [message, setMessage] = useState('');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Product not found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/products')}
            className="mt-4 btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.imageUrls.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to contact the farmer');
      return;
    }
    if (userType === 'farmer') {
      toast.error('Farmers cannot send messages to other farmers');
      return;
    }
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      // Here you would typically create a new conversation or add to existing one
      toast.success('Message sent successfully!');
      setMessage('');
    } catch (error) {
      toast.error('Failed to send message');
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-primary mb-8"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative">
          <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.imageUrls[currentImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.imageUrls.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
          <div className="flex mt-4 space-x-4 overflow-x-auto">
            {product.imageUrls.map((url, index) => (
              <button
                key={url}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                  currentImageIndex === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Image
                  src={url}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="mt-2 text-lg text-gray-600">${product.price.toFixed(2)} / {product.unit}</p>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-lg font-medium text-gray-900">
                {product.rating.toFixed(1)}
              </span>
              <span className="ml-2 text-sm text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          <div className="mt-6 flex items-center space-x-4">
            {product.organic && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-primary">
                Organic
              </span>
            )}
            {product.seasonal && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                Seasonal
              </span>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Farmer Information</h2>
            <div className="mt-2">
              <p className="text-gray-600">Sold by: {product.farmerName}</p>
              <p className="mt-1 text-gray-600">Stock: {product.stock} {product.unit}s available</p>
            </div>
          </div>

          {/* Message Form */}
          {userType !== 'farmer' && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900">Contact Farmer</h2>
              <form onSubmit={handleMessageSubmit} className="mt-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message to the farmer..."
                  className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  disabled={!user}
                />
                <button
                  type="submit"
                  className="mt-4 btn-primary flex items-center"
                  disabled={!user}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send Message
                </button>
                {!user && (
                  <p className="mt-2 text-sm text-gray-500">
                    Please{' '}
                    <button
                      onClick={() => router.push('/auth/login')}
                      className="text-primary hover:text-primary/90"
                    >
                      sign in
                    </button>
                    {' '}to contact the farmer
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 