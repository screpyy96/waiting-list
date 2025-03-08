import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, X } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  unit: z.string().min(1, 'Unit is required'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  category: z.string().min(1, 'Category is required'),
  organic: z.boolean(),
  seasonal: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

const categories = [
  'Vegetables',
  'Fruits',
  'Dairy',
  'Meat',
  'Eggs',
  'Honey',
  'Herbs',
  'Other',
];

const NewProductPage = () => {
  const router = useRouter();
  const { user, userType } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      organic: false,
      seasonal: false,
    },
  });

  // Redirect if not logged in or not a farmer
  if (!user || userType !== 'farmer') {
    if (typeof window !== 'undefined') {
      router.push('/auth/login');
    }
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedImages.length > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }
    setSelectedImages([...selectedImages, ...files]);

    // Create preview URLs
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setImageUrls(prev => [...prev, url]);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const uploadPromises = selectedImages.map(async (image) => {
      const storageRef = ref(storage, `products/${user!.uid}/${Date.now()}-${image.name}`);
      await uploadBytes(storageRef, image);
      return getDownloadURL(storageRef);
    });

    return Promise.all(uploadPromises);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);

      if (selectedImages.length === 0) {
        toast.error('Please add at least one image');
        return;
      }

      const uploadedUrls = await uploadImages();

      const productData = {
        ...data,
        imageUrls: uploadedUrls,
        farmerId: user.uid,
        farmerName: user.displayName || user.email?.split('@')[0] || 'Unknown Farmer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        rating: 0,
        reviews: 0,
      };

      await addDoc(collection(db, 'products'), productData);
      toast.success('Product added successfully');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to add product');
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="mt-2 text-gray-600">Fill in the details to list your product.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images (Max 5)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            ))}
            {imageUrls.length < 5 && (
              <label className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-primary">
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  multiple
                />
              </label>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="input-field mt-1"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register('category')}
              id="category"
              className="input-field mt-1"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description')}
            id="description"
            rows={4}
            className="input-field mt-1"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              {...register('price', { valueAsNumber: true })}
              type="number"
              id="price"
              step="0.01"
              className="input-field mt-1"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
              Unit
            </label>
            <input
              {...register('unit')}
              type="text"
              id="unit"
              placeholder="e.g., kg, piece, bunch"
              className="input-field mt-1"
            />
            {errors.unit && (
              <p className="mt-1 text-sm text-red-600">{errors.unit.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              {...register('stock', { valueAsNumber: true })}
              type="number"
              id="stock"
              className="input-field mt-1"
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
            )}
          </div>
        </div>

        {/* Product Type */}
        <div className="flex space-x-6">
          <label className="flex items-center">
            <input
              {...register('organic')}
              type="checkbox"
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="ml-2 text-gray-700">Organic</span>
          </label>
          <label className="flex items-center">
            <input
              {...register('seasonal')}
              type="checkbox"
              className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="ml-2 text-gray-700">Seasonal</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProductPage; 