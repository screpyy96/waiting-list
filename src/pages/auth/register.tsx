import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  userType: z.enum(['farmer', 'customer'], {
    required_error: 'Please select a user type',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signup, loginWithGoogle, updateUserType } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: 'customer',
    },
  });

  const selectedUserType = watch('userType');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      await signup(data.email, data.password, data.userType);
      updateUserType(data.userType);
      toast.success('Account created successfully!');
      router.push('/');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      setIsLoading(true);
      await loginWithGoogle();
      updateUserType(selectedUserType);
      toast.success('Account created successfully with Google!');
      router.push('/');
    } catch (error) {
      toast.error('Failed to create account with Google.');
      console.error('Google registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
          <p className="text-gray-600 mt-2">Join our farming community</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              I want to
            </label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <label className={`
                flex items-center justify-center p-4 border rounded-lg cursor-pointer
                ${selectedUserType === 'customer'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-primary/50'}
              `}>
                <input
                  type="radio"
                  value="customer"
                  {...register('userType')}
                  className="hidden"
                />
                <span>Buy Products</span>
              </label>
              <label className={`
                flex items-center justify-center p-4 border rounded-lg cursor-pointer
                ${selectedUserType === 'farmer'
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-primary/50'}
              `}>
                <input
                  type="radio"
                  value="farmer"
                  {...register('userType')}
                  className="hidden"
                />
                <span>Sell Products</span>
              </label>
            </div>
            {errors.userType && (
              <p className="mt-1 text-sm text-red-600">{errors.userType.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="input-field mt-1"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              id="password"
              className="input-field mt-1"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              id="confirmPassword"
              className="input-field mt-1"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleRegister}
            className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={isLoading}
          >
            <User className="h-5 w-5 mr-2" />
            Sign up with Google
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary hover:text-primary/90">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage; 