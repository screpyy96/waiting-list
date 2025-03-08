import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import type { BlogPost } from '@/types/blog';

interface BlogModalProps {
  post: BlogPost;
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal: React.FC<BlogModalProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="min-h-screen px-4 text-center">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0 opacity-75"></div>
        </div>

        {/* Modal container */}
        <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>

          {/* Article content */}
          <div className="relative h-[400px] w-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl" />
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium">{post.author.name}</span>
                </div>
                <span className="text-sm opacity-75">{post.date}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="prose prose-emerald max-w-none">
              {post.content.map((section, index) => (
                <div key={index} className="mb-8">
                  {section.type === 'paragraph' && (
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  )}
                  {section.type === 'heading' && (
                    <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{section.content}</h2>
                  )}
                  {section.type === 'image' && (
                    <div className="my-8 relative h-[300px] w-full rounded-xl overflow-hidden">
                      <Image
                        src={section.content}
                        alt={section.caption || ''}
                        fill
                        className="object-cover"
                      />
                      {section.caption && (
                        <p className="text-sm text-gray-500 mt-2 text-center">{section.caption}</p>
                      )}
                    </div>
                  )}
                  {section.type === 'quote' && (
                    <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700 my-6">
                      {section.content}
                    </blockquote>
                  )}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal; 