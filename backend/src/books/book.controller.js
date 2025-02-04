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
		const books = await Book.find().sort({ createdAt: -1 });
		res.status(200).send({
			books,
		});
	} catch (error) {
		console.log('Error fetching book', error);
		res.status(500).send({ message: 'Failed to fetch books' });
	}
};

const getABook = async (req, res) => {
	try {
		const { id } = req.params;
		const book = await Book.findById(id);
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

module.exports = { postABook, getAllBooks, getABook, updateABook, deleteABook };
