'use client';

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';

export default function WaitingList() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSupabaseReady, setIsSupabaseReady] = useState(false);

  useEffect(() => {
    // Verificăm dacă Supabase este inițializat
    if (supabase) {
      setIsSupabaseReady(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificăm dacă Supabase este disponibil
    if (!isSupabaseReady) {
      setStatus({
        type: 'error',
        message: 'Serviciul de înregistrare nu este disponibil momentan. Te rugăm să încerci mai târziu.'
      });
      return;
    }
    
    // Validare
    if (!formData.name.trim()) {
      setStatus({
        type: 'error',
        message: 'Te rugăm să introduci numele tău'
      });
      return;
    }

    if (!formData.email || !formData.email.includes('@')) {
      setStatus({
        type: 'error',
        message: 'Te rugăm să introduci o adresă de email validă'
      });
      return;
    }

    if (!formData.phone.trim()) {
      setStatus({
        type: 'error',
        message: 'Te rugăm să introduci numărul tău de telefon'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Check if email already exists
      const { data: existingEmails, error: checkError } = await supabase
        .from('waiting_list')
        .select('email')
        .eq('email', formData.email)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingEmails) {
        setStatus({
          type: 'error',
          message: 'Acest email este deja înscris în lista noastră de așteptare'
        });
        setIsSubmitting(false);
        return;
      }

      // Insert new record
      const { error } = await supabase
        .from('waiting_list')
        .insert([{ 
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        }]);

      if (error) throw error;

      setStatus({
        type: 'success',
        message: 'Mulțumim! Ai fost adăugat în lista noastră de așteptare'
      });
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
    } catch (error) {
      console.error('Eroare la înscrierea în lista de așteptare:', error);
      setStatus({
        type: 'error',
        message: 'A apărut o eroare. Te rugăm să încerci din nou mai târziu.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="farm-gradient p-3 md:p-4 text-white">
        <h2 className="text-lg md:text-xl font-bold text-center">
          Înscrie-te în Lista de Așteptare
        </h2>
        <p className="text-center mt-1 opacity-90 text-xs md:text-sm">
          Fii primul care află când Farm2Door se lansează în zona ta.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 md:p-4 space-y-2 md:space-y-3">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
            Nume și Prenume
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ion Popescu"
            className="input-field text-sm py-2"
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
            Adresă de Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@exemplu.ro"
            className="input-field text-sm py-2"
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
            Număr de Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0712 345 678"
            className="input-field text-sm py-2"
            disabled={isSubmitting}
            required
          />
        </div>
        
        {status.message && (
          <div className={`text-xs p-2 rounded ${
            status.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-center">
              {status.type === 'success' ? (
                <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              {status.message}
            </div>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full mt-2 text-sm py-2"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Se procesează...
            </span>
          ) : (
            'Înscrie-te în Lista de Așteptare'
          )}
        </button>
      </form>
    </div>
  );
} 