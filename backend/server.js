import { connectDB } from './config/database.js';
import movieRoutes from './routes/movieRoutes.js';
import showRoutes from './routes/showRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
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
app.use('/shows', showRoutes);
app.use('/bookings', bookingRoutes);


// Starta server
app.listen(PORT, () => {
    console.log(`Server körs på port ${PORT}`);
});

// Exportera app för tester
export default app;