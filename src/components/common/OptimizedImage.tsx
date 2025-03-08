import React, { useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  auto: 'aspect-auto'
};

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  containerClassName = '',
  aspectRatio = 'auto'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div 
      className={twMerge(
        'relative overflow-hidden bg-emerald-50',
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-50">
          <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
        </div>
      )}
      
      <Image
        src={hasError ? '/images/placeholder.jpg' : src}
        alt={alt}
        width={fill ? undefined : (width || 400)}
        height={fill ? undefined : (height || 300)}
        fill={fill}
        priority={priority}
        className={twMerge(
          'object-cover w-full h-full',
          'transition-all duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          'group-hover:opacity-95',
          className
        )}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        unoptimized={hasError} // Skip optimization for placeholder
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-50">
          <span className="text-emerald-600 text-sm">
            {alt || 'Imagine indisponibilă'}
          </span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 