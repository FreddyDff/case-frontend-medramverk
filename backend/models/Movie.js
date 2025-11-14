// 1. Importera connectDB-funktionen från database.js
import { connectDB } from '../config/database.js';

// 2. Skapa funktion som hämtar movies collection från databasen
const getMoviesCollection = async () => {
    // Steg 1: Använd connectDB() för att få databas-objektet
    const db = await connectDB();
    // ↑ Vänta på att databasen ansluts, spara databas-objektet i variabeln "db"
    
    // Steg 2: Hämta collectionen "movies" från databasen
    const moviesCollection = db.collection('movies');
    // ↑ Från databas-objektet, hämta collectionen som heter "movies" och spara den

    // Steg 3: Returnera collectionen så andra filer kan använda den
    return moviesCollection;
    // ↑ Skicka tillbaka movies collection så controllers kan använda den
};

// 3. Exportera funktionen så andra filer kan importera och använda den
export { getMoviesCollection };