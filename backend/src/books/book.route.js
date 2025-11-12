const express = require('express');
const Book = require('./book.model');
const {
	postABook,
	getAllBooks,
	getABook,
	updateABook,
	deleteABook,
	fetchNews,
	searchBooks,
	getBookText,
} = require('./book.controller');
const router = express.Router();

//post a book
router.post('/create-book', postABook);

//get all books
router.get('/getAll', getAllBooks);

//fetch news
router.get('/news', fetchNews);

//search books
router.get('/search', searchBooks);

//get a book
router.get('/:id', getABook);

//get a book text
router.get('/:id/getText', getBookText);

//update a book
router.put('/update/:id', updateABook);

//delete a book
router.delete('/delete/:id', deleteABook);

module.exports = router;
