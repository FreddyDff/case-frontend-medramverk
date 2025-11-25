// Seed-script för att lägga till testdata i databasen
// ↑ Detta script lägger till filmer och föreställningar så du har något att testa med

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Ladda miljövariabler
dotenv.config();

// Connection string - samma som i database.js
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cinema';

// Testdata - filmer
const movies = [
  {
    title: 'Inception',
    description: 'En tjuv som tränger in i andras drömmar för att stjäla hemligheter från deras undermedvetna. En komplex berättelse om drömmar inom drömmar.',
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    duration: 148,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
  },
  {
    title: 'The Godfather',
    description: 'Den åldrande patriarken i en organiserad brottslig dynasti överför kontrollen av sitt hemliga imperium till sin motvillige son.',
    genre: 'Drama',
    director: 'Francis Ford Coppola',
    duration: 175,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
  },
  {
    title: 'Tron',
    description: 'En dataprogrammerare blir transporterad in i den digitala världen där han måste kämpa för sin överlevnad i ett cyberspace-spel.',
    genre: 'Sci-Fi',
    director: 'Steven Lisberger',
    duration: 96,
    posterUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e542ca9d-2008-4830-9ef1-5fcfa93e376c/dkp7uyk-94b24244-3fc9-45bc-ba99-210ae46690d6.png/v1/fit/w_750,h_1008,q_70,strp/tron__ascension__2014__by_captainclarke19_dkp7uyk-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTEyNSIsInBhdGgiOiIvZi9lNTQyY2E5ZC0yMDA4LTQ4MzAtOWVmMS01ZmNmYTkzZTM3NmMvZGtwN3V5ay05NGIyNDI0NC0zZmM5LTQ1YmMtYmE5OS0yMTBhZTQ2NjkwZDYucG5nIiwid2lkdGgiOiI8PTgzNyJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.vKTwVv3jTXRv0C6q4m1XgezYWEhIIcMQBCGfG-xrYlo'
  },
  {
    title: 'The Dark Knight',
    description: 'När hotet som kallas Jokern skapar kaos och förödelse i Gotham, måste Batman acceptera ett av de största psykologiska och fysiska testerna av sin förmåga att bekämpa orättvisa.',
    genre: 'Action',
    director: 'Christopher Nolan',
    duration: 152,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'
  },
  {
    title: 'Blade Runner',
    description: 'En pensionerad polis jagar genetiskt modifierade replikanter i en dystopisk framtid i Los Angeles.',
    genre: 'Sci-Fi',
    director: 'Ridley Scott',
    duration: 117,
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_%281982_poster%29.png'
  }
];

// Funktion för att skapa föreställningar för en film
const createShowsForMovie = (movieId, movieTitle) => {
  const today = new Date();
  const shows = [];
  
  // Skapa endast 4 föreställningar totalt
  // 2 idag, 2 imorgon
  const times = ['14:00', '17:00', '20:00', '22:00'];
  
  for (let i = 0; i < 4; i++) {
    const showDate = new Date(today);
    // Första två föreställningarna idag, sista två imorgon
    if (i >= 2) {
      showDate.setDate(today.getDate() + 1);
    }
    
    const [hours, minutes] = times[i].split(':');
    const startTime = new Date(showDate);
    startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // Generera tillgängliga platser - endast 3 rader (A, B, C) med 10 stolar vardera
    const availableSeats = [];
    const rows = ['A', 'B', 'C']; // Endast 3 rader istället för 8
    rows.forEach(row => {
      for (let seat = 1; seat <= 10; seat++) {
        availableSeats.push(`${row}${seat}`);
      }
    });
    
    shows.push({
      movieId: movieId,
      startTime: startTime.toISOString(),
      availableSeats: availableSeats,
      availableSeatsList: availableSeats, // För frontend-kompatibilitet
      bookedSeats: [],
      pricePerSeat: 150,
      roomNumber: 1
    });
  }
  
  return shows;
};

// Huvudfunktion för att seeda databasen
const seedDatabase = async () => {
  let client = null;
  
  try {
    console.log('🌱 Startar seed-processen...');
    
    // Anslut till databasen
    console.log('🔌 Ansluter till MongoDB...');
    client = await MongoClient.connect(MONGODB_URI);
    const db = client.db('cinema');
    const moviesCollection = db.collection('movies');
    const showsCollection = db.collection('shows');
    const bookingsCollection = db.collection('bookings');
    console.log('✅ Ansluten till MongoDB');
    
    // Rensa befintlig data (valfritt - kommentera bort om du vill behålla gamla data)
    console.log('🗑️  Rensar befintlig data...');
    await moviesCollection.deleteMany({});
    await showsCollection.deleteMany({});
    await bookingsCollection.deleteMany({});
    console.log('✅ Data rensad');
    
    // Lägg till filmer
    console.log('📽️  Lägger till filmer...');
    const movieResults = await moviesCollection.insertMany(movies);
    console.log(`✅ ${movieResults.insertedCount} filmer tillagda`);
    
    // Lägg till föreställningar för varje film
    console.log('🎬 Lägger till föreställningar...');
    let totalShows = 0;
    
    for (const movie of movies) {
      const insertedMovie = await moviesCollection.findOne({ title: movie.title });
      if (insertedMovie) {
        const shows = createShowsForMovie(insertedMovie._id, movie.title);
        const showResults = await showsCollection.insertMany(shows);
        totalShows += showResults.insertedCount;
        console.log(`  ✅ ${showResults.insertedCount} föreställningar för "${movie.title}"`);
      }
    }
    
    console.log(`✅ Totalt ${totalShows} föreställningar tillagda`);
    
    console.log('\n🎉 Seed-processen klar!');
    console.log(`📊 Sammanfattning:`);
    console.log(`   - Filmer: ${movieResults.insertedCount}`);
    console.log(`   - Föreställningar: ${totalShows}`);
    console.log(`   - Bokningar: 0 (kommer att skapas när användare bokar)`);
    console.log('\n✨ Du kan nu starta servern och testa frontend!');
    
  } catch (error) {
    console.error('❌ Fel vid seed-processen:', error);
    process.exit(1);
  } finally {
    // Stäng anslutningen
    if (client) {
      await client.close();
      console.log('🔌 Databasanslutning stängd');
    }
    process.exit(0);
  }
};

// Kör seed-funktionen
seedDatabase();

