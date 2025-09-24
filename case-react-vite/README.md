# 🎬 Cinema Malmö - Biografbokningssystem

Ett modernt webbaserat biografbokningssystem byggt med React och Vite. Användare kan enkelt bläddra bland filmer, välja föreställningar, välja platser och boka biljetter online.

## 📋 Projektöversikt

Detta projekt är en fullständig frontend-applikation för ett biografbokningssystem som tillåter användare att:
- Visa tillgängliga filmer med detaljerad information
- Välja föreställningar baserat på datum och tid
- Välja specifika platser i biografen
- Boka biljetter med e-postbekräftelse
- Navigera mellan olika sidor (Filmer, Om oss, Kontakt)

## 🚀 Teknisk Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router DOM 7.9.1
- **Styling**: CSS3 med moderna gradienter och animationer
- **API Integration**: REST API för filmdata och bokningar
- **Development**: ESLint för kodkvalitet

## 🏗️ Projektstruktur

```
src/
├── components/           # Återanvändbara komponenter
│   ├── MovieCard.jsx    # Filmkort-komponent
│   ├── MovieList.jsx    # Lista över filmer
│   ├── Navigation.jsx   # Huvudnavigation
│   └── ShowCard.jsx     # Föreställningskort
├── pages/               # Huvudsidor
│   ├── HomePage.jsx     # Startsida med filmlista
│   ├── BookingPage.jsx  # Bokningssida med platsval
│   ├── AboutPage.jsx    # Om oss-sida
│   └── ContactPage.jsx  # Kontaktsida
├── api.js              # API-integration
├── App.jsx             # Huvudapplikation
├── App.css             # Globala stilar
└── main.jsx            # Applikationsstart
```

## 🎯 Huvudfunktioner

### 1. Filmvisning (HomePage)
- **Filmkatalog**: Visar alla tillgängliga filmer med poster, titel, beskrivning, genre och regissör
- **API-integration**: Hämtar filmdata från extern API
- **Fallback-system**: Använder mock-data om API:et inte är tillgängligt
- **Svensk översättning**: Automatisk översättning av filmbeskrivningar
- **Responsiv design**: Anpassar sig till olika skärmstorlekar

### 2. Bokningssystem (BookingPage)
- **Föreställningsval**: Välj mellan olika datum och tider
- **Interaktiv säteskarta**: Visuell representation av biografen med tillgängliga/upptagna platser
- **Biljettantal**: Välj antal biljetter (1-8)
- **Platsval**: Klicka för att välja specifika platser
- **E-postbekräftelse**: Ange e-post för biljettleverans
- **Bokningsbekräftelse**: Detaljerad bekräftelse med bokningsnummer

### 3. Navigation & Sidor
- **Responsiv navigation**: Sticky header med aktiv sida-markering
- **Om oss-sida**: Information om biografen och dess historia
- **Kontaktsida**: Kontaktinformation och kontaktformulär

## 🎨 Design & UX

### Visuell Design
- **Mörkt tema**: Professionell biografkänsla med mörka färger
- **Gradienter**: Moderna färggradienter för knappar och bakgrunder
- **Animationer**: Smooth hover-effekter och övergångar
- **Typography**: Tydlig hierarki med olika textstorlekar

### Användarupplevelse
- **Intuitiv navigation**: Tydlig meny och breadcrumbs
- **Visuell feedback**: Loading-states, error-meddelanden och bekräftelser
- **Responsiv design**: Fungerar på desktop, tablet och mobil
- **Tillgänglighet**: Tydliga färgkontraster och hover-states

## 🔧 API Integration

### Endpoints
- `GET /api/v1/movies` - Hämta alla filmer
- `GET /api/v1/shows/movie/{id}` - Hämta föreställningar för specifik film
- `POST /api/v1/bookings` - Skapa ny bokning

### Felhantering
- Automatisk fallback till mock-data vid API-fel
- Tydliga felmeddelanden för användaren
- Console-logging för utveckling

## 🚀 Installation & Körning

### Förutsättningar
- Node.js (version 18 eller högre)
- npm eller yarn

### Installation
```bash
# Klona repository
git clone https://github.com/FreddyDff/case-frontend-medramverk.git

# Navigera till projektmappen
cd case-frontend-medramverk

# Installera dependencies
npm install

# Starta utvecklingsserver
npm run dev

# Bygg för produktion
npm run build

# Förhandsvisning av produktionsbuild
npm run preview
```

### Tillgängliga Scripts
- `npm run dev` - Startar utvecklingsserver på http://localhost:5173
- `npm run build` - Bygger applikationen för produktion
- `npm run preview` - Förhandsvisar produktionsbuild
- `npm run lint` - Kör ESLint för kodkvalitetskontroll

## 🌐 Live Deployment

### Vercel Deployment
Denna applikation är live deployad på Vercel och kan nås via:
**Live URL:** [https://case-frontend-medramverk.vercel.app](https://case-frontend-medramverk.vercel.app)

### Deployment-historik
- **Försökt med Hoster.glimnet (Dokploy)**: Flera försök gjordes att deploya via Hoster.glimnet's Dokploy-plattform, men deployment-processen misslyckades upprepade gånger trots korrekt konfiguration och felfri kod.
- **Vercel som alternativ**: Vercel valdes som alternativ deployment-plattform och fungerade smidigt med automatisk GitHub-integration och enkel konfiguration.

### Vercel-fördelar
- **Automatisk deployment**: Varje push till main branch triggar automatiskt redeployment
- **GitHub-integration**: Smidig koppling med GitHub-repository
- **Global CDN**: Snabb laddningstid över hela världen
- **Enkel konfiguration**: Automatisk upptäckt av Vite-projekt

## 📱 Responsiv Design

Applikationen är fullt responsiv och anpassar sig till:
- **Desktop**: Full funktionalitet med stora säteskartor
- **Tablet**: Optimerad layout för touch-interaktion
- **Mobil**: Kompakt design med anpassade säteskartor

## 🎯 Framtida Förbättringar

### Planerade Funktioner
- Användarautentisering och profiler
- Betalningsintegration (ej implementerad - endast bokningssystem utan betalning)
- E-postnotifikationer
- Admin-panel för filmhantering
- Favoritfilmer och användarhistorik
- Sökfunktion för filmer
- Filtrering efter genre eller datum

### Tekniska Förbättringar
- TypeScript-implementering
- State management med Redux eller Zustand
- Unit testing med Jest och React Testing Library
- E2E testing med Cypress
- PWA-funktionalitet
- Prestandaoptimering med lazy loading

## 🛠️ Utveckling

### Kodstruktur
- **Komponentbaserad arkitektur**: Modulära, återanvändbara komponenter
- **Props drilling**: Enkel datahantering mellan komponenter
- **CSS Modules**: Organiserade stilar per komponent
- **ESLint**: Automatisk kodkvalitetskontroll

### Best Practices
- Konsistent namngivning
- Kommenterad kod för komplexa funktioner
- Error boundaries för felhantering
- Responsiv design från början

## 📄 Licens

Detta projekt är skapat som en teknisk demonstration och är avsett för utbildningssyfte.

## 👥 Bidrag

För att bidra till projektet:
1. Forka repository
2. Skapa en feature branch
3. Commita dina ändringar
4. Pusha till branch
5. Skapa en Pull Request

---

**Utvecklat med ❤️ för modern biografupplevelse**
