import { createFlashcard,getFlashcardById,getFlashcards,updateFlashcard ,deleteFlashcard} from "../controllers/flashcard.controller.js";
import express from 'express';
const router = express.Router();
router.post('/flashCard/create', createFlashcard);
router.get('/flashCard/getAll', getFlashcards);
router.get('/flashCard/:id', getFlashcardById);
router.put('/flashCard/update/:id', updateFlashcard);
router.delete('/flashCard/delete/:id', deleteFlashcard);

export default router;