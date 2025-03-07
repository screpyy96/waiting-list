# 🌱 Farm2Door - Conectăm Fermierii cu Consumatorii

Farm2Door este o platformă modernă care conectează fermierii locali direct cu consumatorii, eliminând intermediarii și oferind acces la produse proaspete și sănătoase.

![Farm2Door Preview](public/images/og-image.jpg)

## 🚀 Caracteristici

- 💻 Interfață modernă și responsivă
- 🔒 Sistem de listă de așteptare cu Supabase
- 📱 Design adaptabil pentru toate dispozitivele
- ⚡ Performanță optimizată
- 🎨 Animații și tranziții fluide
- 🔍 SEO optimizat

## 🛠️ Tehnologii Folosite

- **Frontend:**
  - Next.js 15.2
  - React 19
  - TailwindCSS
  - Geist Font

- **Backend:**
  - Supabase
  - PostgreSQL

- **Tooling:**
  - ESLint
  - PostCSS
  - Turbopack

## 📦 Instalare

1. **Clonează repository-ul:**
```bash
git clone https://github.com/your-username/farm2door.git
cd farm2door
```

2. **Instalează dependențele:**
```bash
npm install
# sau
yarn install
# sau
pnpm install
```

3. **Configurează variabilele de mediu:**
Creează un fișier `.env.local` și adaugă:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SITE_URL=your-production-url
```

4. **Configurează baza de date Supabase:**
Execută următorul SQL în editorul SQL Supabase:
```sql
CREATE TABLE waiting_list (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

5. **Pornește serverul de dezvoltare:**
```bash
npm run dev
# sau
yarn dev
# sau
pnpm dev
```

Deschide [http://localhost:3000](http://localhost:3000) în browser pentru a vedea rezultatul.

## 📝 Dezvoltare

### Structura Proiectului
```
farm2door/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Componente React reutilizabile
│   └── lib/             # Utilități și configurări
├── public/              # Fișiere statice
└── ...
```

### Comenzi Disponibile

- `npm run dev` - Pornește serverul de dezvoltare
- `npm run build` - Construiește aplicația pentru producție
- `npm run start` - Pornește serverul de producție
- `npm run lint` - Rulează verificarea codului
- `npm run analyze` - Analizează bundle-ul

## 🚀 Deployment

Aplicația este optimizată pentru deployment pe Vercel:

1. Importă repository-ul în Vercel
2. Adaugă variabilele de mediu în setările proiectului
3. Deployul se va face automat la fiecare push în main

## 🔄 Actualizare Sitemap

Sitemapul se actualizează automat folosind GitHub Actions. Configurația se află în `.github/workflows/sitemap.yml`.

## 📱 Responsive Design

Aplicația este complet responsivă și optimizată pentru:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🤝 Contribuție

Contribuțiile sunt binevenite! Te rugăm să:

1. Fork repository-ul
2. Creează un branch pentru feature (`git checkout -b feature/AmazingFeature`)
3. Commit schimbările (`git commit -m 'Add some AmazingFeature'`)
4. Push la branch (`git push origin feature/AmazingFeature`)
5. Deschide un Pull Request

## 📄 Licență

Acest proiect este licențiat sub [MIT License](LICENSE).

## 📞 Contact

Pentru întrebări și suport:
- Email: contact@farm2door.ro
- Website: https://farm2door.ro

---

Dezvoltat cu ❤️ pentru fermierii și consumatorii din România
