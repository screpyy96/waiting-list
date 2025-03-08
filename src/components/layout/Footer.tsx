import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-emerald-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Abonează-te la newsletter</h3>
            <p className="text-emerald-100 mb-4">
              Primește noutăți despre produsele proaspete și fermierii locali
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Adresa ta de email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-500 transition-colors"
              >
                Abonează-te
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Farm2Door</h4>
            <p className="text-emerald-100 mb-4">
              Conectăm fermierii locali cu consumatorii care apreciază produsele proaspete și autentice.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-emerald-100 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-emerald-100 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-emerald-100 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Link-uri Rapide</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-emerald-100 hover:text-white transition-colors">
                  Produse
                </Link>
              </li>
              <li>
                <Link href="/farmers" className="text-emerald-100 hover:text-white transition-colors">
                  Fermieri
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-emerald-100 hover:text-white transition-colors">
                  Despre Noi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-emerald-100 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-emerald-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorii</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=legume" className="text-emerald-100 hover:text-white transition-colors">
                  Legume Proaspete
                </Link>
              </li>
              <li>
                <Link href="/products?category=fructe" className="text-emerald-100 hover:text-white transition-colors">
                  Fructe de Sezon
                </Link>
              </li>
              <li>
                <Link href="/products?category=lactate" className="text-emerald-100 hover:text-white transition-colors">
                  Produse Lactate
                </Link>
              </li>
              <li>
                <Link href="/products?category=miere" className="text-emerald-100 hover:text-white transition-colors">
                  Miere și Produse Apicole
                </Link>
              </li>
              <li>
                <Link href="/products?category=conserve" className="text-emerald-100 hover:text-white transition-colors">
                  Conserve și Murături
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-100">
                  Strada Agriculturii 123, București
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-100">
                  +40 721 234 567
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-100">
                  contact@farm2door.ro
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-emerald-100 text-sm">
              © {currentYear} Farm2Door. Toate drepturile rezervate.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-emerald-100 hover:text-white transition-colors">
                Politica de Confidențialitate
              </Link>
              <Link href="/terms" className="text-emerald-100 hover:text-white transition-colors">
                Termeni și Condiții
              </Link>
              <Link href="/cookies" className="text-emerald-100 hover:text-white transition-colors">
                Politica de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 