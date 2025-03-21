import React from 'react';

import BookCard from '../books/BookCard';
import { useSearchBooksQuery } from '../../redux/features/books/booksApi';
import { useSearchParams } from 'react-router';

function SearchedBooks() {
	const [searchParams] = useSearchParams();
	const query = searchParams.get('query') || '';

	const { data, isLoading, isFetching } = useSearchBooksQuery(query);
	const books = data?.filteredBooks || [];
	const searchedBooks = books.filter((book) =>
		book?.title?.toLowerCase().includes(query.toLowerCase())
	);
	console.log(searchedBooks);

	return (
		<div className="py-16 ">
			<h2 className="text-2xl font-semibold mb-6">Search Results</h2>
			{isLoading || isFetching ? (
				<p className="text-gray-500">Loading...</p>
			) : searchedBooks.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
					{searchedBooks.map((book) => (
						<BookCard key={book.id} book={book} />
					))}
				</div>
			) : (
				<p className="text-gray-500">No Books Found</p>
			)}
		</div>
	);
}

export default SearchedBooks;
