import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Verificăm dacă suntem în browser pentru a evita erori în timpul build-ului
const isBrowser = typeof window !== 'undefined';

let supabase = null;

// Inițializăm Supabase doar dacă suntem în browser sau dacă avem variabilele de mediu
if (isBrowser || (supabaseUrl && supabaseAnonKey)) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export default supabase; 