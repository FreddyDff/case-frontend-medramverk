// 1. Importera getMoviesCollection från Movie model
import { getMoviesCollection } from '../models/Movie.js';
// ↑ Hämtar funktionen som ger oss tillgång till movies collection i databasen

// 2. Importera ObjectId från mongodb för att konvertera string-ID till MongoDB ObjectId
import { ObjectId } from 'mongodb';
// ↑ MongoDB använder ObjectId för _id, så vi måste konvertera string-ID till ObjectId

// ============================================================================
// FUNKTION 1: getAllMovies - Hämta alla filmer
// ============================================================================
const getAllMovies = async (req, res) => {
    // ↑ async = funktionen kan ta tid (väntar på databasen)
    // ↑ req = request-objektet (innehåller data från klienten)
    // ↑ res = response-objektet (används för att skicka svar tillbaka)
    
    try {
        // Steg 1: Hämta movies collection från databasen
        const moviesCollection = await getMoviesCollection();
        // ↑ Vänta på att få tillgång till movies collection
        
        // Steg 2: Hämta alla filmer från collectionen
        const movies = await moviesCollection.find().toArray();
        // ↑ find() = hitta alla dokument, toArray() = konvertera till array
        
        // Steg 3: Skicka tillbaka alla filmer med status 200 (OK)
        res.status(200).json(movies);
        // ↑ status(200) = allt gick bra, json(movies) = skicka filmerna som JSON
    } catch (error) {
        // Om något går fel, skicka tillbaka ett felmeddelande
        res.status(500).json({ error: error.message });
        // ↑ status(500) = server error, json({ error: ... }) = skicka felmeddelandet
    }
};

// ============================================================================
// FUNKTION 2: getMovieById - Hämta en specifik film med ID
// ============================================================================
const getMovieById = async (req, res) => {
    try {
        // Steg 1: Hämta movies collection från databasen
        const moviesCollection = await getMoviesCollection();
        
        // Steg 2: Konvertera string-ID från URL till MongoDB ObjectId
        const id = new ObjectId(req.params.id);
        // ↑ req.params.id = ID:t från URL (t.ex. /movies/123 → id = "123")
        // ↑ new ObjectId() = konvertera string till MongoDB ObjectId
        
        // Steg 3: Sök efter filmen med det specifika ID:t
        const movie = await moviesCollection.findOne({ _id: id });
        // ↑ findOne() = hitta ett dokument, { _id: id } = sök efter dokument med detta ID
        
        // Steg 4: Kontrollera om filmen hittades
        if (!movie) {
            // Om filmen inte finns, skicka tillbaka 404 (Not Found)
            return res.status(404).json({ error: 'Film hittades inte' });
            // ↑ return = stoppa funktionen här, status(404) = not found
        }
        
        // Steg 5: Om filmen hittades, skicka tillbaka den med status 200 (OK)
        res.status(200).json(movie);
    } catch (error) {
        // Om något går fel (t.ex. ogiltigt ID-format), skicka tillbaka fel
        res.status(500).json({ error: error.message });
    }
};

// ============================================================================
// FUNKTION 3: createMovie - Skapa en ny film
// ============================================================================
const createMovie = async (req, res) => {
    try {
        // Steg 1: Hämta movies collection från databasen
        const moviesCollection = await getMoviesCollection();
        
        // Steg 2: Hämta filmdata från request body
        const movieData = req.body;
        // ↑ req.body = data som skickades med POST-requesten (t.ex. { title: "...", description: "..." })
        
        // Steg 3: Validera att obligatoriska fält finns
        if (!movieData.title || !movieData.description || !movieData.duration) {
            // Om något obligatoriskt fält saknas, skicka tillbaka 400 (Bad Request)
            return res.status(400).json({ error: 'Title, description och duration är obligatoriska fält' });
            // ↑ status(400) = bad request (fel data skickad)
        }
        
        // Steg 4: Skapa filmen i databasen
        const result = await moviesCollection.insertOne(movieData);
        // ↑ insertOne() = lägg till ett nytt dokument, returnerar resultat med _id
        
        // Steg 5: Hämta den nyskapade filmen från databasen
        const newMovie = await moviesCollection.findOne({ _id: result.insertedId });
        // ↑ insertedId = ID:t som MongoDB gav till den nya filmen
        
        // Steg 6: Skicka tillbaka den nya filmen med status 201 (Created)
        res.status(201).json(newMovie);
        // ↑ status(201) = created (ny resurs skapad)
    } catch (error) {
        // Om något går fel, skicka tillbaka fel
        res.status(500).json({ error: error.message });
    }
};

// ============================================================================
// FUNKTION 4: updateMovie - Uppdatera en befintlig film
// ============================================================================
const updateMovie = async (req, res) => {
    try {
        // Steg 1: Hämta movies collection från databasen
        const moviesCollection = await getMoviesCollection();
        
        // Steg 2: Konvertera string-ID från URL till MongoDB ObjectId
        const id = new ObjectId(req.params.id);
        
        // Steg 3: Kontrollera om filmen finns innan vi uppdaterar
        const existingMovie = await moviesCollection.findOne({ _id: id });
        if (!existingMovie) {
            // Om filmen inte finns, skicka tillbaka 404 (Not Found)
            return res.status(404).json({ error: 'Film hittades inte' });
        }
        
        // Steg 4: Hämta uppdateringsdata från request body
        const updateData = req.body;
        // ↑ req.body = data som skickades med PUT-requesten (t.ex. { title: "Ny titel" })
        
        // Steg 5: Uppdatera filmen i databasen
        await moviesCollection.updateOne(
            { _id: id },           // Hitta filmen med detta ID
            { $set: updateData }   // Uppdatera med den nya datan
        );
        // ↑ updateOne() = uppdatera ett dokument, $set = sätt dessa fält till nya värden
        
        // Steg 6: Hämta den uppdaterade filmen från databasen
        const updatedMovie = await moviesCollection.findOne({ _id: id });
        
        // Steg 7: Skicka tillbaka den uppdaterade filmen med status 200 (OK)
        res.status(200).json(updatedMovie);
    } catch (error) {
        // Om något går fel (t.ex. ogiltigt ID-format), skicka tillbaka fel
        res.status(500).json({ error: error.message });
    }
};

// ============================================================================
// FUNKTION 5: deleteMovie - Ta bort en film
// ============================================================================
const deleteMovie = async (req, res) => {
    try {
        // Steg 1: Hämta movies collection från databasen
        const moviesCollection = await getMoviesCollection();
        
        // Steg 2: Konvertera string-ID från URL till MongoDB ObjectId
        const id = new ObjectId(req.params.id);
        
        // Steg 3: Kontrollera om filmen finns innan vi tar bort den
        const existingMovie = await moviesCollection.findOne({ _id: id });
        if (!existingMovie) {
            // Om filmen inte finns, skicka tillbaka 404 (Not Found)
            return res.status(404).json({ error: 'Film hittades inte' });
        }
        
        // Steg 4: Ta bort filmen från databasen
        await moviesCollection.deleteOne({ _id: id });
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
export { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie };
// ↑ Exportera alla funktioner så routes kan importera och använda dem

