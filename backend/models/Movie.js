// 1. Importera connectDB-funktionen från database.js
import { connectDB } from '../config/database.js';

// 2. Skapa funktion som hämtar movies collection
const getMoviesCollection = async () => {
    // Använd connectDB() för att få databas-objektet
    const db = await connectDB();
    
    // Hämta collectionen "movies"
    const moviesCollection = db.collection('movies');
    
    // Returnera collectionen
    return moviesCollection;
};

// 3. Exportera funktionen
export { getMoviesCollection };