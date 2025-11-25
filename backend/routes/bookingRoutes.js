// Denna fil kopplar HTTP-routes till funktionerna i bookingController.js
// ↑ Routes-filen bestämmer vilka URL:er som ska användas för olika funktioner

// 1. Importera express Router för att skapa routes
import express from 'express';
// ↑ express.Router() låter oss skapa routes som kan användas i server.js

// 2. Skapa en router-instans
const router = express.Router();
// ↑ router = ett objekt som hanterar routes för bookings

// 3. Importera alla funktioner från bookingController
import { 
    getAllBookings,           // Hämta alla bokningar
    getBookingById,           // Hämta en specifik bokning
    getBookingsByShowId,      // Hämta alla bokningar för en show
    createBooking,            // Skapa en ny bokning
    updateBooking,            // Uppdatera en bokning
    deleteBooking             // Ta bort en bokning
} from '../controllers/bookingController.js';
// ↑ Importerar funktionerna från controller-filen

// 4. Importera validateApiKey middleware för autentisering
import { validateApiKey } from '../middleware/auth.js';
// ↑ Middleware som kontrollerar att API-nyckel finns och är giltig

// ============================================================================
// SKYDDADE ROUTES (alla routes kräver API-nyckel enligt testkraven)
// ============================================================================

// GET /bookings - Hämta alla bokningar (kräver API-nyckel)
router.get('/', validateApiKey, getAllBookings);
// ↑ validateApiKey körs först, sedan getAllBookings om API-nyckel är giltig

// GET /bookings/show/:showId - Hämta alla bokningar för en specifik show (kräver API-nyckel)
// ↑ Viktigt: show-routen måste komma FÖRE /:id-routen, annars tolkas "show" som ett ID
router.get('/show/:showId', validateApiKey, getBookingsByShowId);
// ↑ validateApiKey körs först, sedan getBookingsByShowId om API-nyckel är giltig

// GET /bookings/:id - Hämta en specifik bokning med ID (kräver API-nyckel)
router.get('/:id', validateApiKey, getBookingById);
// ↑ validateApiKey körs först, sedan getBookingById om API-nyckel är giltig

// POST /bookings - Skapa en ny bokning (kräver API-nyckel)
router.post('/', validateApiKey, createBooking);
// ↑ validateApiKey körs först, sedan createBooking om API-nyckel är giltig

// PUT /bookings/:id - Uppdatera en bokning (kräver API-nyckel)
router.put('/:id', validateApiKey, updateBooking);
// ↑ validateApiKey körs först, sedan updateBooking om API-nyckel är giltig

// DELETE /bookings/:id - Ta bort en bokning (kräver API-nyckel)
router.delete('/:id', validateApiKey, deleteBooking);
// ↑ validateApiKey körs först, sedan deleteBooking om API-nyckel är giltig

// ============================================================================
// EXPORTERA ROUTER
// ============================================================================
export default router;
// ↑ Exporterar router så server.js kan använda den
// ↑ default export = när vi importerar kan vi ge den vilket namn som helst
