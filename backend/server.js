import { connectDB } from './config/database.js';
import movieRoutes from './routes/movieRoutes.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// ladda miljövariabler
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// anslut till databasen vid start
connectDB();

// Routes
app.use('/movies', movieRoutes);
// app.use('/shows', showRoutes);  // Kommer att läggas till senare
// app.use('/bookings', bookingRoutes);  // Kommer att läggas till senare


// Starta server
app.listen(PORT, () => {
    console.log(`Server körs på port ${PORT}`);
});

// Exportera app för tester
export default app;