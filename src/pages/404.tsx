import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-6xl font-bold text-emerald-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-emerald-800 mb-4">
          Pagina nu a fost găsită
        </h2>
        <p className="text-emerald-600 mb-8">
          Ne pare rău, dar pagina pe care o căutați nu există sau a fost mutată.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Înapoi la pagina principală
        </Link>
      </div>
    </div>
  );
} 