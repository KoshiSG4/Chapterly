import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import {
	addToWishList,
	removeFromWishList,
} from '../../redux/features/wishList/wishListSlice';
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs';
import { LuChevronsRight } from 'react-icons/lu';
import axios from 'axios';
import getBaseUrl from '../../utils/baseURL';
// import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '../../components/ui/dialog';
import { getBookText } from '../../redux/bookSlice';

const SingleBook = () => {
	const [wishListed, setWishListed] = useState(false);
	const [openBook, setOpenBook] = useState(false);
	const [bookText, setBookText] = useState(null);
	const [bookTextIsLoading, setBookTextIsLoading] = useState(false);
	const { id } = useParams();
	// const { data, isLoading, isError } = useFetchBookByIdQuery(id);
	const { selectedBook, loading, error } = useSelector(
		(state) => state.bookList
	);

	const dispatch = useDispatch();
	const wishListItems = useSelector((state) => state.wishList.wishListItems);

	useEffect(() => {
		if (selectedBook) {
			const isInWishList = wishListItems.some(
				(item) => item.id === selectedBook.id
			);
			setWishListed(isInWishList);
		}
	}, [selectedBook, wishListItems]);

	const handleToggleWishlist = () => {
		if (wishListed) {
			dispatch(removeFromWishList(selectedBook));
			console.log('removed', selectedBook);
		} else {
			dispatch(addToWishList(selectedBook));
			console.log('added', selectedBook);
		}
		setWishListed(!wishListed);
	};

	const handleContinueReading = async (selectedBook) => {
		// const response = await axios.get(
		// 	`${getBaseUrl()}/api/books/${selectedBook.id}/getText`
		// );
		dispatch(getBookText(selectedBook.id));
		setBookText(response.data);
		console.log(bookText);
		setOpenBook(true);
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error happending to load book info</div>;
	return (
		<>
			<div className="max-w-6xl mx-auto shadow-md p-10">
				<h1 className="text-2xl font-bold mb-6 ">
					{selectedBook?.title}
				</h1>

				{/* 2-column layout */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
					{/* Left Column - Image and Details */}
					<div>
						<img
							src={getImgUrl(selectedBook?.formats['image/jpeg'])}
							alt={selectedBook?.title}
							className="mb-6 rounded-md shadow-sm w-64 h-auto object-cover "
						/>

						<div className="mb-5">
							<p className="text-gray-700 mb-2">
								<strong>Author:</strong>{' '}
								{selectedBook?.authors?.[0]?.name ||
									'Unknown Author'}
							</p>

							<div className="text-gray-700 mb-4">
								<strong>Category:</strong>
								<ul className="list-disc list-inside capitalize mt-1 ml-2">
									{selectedBook?.bookshelves?.length ? (
										selectedBook.bookshelves.map(
											(shelf, index) => (
												<li key={index}>{shelf}</li>
											)
										)
									) : (
										<li>Uncategorized</li>
									)}
								</ul>
							</div>
						</div>
					</div>

					{/* Right Column - Summary */}
					<div className="text-gray-800 leading-relaxed">
						<h2 className="text-xl font-semibold mb-3">Summary</h2>
						<p>
							{selectedBook?.summary ||
								'No summary available for this book.'}
						</p>
						<button
							onClick={() => handleContinueReading(selectedBook)}
							className="flex items-center text-blue-500 hover:text-blue-600 font-medium transition-colors">
							<span>Continue Reading...</span>
							<LuChevronsRight className="ml-1 size-4" />
						</button>
						<div className="flex flex-wrap gap-4 mt-8">
							<button
								onClick={() =>
									handleToggleWishlist(selectedBook)
								}
								className="font-semibold bg-yellow-500 p-3 py-2 hover:bg-[#0b1360] hover:text-white rounded-lg flex items-center gap-2">
								{wishListed ? (
									<BsBookmarkHeartFill className="text-blue-700 size-5" />
								) : (
									<BsBookmarkHeart className="text-gray-500 size-5" />
								)}
								<span>
									{wishListed
										? 'Added to Wishlist'
										: 'Add to Wishlist'}
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<Dialog open={openBook} onOpenChange={setOpenBook}>
				<DialogContent className="max-w-[90%] max-h-full overflow-y-auto">
					<DialogHeader>
						<DialogTitle className="text-xl font-semibold">
							{selectedBook?.title}
						</DialogTitle>
					</DialogHeader>

					<pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-serif mt-4">
						{bookText}
					</pre>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default SingleBook;
