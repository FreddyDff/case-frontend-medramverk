import { MongoClient } from 'mongodb';

// Connection string - var databasen finns
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cinema';

// Variabel för att spara client-anslutningen
let client = null;
let db = null;

// Funktion för att ansluta till databasen
const connectDB = async () => {
    try {
        // Steg 1: Anslut till MongoDB
        client = await MongoClient.connect(MONGODB_URI);
        console.log('✅ Ansluten till MongoDB');
        
        // Steg 2: Hämta databas-objektet (databasen heter "cinema")
        db = client.db('cinema');
        
        // Steg 3: Returnera databas-objektet så andra filer kan använda det
        return db;
    } catch (error) {
        // Om något går fel, visa felet och avsluta programmet
        console.error('❌ Fel vid anslutning till MongoDB:', error);
        process.exit(1);
    }
};

// Exportera funktionen så andra filer kan använda den
export { connectDB };