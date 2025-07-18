# Munich Funding Summit - Wartelisten System

Ein fortschrittliches, mehrstufiges Wartelisten-Kontaktformular für den Munich Funding Summit mit Supabase-Backend.

## 🎯 Funktionen

### ✅ Implementiert
- **Einfaches E-Mail-Formular** (`SimpleWaitlist`): Schnelle Newsletter-Anmeldung
- **Mehrstufiges Formular** (`WaitlistForm`): Detaillierte Anmeldung mit Validierung
- **Admin-Dashboard** (`WaitlistAdmin`): Verwaltung und Export der Anmeldungen
- **Supabase-Integration**: Sichere Datenspeicherung und -verwaltung
- **Rate Limiting**: Schutz vor Spam und Mehrfach-Submits
- **Umfassende Validierung**: Client- und Server-seitige Datenvalidierung
- **Responsive Design**: Mobile-First Ansatz mit Tailwind CSS
- **Benutzerfreundlichkeit**: Toast-Benachrichtigungen und Loading-States

### 🔧 Technologie-Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui Komponenten
- **Backend**: Supabase (PostgreSQL + Auth)
- **Formulare**: React Hook Form + Zod Validierung
- **State Management**: React State + React Query
- **Icons**: Lucide React

## 📋 Datenbank-Schema

```sql
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  stage TEXT NOT NULL CHECK (stage IN ('idea', 'prototype', 'mvp', 'growth', 'scale', 'investor', 'other')),
  motivation TEXT NOT NULL,
  interests TEXT[] NOT NULL DEFAULT '{}',
  newsletter BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE
);
```

## 🚀 Verwendung

### Simple Waitlist (Newsletter)
```tsx
import SimpleWaitlist from './components/SimpleWaitlist';

<SimpleWaitlist 
  placeholder="Ihre E-Mail-Adresse"
  buttonText="Subscribe"
/>
```

### Mehrstufiges Formular
```tsx
import WaitlistForm from './components/WaitlistForm';

const [showForm, setShowForm] = useState(false);

<WaitlistForm 
  isVisible={showForm}
  onClose={() => setShowForm(false)}
  initialEmail="user@example.com" // optional
/>
```

### Admin Dashboard
Zugriff über `/admin` Route - zeigt alle Anmeldungen mit Filter- und Export-Funktionen.

## 🔒 Sicherheitsfeatures

- **Rate Limiting**: Max. 3 Versuche pro Minute pro E-Mail
- **E-Mail-Validierung**: Regex + Duplikatsprüfung
- **Input-Sanitization**: Automatische Bereinigung aller Eingaben
- **Error Handling**: Spezifische Fehlerbehandlung für verschiedene Szenarien
- **SQL-Injection-Schutz**: Durch Supabase RLS (Row Level Security)

## 📊 Formular-Schritte

1. **Persönliche Daten**: E-Mail, Vor-/Nachname, Unternehmen, Position
2. **Startup-Phase**: Auswahl der aktuellen Entwicklungsphase
3. **Motivation & Interessen**: Freitext + Multiple-Choice Interessen
4. **Bestätigung**: Review aller Daten vor dem Absenden

## 🎨 Design-System

### Farbpalette (Schwarz-Gold)
- **Primary**: Gold (#D4AF37) - Buttons, Akzente
- **Background**: Schwarz (#000000) - Haupthintergrund
- **Text**: Weiß (#FFFFFF) - Haupttext
- **Secondary**: Grautöne für Abstufungen

### Komponenten
- Konsistente shadcn/ui Komponenten
- Mobile-First responsive Design
- Smooth Animationen und Transitions
- Accessibility-konform (ARIA Labels)

## 🔧 Development

### Installation
```bash
npm install
npm run dev
```

### Supabase Setup
1. Erstellen Sie ein Supabase-Projekt
2. Führen Sie das SQL-Schema aus
3. Konfigurieren Sie die Environment Variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### Build für Production
```bash
npm run build
npm run preview
```

## 📈 Analytics & Monitoring

Das System loggt wichtige Events:
- Erfolgreiche Anmeldungen
- Fehlgeschlagene Versuche
- Rate Limiting Events
- Validierungsfehler

## 🚀 Deployment

### Empfohlene Plattformen
- **Netlify**: Automatisches Deployment mit Git
- **Vercel**: Zero-Config Deployment
- **Cloudflare Pages**: Globales CDN

### Environment Variables
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

## 🔮 Mögliche Erweiterungen

- **E-Mail-Automation**: Automatische Welcome-E-Mails
- **Analytics-Integration**: Google Analytics/Mixpanel
- **A/B-Testing**: Verschiedene Formular-Varianten
- **Social Media Integration**: LinkedIn/Instagram Connect
- **QR-Code-Generator**: Für Event-Marketing
- **Reminder-System**: Follow-up E-Mails
- **Segment-spezifische Inhalte**: Basierend auf Startup-Phase

## 📞 Support

Bei Fragen oder Problemen:
- GitHub Issues für Bug Reports
- E-Mail: events@enactusmunich.de
- Dokumentation: Siehe `/docs` Verzeichnis

---

**Status**: ✅ Produktionsbereit
**Letzte Aktualisierung**: 18. Juli 2025
**Version**: 1.0.0
