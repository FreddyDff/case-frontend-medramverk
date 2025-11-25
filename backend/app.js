// Denna fil skapar och konfigurerar Express-appen
// ↑ Separerad från server.js så att testerna kan importera appen utan att starta servern

import movieRoutes from './routes/movieRoutes.js';
import showRoutes from './routes/showRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// ladda miljövariabler
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/movies', movieRoutes);
app.use('/shows', showRoutes);
app.use('/bookings', bookingRoutes);

// Exportera app för tester och server.js
export default app;

