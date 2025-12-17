// 1. Importera connectDB-funktionen från database.js
import { connectDB } from '../config/database.js';

// 2. Skapa funktion som hämtar bookings collection
const getBookingsCollection = async () => {
    // Använd connectDB() för att få databas-objektet
    const db = await connectDB();
    // ↑ Vänta på att databasen ansluts, spara resultatet i "db"
    
    // Hämta collectionen "bookings"
    const bookingsCollection = db.collection('bookings');
    // ↑ Från databas-objektet, hämta collectionen som heter "bookings"

    // Returnera collectionen
    return bookingsCollection;
    // ↑ Skicka tillbaka collectionen så andra kan använda den
};

// 3. Exportera funktionen
export { getBookingsCollection };