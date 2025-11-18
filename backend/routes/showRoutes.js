// denna fil ska koppla HTTP-routes till funktionerna i showController.js
import express from 'express';
const router = express.Router();

import { 
    getAllShows, 
    getShowById, 
    getShowsByMovieId, 
    createShow, 
    updateShow, 
    deleteShow 
} from '../controllers/showController.js';

import { validateApiKey } from '../middleware/auth.js';


router.get('/', getAllShows);
// viktigt att movieid kommer före id i URL:en, annars kommer det att tolkas som ett ID
router.get('/movie/:movieId', getShowsByMovieId);

router.get('/:id', getShowById);

router.post('/', validateApiKey, createShow);

router.put('/:id', validateApiKey, updateShow);

router.delete('/:id', validateApiKey, deleteShow);

export default router;