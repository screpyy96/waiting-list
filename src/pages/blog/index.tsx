import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Clock, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/types/blog';
import BlogModal from '@/components/blog/BlogModal';

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Agricultura Sustenabilă: Viitorul Fermelor din România',
    excerpt: 'Descoperiți cum fermierii români adoptă practici agricole sustenabile pentru a proteja mediul și a produce alimente mai sănătoase.',
    coverImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800',
    date: '15 Martie 2024',
    author: {
      name: 'Maria Popescu',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      role: 'Expert în Agricultură Sustenabilă'
    },
    content: [
      {
        type: 'paragraph',
        content: 'În ultimii ani, agricultura sustenabilă a devenit din ce în ce mai importantă în România. Fermierii locali adoptă practici inovatoare pentru a proteja solul și a reduce impactul asupra mediului.'
      },
      {
        type: 'heading',
        content: 'Ce înseamnă agricultura sustenabilă?'
      },
      {
        type: 'paragraph',
        content: 'Agricultura sustenabilă se bazează pe practici care protejează mediul, mențin profitabilitatea fermelor și susțin comunitățile locale. Aceasta include rotația culturilor, utilizarea compostului natural și conservarea apei.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
        caption: 'Fermă ecologică din județul Cluj'
      },
      {
        type: 'quote',
        content: 'Viitorul agriculturii depinde de modul în care protejăm resursele naturale astăzi.'
      }
    ],
    tags: ['agricultură', 'sustenabilitate', 'eco', 'fermieri'],
    readTime: 5
  },
  {
    id: '2',
    title: 'Produse Locale: De la Fermă Direct pe Masa Ta',
    excerpt: 'Cum scurtarea lanțului de aprovizionare aduce beneficii atât consumatorilor, cât și fermierilor locali.',
    coverImage: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800',
    date: '10 Martie 2024',
    author: {
      name: 'Ioan Dumitrescu',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      role: 'Specialist în Lanțuri Scurte de Aprovizionare'
    },
    content: [
      {
        type: 'paragraph',
        content: 'Lanțurile scurte de aprovizionare reprezintă viitorul agriculturii locale. Prin eliminarea intermediarilor, fermierii pot oferi produse mai proaspete la prețuri mai bune.'
      },
      {
        type: 'heading',
        content: 'Avantajele aprovizionării directe'
      },
      {
        type: 'paragraph',
        content: 'Când cumperi direct de la fermier, nu doar că primești produse mai proaspete, dar susții și economia locală. Fermierii primesc un preț corect pentru munca lor, iar tu știi exact de unde vine mâncarea ta.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800',
        caption: 'Piață locală de produse proaspete'
      }
    ],
    tags: ['local', 'produse-proaspete', 'fermieri', 'piață'],
    readTime: 4
  },
  {
    id: '3',
    title: 'Secretele Legumelor de Sezon',
    excerpt: 'Ghid complet despre când și cum să alegi cele mai bune legume de sezon pentru o alimentație sănătoasă.',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
    date: '5 Martie 2024',
    author: {
      name: 'Elena Ionescu',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      role: 'Nutriționist și Expert în Produse Locale'
    },
    content: [
      {
        type: 'paragraph',
        content: 'Alegerea legumelor de sezon nu este doar o modă, ci o practică înțeleaptă care aduce multiple beneficii pentru sănătate și mediu.'
      },
      {
        type: 'heading',
        content: 'De ce să alegem legume de sezon?'
      },
      {
        type: 'paragraph',
        content: 'Legumele de sezon sunt mai gustoase, mai nutritive și mai prietenoase cu mediul. Ele necesită mai puține resurse pentru producție și transport.'
      },
      {
        type: 'image',
        content: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
        caption: 'Legume proaspete de sezon'
      }
    ],
    tags: ['legume', 'sezon', 'sănătate', 'nutriție'],
    readTime: 6
  }
];

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <>
      <Head>
        <title>Blog - Farm2Door</title>
        <meta name="description" content="Articole și sfaturi despre agricultură sustenabilă, produse locale și alimentație sănătoasă" />
      </Head>

      <div className="bg-gradient-to-b from-emerald-50 to-white min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Blog Farm2Door
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descoperiți articole despre agricultură sustenabilă, produse locale și sfaturi pentru o alimentație sănătoasă
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative h-48">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.readTime} min citire</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {post.author.name}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-emerald-500" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      <BlogModal
        post={selectedPost!}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </>
  );
};

export default BlogPage; 