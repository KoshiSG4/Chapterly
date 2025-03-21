require('dotenv').config();

const { default: axios } = require('axios');
const Book = require('./book.model');

const postABook = async (req, res) => {
	try {
		const newBook = await Book({ ...req.body });
		await newBook.save();
		res.status(200).send({
			message: 'Book posted successfully',
			book: newBook,
		});
	} catch (error) {
		console.log('Error creating book', error);
		res.status(500).send({ message: 'Failed to create boook' });
	}
};

const getAllBooks = async (req, res) => {
	try {
		const response = await axios.get('https://gutendex.com/books/');
		const books = response.data.results;
		const popularBooks = books
			.sort((a, b) => b.download_count - a.download_count)
			.slice(0, 50);
		res.status(200).send({
			popularBooks,
		});
	} catch (error) {
		console.log('Error fetching book', error.message);
		res.status(500).send({ message: 'Failed to fetch books' });
	}
};

const getABook = async (req, res) => {
	try {
		const { id } = req.params;
		// const book = await Book.findById(id);
		const response = await axios.get(`https://gutendex.com/books/${id}`);
		const book = response.data;
		if (!book) {
			res.status(404).send({ message: 'Book is not found' });
		}
		res.status(200).send({
			book,
		});
	} catch (error) {
		console.log('Error fetching the book', error);
		res.status(500).send({ message: 'Failed to fetch the book' });
	}
};

const searchBooks = async (req, res) => {
	try {
		const { query } = req.query;
		console.log('backend', query);

		if (!query) {
			return res
				.status(400)
				.send({ message: 'query parameter is required' });
		}
		console.log('searching for books', query.toLowerCase());
		const response = await axios.get(
			`https://gutendex.com/books/?search=${query.toLowerCase()}`
		);
		const books = response.data.results;
		const filteredBooks = books.filter((book) =>
			book.title.toLowerCase().includes(query.toLowerCase())
		);

		console.log(filteredBooks);

		res.status(200).send({
			filteredBooks,
		});
	} catch (error) {
		console.log('Error searching books', error);
		res.status(500).send({ message: 'Failed to search the book' });
	}
};

const updateABook = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updateABook) {
			res.status(404).send({ message: 'Book is not found' });
		}
		res.status(200).send({
			message: 'Book updated successfully',
			book: updatedBook,
		});
	} catch (error) {
		console.log('Error updating the book', error);
		res.status(500).send({ message: 'Failed to update the book' });
	}
};

const deleteABook = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedBook = await Book.findByIdAndDelete(id);
		if (!deletedBook) {
			res.status(404).send({ message: 'Book is not found' });
		}
		res.status(200).send({
			message: 'Book deleted successfully',
			book: deletedBook,
		});
	} catch (error) {
		console.log('Error deleting the book', error);
		res.status(500).send({ message: 'Failed to delete the book' });
	}
};

const fetchNews = async (req, res) => {
	try {
		const response = await axios.get(
			`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${process.env.NEWS_API_KEY}`
		);
		const news = response.data.articles;
		res.status(200).send({ news });
	} catch (error) {
		console.log('Error fetching news', error);
		res.status(500).send({ message: 'Failed to fetch news' });
	}
};

module.exports = {
	postABook,
	getAllBooks,
	searchBooks,
	getABook,
	updateABook,
	deleteABook,
	fetchNews,
};
