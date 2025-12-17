// denna fil hanterar logiekn för shows API: hämta, skapa, uppdatera och ta bort föreställningar
import { getShowsCollection } from '../models/Show.js';
// för att komma åt movies i databasen
import { getMoviesCollection } from '../models/Movie.js';
// för att konvertera string-ID till MongoDB ObjectId
import { ObjectId } from 'mongodb';

// ====================================================================================
// FUNKTION 1: getAllShows - Hämta alla föreställningar
// ====================================================================================
const getAllShows = async (req, res) => {
    try {
        const showsCollection = await getShowsCollection();
        const shows = await showsCollection.find().toArray();
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// hämta en specifik föreställning
const getShowById = async (req, res) => {
    try {
        const showsCollection = await getShowsCollection();
        const id = new ObjectId(req.params.id);
        const show = await showsCollection.findOne({ _id: id });
        
        if (!show) {
            return res.status(404).json({ error: 'Föreställning hittades inte' });
        }
        
        res.status(200).json(show);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// hämta alla föreställningar för en specifik film
const getShowsByMovieId = async (req, res) => {
    try {
        const showsCollection = await getShowsCollection();
        // Konvertera movieId till ObjectId för att söka korrekt
        const movieId = new ObjectId(req.params.movieId);
        
        // Hämta alla shows som har detta movieId
        const shows = await showsCollection.find({ movieId: movieId }).toArray();
        
        res.status(200).json(shows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// skapa en ny föreställning
const createShow = async (req, res) => {
    try {
        const showsCollection = await getShowsCollection();
        const moviesCollection = await getMoviesCollection();
        const showData = req.body;
        
        // Validera obligatoriska fält
        if (!showData.movieId || !showData.startTime) {
            return res.status(400).json({ error: 'movieId och startTime är obligatoriska fält' });
        }
        
        // Validera att movieId finns i databasen
        const movieId = new ObjectId(showData.movieId);
        const movie = await moviesCollection.findOne({ _id: movieId });
        
        if (!movie) {
            return res.status(400).json({ error: 'Ogiltigt movieId' });
        }
        
        // Konvertera movieId till ObjectId i showData innan vi sparar
        showData.movieId = movieId;
        
        // Validera att startTime är i framtiden
        const startTime = new Date(showData.startTime);
        if (isNaN(startTime.getTime())) {
            return res.status(400).json({ error: 'Ogiltigt startTime-format' });
        }
        const now = new Date();
        if (startTime <= now) {
            return res.status(400).json({ error: 'startTime måste vara i framtiden' });
        }
        
        // Validera att availableSeats är en array om det skickas med
        if (showData.availableSeats !== undefined) {
            if (!Array.isArray(showData.availableSeats)) {
                return res.status(400).json({ error: 'availableSeats måste vara en array' });
            }
        }
        
        // Skapa föreställningen
        const result = await showsCollection.insertOne(showData);
        const newShow = await showsCollection.findOne({ _id: result.insertedId });
        
        res.status(201).json(newShow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// uppdatera en befintlig föreställning
const updateShow = async (req, res) => {
    try {
        const showsCollection = await getShowsCollection();
        const id = new ObjectId(req.params.id);
        
        // Kontrollera om föreställningen finns  fråga nr 5!
        const existingShow = await showsCollection.findOne({ _id: id });
        if (!existingShow) {
            return res.status(404).json({ error: 'Föreställning hittades inte' });
        }
        
        // Uppdatera föreställningen
        const updateData = req.body;
        
        // Validera att startTime är i framtiden om det uppdateras
        if (updateData.startTime !== undefined) {
            const startTime = new Date(updateData.startTime);
            if (isNaN(startTime.getTime())) {
                return res.status(400).json({ error: 'Ogiltigt startTime-format' });
            }
            const now = new Date();
            if (startTime <= now) {
                return res.status(400).json({ error: 'startTime måste vara i framtiden' });
            }
        }
        
        // Validera att availableSeats är en array om det skickas med
        if (updateData.availableSeats !== undefined) {
            if (!Array.isArray(updateData.availableSeats)) {
                return res.status(400).json({ error: 'availableSeats måste vara en array' });
            }
        }
        
        await showsCollection.updateOne(
            { _id: id },
            { $set: updateData }
        );
        
        // Hämta den uppdaterade föreställningen
        const updatedShow = await showsCollection.findOne({ _id: id });
        res.status(200).json(updatedShow);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ta bort en föreställning
const deleteShow = async (req, res) => {
    try {
        const showsCollection = await getShowsCollection();
        const id = new ObjectId(req.params.id);
        
        // Kontrollera om föreställningen finns
        const existingShow = await showsCollection.findOne({ _id: id });
        if (!existingShow) {
            return res.status(404).json({ error: 'Föreställning hittades inte' });
        }
        
        // Ta bort föreställningen
        await showsCollection.deleteOne({ _id: id });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { 
    getAllShows, 
    getShowById, 
    getShowsByMovieId, 
    createShow, 
    updateShow, 
    deleteShow 
};