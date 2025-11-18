import express from 'express';
import {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
} from '../controllers/movieController.js';
import { validateApiKey } from '../middleware/auth.js';

const router = express.Router();

// Publika routes (ingen auth behövs)
router.get('/', getAllMovies);
router.get('/:id', getMovieById);

// Skyddade routes (kräver API-nyckel)
router.post('/', validateApiKey, createMovie);
router.put('/:id', validateApiKey, updateMovie);
router.delete('/:id', validateApiKey, deleteMovie);

export default router;