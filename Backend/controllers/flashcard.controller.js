import Flashcard from '../models/flashcard.model.js';
import errHandler from '../utlies/error.js';
const createFlashcard = async (req, res,next) => {
//   if(!req.user.isAdmin){
//     return next(errHandler(401,"You are not allowed to create a flashcard"));
//   }
  if(!req.body.question || !req.body.answer || !req.body.category){
    return next(errHandler(400,"Question, answer and category are required"));
    }
    try {
        const flashcard = await Flashcard.create(req.body);
       const savedFlashCard=await  flashcard.save();
        res.status(201).json(savedFlashCard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getFlashcards = async (req, res) => {
    try {
        const flashcards = await Flashcard.find();
        res.status(200).json(flashcards);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getFlashcardById = async (req, res) => {
    try {
        const flashcard = await Flashcard.findById(req.params.id);
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.status(200).json(flashcard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateFlashcard = async (req, res) => {
    try {
        const flashcard = await Flashcard.findByIdAndUpdate
        (req.params.id, req.body, { new: true, runValidators: true });
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.status(200).json(flashcard);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const deleteFlashcard = async (req, res) => {
    try {
        const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
        if (!flashcard) {
            return res.status(404).json({ message: 'Flashcard not found' });
        }
        res.status(200).json({ message: 'Flashcard deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { createFlashcard, getFlashcards, getFlashcardById, updateFlashcard, deleteFlashcard };