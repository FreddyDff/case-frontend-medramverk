// 1. Importera connectDB-funktionen från database.js
import { connectDB } from '../config/database.js';

// 2. Skapa funktion som hämtar shows collection från databasen
const getShowsCollection = async () => {
    // Steg 1: Använd connectDB() för att få databas-objektet
    const db = await connectDB();
    // ↑ Vänta på att databasen ansluts, spara databas-objektet i variabeln "db"
    
    // Steg 2: Hämta collectionen "shows" från databasen
    const showsCollection = db.collection('shows');
    // ↑ Från databas-objektet, hämta collectionen som heter "shows" och spara den

    // Steg 3: Returnera collectionen så andra filer kan använda den
    return showsCollection;
    // ↑ Skicka tillbaka shows collection så controllers kan använda den
};

// 3. Exportera funktionen så andra filer kan importera och använda den
export { getShowsCollection };