# Cinema Booking System

Ett fullständigt biobokningssystem byggt med React (frontend) och Node.js/Express (backend) med MongoDB som databas.

## 📋 Innehållsförteckning

- [Teknologier](#-teknologier)
- [Förutsättningar](#-förutsättningar)
- [Installation](#-installation)
- [Konfiguration](#-konfiguration)
- [Starta applikationen](#-starta-applikationen)
- [Testning](#-testning)
- [Projektstruktur](#-projektstruktur)

## 🛠️ Teknologier

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - Databas
- **Jest** - Testramverk

### Frontend
- **React** - UI-bibliotek
- **React Router Dom** - Routing
- **Vite** - Build tool

## 📦 Förutsättningar

Innan du börjar, se till att du har installerat:

- **Node.js** (version 18 eller senare) - [Ladda ner här](https://nodejs.org/)
- **MongoDB** - Antingen:
  - Lokal MongoDB installation, eller
  - MongoDB Atlas-konto (gratis tier fungerar)

## 🚀 Installation

### 1. Klona eller navigera till projektet

```bash
cd case-frontend-medramverk
```

### 2. Installera Backend-dependencies

```bash
cd backend
npm install
```

### 3. Installera Frontend-dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Konfiguration

### Backend - MongoDB-anslutning

1. Skapa en `.env`-fil i `backend/`-mappen:

```bash
cd backend
touch .env
```

2. Lägg till följande i `.env`-filen:

**För lokal MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/cinema
PORT=3000
```

**För MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://användarnamn:lösenord@cluster.mongodb.net/cinema
PORT=3000
```

> **Tips:** Ersätt `användarnamn` och `lösenord` med dina MongoDB Atlas-uppgifter.

## 🎬 Starta applikationen

### Steg 1: Starta MongoDB

**Om du använder lokal MongoDB:**
- Se till att MongoDB-tjänsten körs på din dator
- Windows: MongoDB körs vanligtvis automatiskt som en tjänst
- Mac/Linux: `mongod` (eller `brew services start mongodb-community`)

**Om du använder MongoDB Atlas:**
- Inga extra steg behövs, anslutningen sker automatiskt

### Steg 2: Lägg till testdata (Seed)

Öppna ett nytt terminalfönster och kör:

```bash
cd backend
npm run seed
```

Detta kommer att:
- Rensa befintlig data
- Lägga till 5 filmer (Inception, The Godfather, Tron, The Dark Knight, Blade Runner)
- Skapa 4 föreställningar per film (totalt 20 föreställningar)
- Varje föreställning har 30 stolar (3 rader: A, B, C)

Du bör se:
```
🌱 Startar seed-processen...
✅ Ansluten till MongoDB
🗑️  Rensar befintlig data...
✅ Data rensad
📽️  Lägger till filmer...
✅ 5 filmer tillagda
🎬 Lägger till föreställningar...
✅ Totalt 20 föreställningar tillagda
🎉 Seed-processen klar!
```

### Steg 3: Starta Backend-servern

I samma terminal (eller en ny):

```bash
cd backend
node server.js
```

Du bör se:
```
✅ Ansluten till MongoDB
Server körs på port 3000
```

> **OBS:** Låt denna terminal vara öppen - servern måste köra för att API:et ska fungera.

### Steg 4: Starta Frontend

Öppna ett **nytt terminalfönster** och kör:

```bash
cd frontend
npm run dev
```

Du bör se något liknande:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Steg 5: Öppna applikationen

Öppna din webbläsare och gå till:
```
http://localhost:5173
```

## ✅ Testa applikationen

### 1. Välj en film
- Du bör se 5 filmer på startsidan
- Klicka på en film för att se föreställningar

### 2. Välj en föreställning
- Du kommer till bokningssidan
- Välj en föreställning (datum och tid)

### 3. Boka biljetter
- Välj antal biljetter (1-8)
- Välj platser på säteskartan (3 rader: A, B, C)
- Fyll i namn och email
- Klicka på "Fortsätt till betalning"

### 4. Bekräftelse
- Du kommer att se en bekräftelsesida med alla bokningsdetaljer
- Bokningen är nu sparad i databasen!

## 🧪 Testning

### Kör Backend-tester

```bash
cd backend/tests
npm install  # Om du inte redan gjort det
npm test
```

Detta kör alla tester för Movies, Shows och Bookings API.

**Förväntat resultat:**
```
Test Suites: 3 passed, 3 total
Tests:       44 passed, 44 total
```

### Kör specifika tester

```bash
# Bara Movies-tester
npm test movies.test.js

# Bara Shows-tester
npm test shows.test.js

# Bara Bookings-tester
npm test bookings.test.js
```

## 📁 Projektstruktur

```
case-frontend-medramverk/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB-anslutning
│   ├── controllers/              # Business logic
│   │   ├── bookingController.js
│   │   ├── movieController.js
│   │   └── showController.js
│   ├── models/                   # Databasmodeller
│   │   ├── Booking.js
│   │   ├── Movie.js
│   │   └── Show.js
│   ├── routes/                   # API routes
│   │   ├── bookingRoutes.js
│   │   ├── movieRoutes.js
│   │   └── showRoutes.js
│   ├── middleware/
│   │   └── auth.js              # API-nyckel validering
│   ├── tests/                   # Tester
│   │   ├── bookings.test.js
│   │   ├── movies.test.js
│   │   └── shows.test.js
│   ├── app.js                   # Express app (för tester)
│   ├── server.js                # Server start
│   ├── seed.js                  # Testdata script
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/          # React-komponenter
    │   │   ├── MovieCard.jsx
    │   │   ├── MovieList.jsx
    │   │   ├── Navigation.jsx
    │   │   └── ShowCard.jsx
    │   ├── pages/              # Sidor
    │   │   ├── HomePage.jsx
    │   │   ├── BookingPage.jsx
    │   │   ├── AboutPage.jsx
    │   │   └── ContactPage.jsx
    │   ├── hooks/              # Custom hooks
    │   │   └── useBooking.js
    │   ├── api.js              # API-anrop
    │   ├── App.jsx             # Huvudapp
    │   └── main.jsx            # Entry point
    └── package.json
```

## 🔑 API-nyckel

Backend kräver en API-nyckel för vissa operationer (POST, PUT, DELETE).

**API-nyckel:** `valid-api-key`

Detta är hårdkodat i `backend/middleware/auth.js` för utvecklingssyfte.

## 🐛 Felsökning

### Problem: "Cannot connect to MongoDB"

**Lösning:**
- Kontrollera att MongoDB körs (lokal) eller att din Atlas-anslutning är korrekt
- Verifiera `MONGODB_URI` i `.env`-filen
- För Atlas: Kontrollera att din IP-adress är tillåten i nätverksinställningar

### Problem: "Port 3000 already in use"

**Lösning:**
- Stäng andra program som använder port 3000
- Eller ändra `PORT` i `.env`-filen till en annan port (t.ex. 3001)
- Uppdatera `API_BASE` i `frontend/src/api.js` om du ändrar port

### Problem: "Inga filmer visas"

**Lösning:**
- Kör `npm run seed` i backend-mappen för att lägga till testdata
- Kontrollera att backend-servern körs
- Öppna Developer Tools i webbläsaren och kolla Console för felmeddelanden

### Problem: "Bokning fungerar inte"

**Lösning:**
- Kontrollera att backend-servern körs
- Kontrollera att du har fyllt i både namn och email
- Kontrollera att du har valt rätt antal platser
- Kolla Console i Developer Tools för felmeddelanden

## 📝 Ytterligare information

### Seed-data

Seed-scriptet (`backend/seed.js`) lägger till:
- **5 filmer** med posterbilder och beskrivningar
- **4 föreställningar per film** (totalt 20 föreställningar)
- **30 stolar per föreställning** (3 rader: A, B, C med 10 stolar vardera)

### API Endpoints

**Movies:**
- `GET /movies` - Hämta alla filmer
- `GET /movies/:id` - Hämta specifik film
- `POST /movies` - Skapa film (kräver API-nyckel)
- `PUT /movies/:id` - Uppdatera film (kräver API-nyckel)
- `DELETE /movies/:id` - Ta bort film (kräver API-nyckel)

**Shows:**
- `GET /shows` - Hämta alla föreställningar
- `GET /shows/movie/:movieId` - Hämta föreställningar för en film
- `GET /shows/:id` - Hämta specifik föreställning
- `POST /shows` - Skapa föreställning (kräver API-nyckel)
- `PUT /shows/:id` - Uppdatera föreställning (kräver API-nyckel)
- `DELETE /shows/:id` - Ta bort föreställning (kräver API-nyckel)

**Bookings:**
- `GET /bookings` - Hämta alla bokningar (kräver API-nyckel)
- `GET /bookings/show/:showId` - Hämta bokningar för en show (kräver API-nyckel)
- `GET /bookings/:id` - Hämta specifik bokning (kräver API-nyckel)
- `POST /bookings` - Skapa bokning (kräver API-nyckel)
- `PUT /bookings/:id` - Uppdatera bokning (kräver API-nyckel)
- `DELETE /bookings/:id` - Ta bort bokning (kräver API-nyckel)

## 👨‍💻 Utvecklare

Detta projekt är byggt som en skoluppgift med fokus på:
- Tydlig MVC-struktur
- Enkel och förståelig kod
- Omfattande kommentarer på svenska
- Fullständig testning

## 📄 Licens

Detta projekt är skapat för utbildningssyfte.

---

**Lycka till med projektet! 🎬🎟️**

