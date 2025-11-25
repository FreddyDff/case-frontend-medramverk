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

// ============================================================================
// PUBLIKA ROUTES (inga krav på autentisering)
// ============================================================================

// GET /bookings - Hämta alla bokningar
router.get('/', getAllBookings);
// ↑ När någon gör GET-request till /bookings, kör getAllBookings-funktionen

// GET /bookings/show/:showId - Hämta alla bokningar för en specifik show
// ↑ Viktigt: show-routen måste komma FÖRE /:id-routen, annars tolkas "show" som ett ID
router.get('/show/:showId', getBookingsByShowId);
// ↑ När någon gör GET-request till /bookings/show/123, kör getBookingsByShowId-funktionen

// GET /bookings/:id - Hämta en specifik bokning med ID
router.get('/:id', getBookingById);
// ↑ När någon gör GET-request till /bookings/123, kör getBookingById-funktionen

// ============================================================================
// SKYDDADE ROUTES (kräver autentisering - kan läggas till senare om behövs)
// ============================================================================

// POST /bookings - Skapa en ny bokning
router.post('/', createBooking);
// ↑ När någon gör POST-request till /bookings, kör createBooking-funktionen
// ↑ I produktion skulle man kunna lägga till validateApiKey här om bokningar ska vara skyddade

// PUT /bookings/:id - Uppdatera en bokning
router.put('/:id', updateBooking);
// ↑ När någon gör PUT-request till /bookings/123, kör updateBooking-funktionen

// DELETE /bookings/:id - Ta bort en bokning
router.delete('/:id', deleteBooking);
// ↑ När någon gör DELETE-request till /bookings/123, kör deleteBooking-funktionen

// ============================================================================
// EXPORTERA ROUTER
// ============================================================================
export default router;
// ↑ Exporterar router så server.js kan använda den
// ↑ default export = när vi importerar kan vi ge den vilket namn som helst
