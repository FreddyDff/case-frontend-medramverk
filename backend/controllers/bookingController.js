// 1. Importera getBookingsCollection från Booking model
import { getBookingsCollection } from '../models/Booking.js';
// ↑ Hämtar funktionen som ger oss tillgång till bookings collection i databasen

// 2. Importera getShowsCollection för att validera showId
import { getShowsCollection } from '../models/Show.js';
// ↑ Behövs för att kontrollera att showId finns i databasen

// 3. Importera ObjectId från mongodb för att konvertera string-ID till MongoDB ObjectId
import { ObjectId } from 'mongodb';
// ↑ MongoDB använder ObjectId för _id, så vi måste konvertera string-ID till ObjectId

// ============================================================================
// FUNKTION 1: getAllBookings - Hämta alla bokningar
// ============================================================================
const getAllBookings = async (req, res) => {
    // ↑ async = funktionen kan ta tid (väntar på databasen)
    // ↑ req = request-objektet (innehåller data från klienten)
    // ↑ res = response-objektet (används för att skicka svar tillbaka)
    
    try {
        // Steg 1: Hämta bookings collection från databasen
        const bookingsCollection = await getBookingsCollection();
        // ↑ Vänta på att få tillgång till bookings collection
        
        // Steg 2: Hämta alla bokningar från collectionen
        const bookings = await bookingsCollection.find().toArray();
        // ↑ find() = hitta alla dokument, toArray() = konvertera till array
        
        // Steg 3: Skicka tillbaka alla bokningar med status 200 (OK)
        res.status(200).json(bookings);
        // ↑ status(200) = allt gick bra, json(bookings) = skicka bokningarna som JSON
    } catch (error) {
        // Om något går fel, skicka tillbaka ett felmeddelande
        res.status(500).json({ error: error.message });
        // ↑ status(500) = server error, json({ error: ... }) = skicka felmeddelandet
    }
};

// ============================================================================
// FUNKTION 2: getBookingById - Hämta en specifik bokning med ID
// ============================================================================
const getBookingById = async (req, res) => {
    try {
        // Steg 1: Hämta bookings collection från databasen
        const bookingsCollection = await getBookingsCollection();
        
        // Steg 2: Konvertera string-ID från URL till MongoDB ObjectId
        const id = new ObjectId(req.params.id);
        // ↑ req.params.id = ID:t från URL (t.ex. /bookings/123 → id = "123")
        // ↑ new ObjectId() = konvertera string till MongoDB ObjectId
        
        // Steg 3: Sök efter bokningen med det specifika ID:t
        const booking = await bookingsCollection.findOne({ _id: id });
        // ↑ findOne() = hitta ett dokument, { _id: id } = sök efter dokument med detta ID
        
        // Steg 4: Kontrollera om bokningen hittades
        if (!booking) {
            // Om bokningen inte finns, skicka tillbaka 404 (Not Found)
            return res.status(404).json({ error: 'Bokning hittades inte' });
            // ↑ return = stoppa funktionen här, status(404) = not found
        }
        
        // Steg 5: Om bokningen hittades, skicka tillbaka den med status 200 (OK)
        res.status(200).json(booking);
    } catch (error) {
        // Om något går fel (t.ex. ogiltigt ID-format), skicka tillbaka fel
        res.status(500).json({ error: error.message });
    }
};

// ============================================================================
// FUNKTION 3: getBookingsByShowId - Hämta alla bokningar för en specifik show
// ============================================================================
const getBookingsByShowId = async (req, res) => {
    try {
        // Steg 1: Hämta bookings collection från databasen
        const bookingsCollection = await getBookingsCollection();
        
        // Steg 2: Konvertera showId från URL till MongoDB ObjectId
        const showId = new ObjectId(req.params.showId);
        // ↑ req.params.showId = showId från URL (t.ex. /bookings/show/123)
        
        // Steg 3: Hämta alla bokningar som har detta showId
        const bookings = await bookingsCollection.find({ showId: showId }).toArray();
        // ↑ find({ showId: showId }) = hitta alla dokument med detta showId
        
        // Steg 4: Skicka tillbaka bokningarna med status 200 (OK)
        res.status(200).json(bookings);
        // ↑ Om inga bokningar hittas, returneras en tom array []
    } catch (error) {
        // Om något går fel, skicka tillbaka fel
        res.status(500).json({ error: error.message });
    }
};

// ============================================================================
// FUNKTION 4: createBooking - Skapa en ny bokning
// ============================================================================
const createBooking = async (req, res) => {
    try {
        // Steg 1: Hämta collections från databasen
        const bookingsCollection = await getBookingsCollection();
        const showsCollection = await getShowsCollection();
        
        // Steg 2: Hämta bokningsdata från request body
        const bookingData = req.body;
        // ↑ req.body = data som skickades med POST-requesten (t.ex. { name: "...", email: "...", showId: "..." })
        
        // Steg 3: Validera att obligatoriska fält finns
        if (!bookingData.name || !bookingData.email || !bookingData.showId) {
            // Om något obligatoriskt fält saknas, skicka tillbaka 400 (Bad Request)
            return res.status(400).json({ error: 'Name, email och showId är obligatoriska fält' });
            // ↑ status(400) = bad request (fel data skickad)
        }
        
        // Steg 4: Validera email-format med regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(bookingData.email)) {
            // Om email inte matchar korrekt format, skicka tillbaka 400
            return res.status(400).json({ error: 'Ogiltigt email-format' });
        }
        
        // Steg 5: Validera att showId finns i databasen
        const showId = new ObjectId(bookingData.showId);
        const show = await showsCollection.findOne({ _id: showId });
        if (!show) {
            // Om showId inte finns, skicka tillbaka 400
            return res.status(400).json({ error: 'Ogiltigt showId' });
        }
        
        // Steg 6: Kontrollera dubbelbokning (samma email + showId)
        const existingBooking = await bookingsCollection.findOne({
            email: bookingData.email,
            showId: showId
        });
        if (existingBooking) {
            // Om det redan finns en bokning med samma email och showId, skicka tillbaka 409 (Conflict)
            return res.status(409).json({ error: 'Bokning finns redan för denna email och show' });
            // ↑ status(409) = conflict (dubbelbokning)
        }
        
        // Steg 7: Konvertera showId till ObjectId i bookingData innan vi sparar
        bookingData.showId = showId;
        
        // Steg 8: Skapa bokningen i databasen
        const result = await bookingsCollection.insertOne(bookingData);
        // ↑ insertOne() = lägg till ett nytt dokument, returnerar resultat med _id
        
        // Steg 9: Hämta den nyskapade bokningen från databasen
        const newBooking = await bookingsCollection.findOne({ _id: result.insertedId });
        // ↑ insertedId = ID:t som MongoDB gav till den nya bokningen
        
        // Steg 10: Skicka tillbaka den nya bokningen med status 201 (Created)
        res.status(201).json(newBooking);
        // ↑ status(201) = created (ny resurs skapad)
    } catch (error) {
        // Om något går fel, skicka tillbaka fel
        res.status(500).json({ error: error.message });
    }
};

// ============================================================================
// FUNKTION 5: updateBooking - Uppdatera en befintlig bokning
// ============================================================================
const updateBooking = async (req, res) => {
    try {
        // Steg 1: Hämta collections från databasen
        const bookingsCollection = await getBookingsCollection();
        const showsCollection = await getShowsCollection();
        
        // Steg 2: Konvertera string-ID från URL till MongoDB ObjectId
        const id = new ObjectId(req.params.id);
        // ↑ req.params.id = ID:t från URL (t.ex. /bookings/123 → id = "123")
        
        // Steg 3: Kontrollera om bokningen finns innan vi uppdaterar
        const existingBooking = await bookingsCollection.findOne({ _id: id });
        if (!existingBooking) {
            // Om bokningen inte finns, skicka tillbaka 404 (Not Found)
            return res.status(404).json({ error: 'Bokning hittades inte' });
            // ↑ return = stoppa funktionen här, status(404) = not found
        }
        
        // Steg 4: Hämta uppdateringsdata från request body
        const updateData = req.body;
        // ↑ req.body = data som skickades med PUT-requesten (t.ex. { name: "Nytt namn", email: "ny@email.com" })
        
        // Steg 5: Om showId ska uppdateras, validera att det finns i databasen
        if (updateData.showId) {
            const showId = new ObjectId(updateData.showId);
            const show = await showsCollection.findOne({ _id: showId });
            if (!show) {
                // Om showId inte finns, skicka tillbaka 400
                return res.status(400).json({ error: 'Ogiltigt showId - show finns inte' });
            }
            // Konvertera showId till ObjectId i updateData
            updateData.showId = showId;
        }
        
        // Steg 6: Om email ska uppdateras, validera email-format med regex
        if (updateData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(updateData.email)) {
                // Om email inte matchar korrekt format, skicka tillbaka 400
                return res.status(400).json({ error: 'Ogiltigt email-format' });
            }
        }
        
        // Steg 7: Uppdatera bokningen i databasen
        await bookingsCollection.updateOne(
            { _id: id },           // Hitta bokningen med detta ID
            { $set: updateData }   // Uppdatera med den nya datan
        );
        // ↑ updateOne() = uppdatera ett dokument, $set = sätt dessa fält till nya värden
        
        // Steg 8: Hämta den uppdaterade bokningen från databasen
        const updatedBooking = await bookingsCollection.findOne({ _id: id });
        
        // Steg 9: Skicka tillbaka den uppdaterade bokningen med status 200 (OK)
        res.status(200).json(updatedBooking);
        // ↑ status(200) = allt gick bra, json(updatedBooking) = skicka bokningen som JSON
    } catch (error) {
        // Om något går fel (t.ex. ogiltigt ID-format), skicka tillbaka fel
        res.status(500).json({ error: error.message });
    }
};

// ============================================================================
// FUNKTION 6: deleteBooking - Ta bort en bokning
// ============================================================================
const deleteBooking = async (req, res) => {
    try {
        // Steg 1: Hämta bookings collection från databasen
        const bookingsCollection = await getBookingsCollection();
        
        // Steg 2: Konvertera string-ID från URL till MongoDB ObjectId
        const id = new ObjectId(req.params.id);
        
        // Steg 3: Kontrollera om bokningen finns innan vi tar bort den
        const existingBooking = await bookingsCollection.findOne({ _id: id });
        if (!existingBooking) {
            // Om bokningen inte finns, skicka tillbaka 404 (Not Found)
            return res.status(404).json({ error: 'Bokning hittades inte' });
        }
        
        // Steg 4: Ta bort bokningen från databasen
        await bookingsCollection.deleteOne({ _id: id });
        // ↑ deleteOne() = ta bort ett dokument med detta ID
        
        // Steg 5: Skicka tillbaka status 204 (No Content) - framgångsrikt borttagen
        res.status(204).send();
        // ↑ status(204) = no content (framgångsrikt borttagen, inget innehåll att returnera)
        // ↑ .send() = skicka tomt svar (ingen JSON)
    } catch (error) {
        // Om något går fel (t.ex. ogiltigt ID-format), skicka tillbaka fel
        res.status(500).json({ error: error.message });
    }
};

// ============================================================================
// EXPORTERA ALLA FUNKTIONER
// ============================================================================
export { 
    getAllBookings, 
    getBookingById, 
    getBookingsByShowId, 
    createBooking, 
    updateBooking,
    deleteBooking 
};
// ↑ Exportera alla funktioner så routes kan importera och använda dem
