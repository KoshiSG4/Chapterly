const express = require('express');
const Book = require('./book.model');
const {
	postABook,
	getAllBooks,
	getABook,
	updateABook,
	deleteABook,
} = require('./book.controller');
const router = express.Router();

//post a book
router.post('/create-book', postABook);

//get all books
router.get('/', getAllBooks);

//get a book
router.get('/:id', getABook);

//update a book
router.put('/update/:id', updateABook);

//delete a book
router.delete('/delete/:id', deleteABook);

module.exports = router;
