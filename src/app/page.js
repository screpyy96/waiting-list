'use client';

import { useState } from 'react';
import Image from "next/image";
import WaitingListForm from "@/features/waiting-list/WaitingListForm";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen hero-pattern">
      {/* Header */}
      <header className="container mx-auto px-4 py-3 flex justify-between items-center relative z-50">
        <div className="flex items-center">
          <div className="text-[#2E7D32] font-bold text-2xl md:text-3xl">Farm2Door</div>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#despre" className="text-gray-700 hover:text-[#2E7D32] transition-colors">Despre noi</a>
          <a href="#cum-functioneaza" className="text-gray-700 hover:text-[#2E7D32] transition-colors">Cum funcționează</a>
          <a href="#beneficii" className="text-gray-700 hover:text-[#2E7D32] transition-colors">Beneficii</a>
          <a href="#contact" className="text-gray-700 hover:text-[#2E7D32] transition-colors">Contact</a>
        </nav>
        <button 
          className="md:hidden text-[#2E7D32] focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Meniu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 md:hidden z-50">
            <nav className="flex flex-col space-y-3">
              <a 
                href="#despre" 
                className="text-gray-700 hover:text-[#2E7D32] transition-colors py-2 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Despre noi
              </a>
              <a 
                href="#cum-functioneaza" 
                className="text-gray-700 hover:text-[#2E7D32] transition-colors py-2 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cum funcționează
              </a>
              <a 
                href="#beneficii" 
                className="text-gray-700 hover:text-[#2E7D32] transition-colors py-2 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beneficii
              </a>
              <a 
                href="#contact" 
                className="text-gray-700 hover:text-[#2E7D32] transition-colors py-2 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="#lista-asteptare" 
                className="bg-[#2E7D32] text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-[#1B5E20] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Înscrie-te acum
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">
              Produse proaspete direct de la fermieri
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Farm2Door conectează fermierii locali cu clienții care doresc produse proaspete și sănătoase.
            </p>
            <div className="flex flex-row gap-3">
              <a href="#lista-asteptare" className="btn-primary text-center text-sm py-2 px-4 md:text-base md:py-3 md:px-6">
                Înscrie-te acum
              </a>
              <a href="#cum-functioneaza" className="btn-secondary text-center text-sm py-2 px-4 md:text-base md:py-3 md:px-6">
                Află cum funcționează
              </a>
            </div>
          </div>
          <div className="md:w-1/2 relative mt-6 md:mt-0">
            <div className="w-full h-[200px] md:h-[350px] relative rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-800/30 to-transparent z-10"></div>
              <div className="relative w-full h-full">
                <img
                  src="/images/legume.webp"
                  alt="Legume proaspete de la fermieri locali"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 z-20 bg-white/90 p-3 rounded-lg shadow-lg">
                <div className="text-[#2E7D32] font-bold text-sm md:text-base">100% Natural</div>
                <div className="text-gray-600 text-xs md:text-sm">Direct de la fermieri</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-8 md:py-12" id="beneficii">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">De ce să alegi Farm2Door?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card p-4 md:p-5">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Produse proaspete</h3>
              <p className="text-sm md:text-base text-gray-600">Legume și fructe recoltate în aceeași zi în care sunt livrate.</p>
            </div>
            
            <div className="card p-4 md:p-5">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Susții economia locală</h3>
              <p className="text-sm md:text-base text-gray-600">Banii tăi ajung direct la fermierii locali.</p>
            </div>
            
            <div className="card p-4 md:p-5">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-[#2E7D32]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Livrare rapidă</h3>
              <p className="text-sm md:text-base text-gray-600">Livrăm în aceeași zi sau a doua zi, direct la ușa ta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-8 md:py-12 bg-gray-50" id="cum-functioneaza">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Cum funcționează</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-lg md:text-xl">1</div>
              <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">Alege produsele</h3>
              <p className="text-xs md:text-base text-gray-600">Navighează prin ofertele fermierilor locali.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-lg md:text-xl">2</div>
              <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">Plasează comanda</h3>
              <p className="text-xs md:text-base text-gray-600">Adaugă produsele în coș și finalizează comanda.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-lg md:text-xl">3</div>
              <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">Fermierii pregătesc</h3>
              <p className="text-xs md:text-base text-gray-600">Fermierii recoltează produsele proaspete.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto mb-2 text-white font-bold text-lg md:text-xl">4</div>
              <h3 className="text-base md:text-xl font-semibold mb-1 md:mb-2">Primești livrarea</h3>
              <p className="text-xs md:text-base text-gray-600">Produsele ajung direct la ușa ta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-8 md:py-12 bg-white" id="despre">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Despre Farm2Door</h2>
              <p className="text-sm md:text-lg text-gray-600 mb-3 md:mb-4">
                Farm2Door a fost creat cu o misiune clară: să conectăm fermierii locali direct cu consumatorii, eliminând intermediarii.
              </p>
              <p className="text-sm md:text-lg text-gray-600">
                Credem în susținerea agriculturii locale și în produse cultivate responsabil.
              </p>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                <div className="rounded-lg overflow-hidden h-28 md:h-40 bg-green-100 flex items-center justify-center">
                  <div className="text-green-800 font-bold text-center p-2 md:p-4 text-sm md:text-base">Fermieri locali</div>
                </div>
                <div className="rounded-lg overflow-hidden h-28 md:h-40 bg-green-100 flex items-center justify-center">
                  <div className="text-green-800 font-bold text-center p-2 md:p-4 text-sm md:text-base">Produse proaspete</div>
                </div>
                <div className="rounded-lg overflow-hidden h-28 md:h-40 bg-green-100 flex items-center justify-center">
                  <div className="text-green-800 font-bold text-center p-2 md:p-4 text-sm md:text-base">Livrare rapidă</div>
                </div>
                <div className="rounded-lg overflow-hidden h-28 md:h-40 bg-green-100 flex items-center justify-center">
                  <div className="text-green-800 font-bold text-center p-2 md:p-4 text-sm md:text-base">Produse organice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waiting List Section */}
      <section className="py-8 md:py-12 bg-gray-50" id="lista-asteptare">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">Fii printre primii care încearcă Farm2Door</h2>
            <p className="text-sm md:text-lg text-gray-600">
              Suntem în curs de lansare! Înscrie-te în lista de așteptare pentru acces prioritar.
            </p>
          </div>
          
          <WaitingListForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 md:py-8" id="contact">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">Farm2Door</h3>
              <p className="text-xs md:text-sm text-gray-300">
                Conectăm fermierii locali cu consumatorii care apreciază produsele proaspete.
              </p>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Link-uri rapide</h4>
              <ul className="space-y-1 text-xs md:text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Acasă</a></li>
                <li><a href="#despre" className="text-gray-300 hover:text-white transition-colors">Despre noi</a></li>
                <li><a href="#cum-functioneaza" className="text-gray-300 hover:text-white transition-colors">Cum funcționează</a></li>
                <li><a href="#beneficii" className="text-gray-300 hover:text-white transition-colors">Beneficii</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Contact</h4>
              <ul className="space-y-1 text-xs md:text-sm">
                <li className="flex items-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-gray-300">contact@farm2door.ro</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-gray-300">0712 345 678</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-gray-300">București, România</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-2 md:mb-3">Urmărește-ne</h4>
              <div className="flex space-x-3 md:space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-700 text-center text-gray-400 text-xs md:text-sm">
            <p>&copy; {new Date().getFullYear()} Farm2Door. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
