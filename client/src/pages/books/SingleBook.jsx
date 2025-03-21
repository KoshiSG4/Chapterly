import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import {
	addToWishList,
	removeFromWishList,
} from '../../redux/features/wishList/wishListSlice';
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs';

const SingleBook = () => {
	const [wishListed, setWishListed] = useState(false);
	const { id } = useParams();
	const { data, isLoading, isError } = useFetchBookByIdQuery(id);
	const book = data?.book;

	const dispatch = useDispatch();
	const wishListItems = useSelector((state) => state.wishList.wishListItems);

	useEffect(() => {
		if (book) {
			const isInWishList = wishListItems.some(
				(item) => item.id === book.id
			);
			setWishListed(isInWishList);
		}
	}, [book, wishListItems]);

	const handleToggleWishlist = () => {
		if (wishListed) {
			dispatch(removeFromWishList(book));
			console.log('removed', book);
		} else {
			dispatch(addToWishList(book));
			console.log('added', book);
		}
		setWishListed(!wishListed);
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error happending to load book info</div>;
	return (
		<div className="max-w-lg shadow-md p-5">
			<h1 className="text-2xl font-bold mb-6">{book?.title}</h1>

			<div className="">
				<div>
					<img
						src={getImgUrl(book?.formats['image/jpeg'])}
						alt={book?.title}
						className="mb-8"
					/>
				</div>

				<div className="mb-5">
					<p className="text-gray-700 mb-2">
						<strong>Author:</strong>{' '}
						{book?.authors?.[0]?.name || 'Unknown Author'}
					</p>
					<p className="text-gray-700 mb-4 capitalize">
						<strong>Category:</strong>{' '}
						{book?.bookshelves?.map((shelf, index) => (
							<li key={index}>{shelf}</li>
						))}
					</p>
					<p className="text-gray-700">
						<strong>Description:</strong> {book?.summaries}
					</p>
				</div>

				<button
					onClick={() => handleToggleWishlist(book)}
					className="btn-primary px-3 space-x-1 flex items-center gap-1 mt-auto ">
					{wishListed ? (
						<BsBookmarkHeartFill className="text-blue-700 size-6" />
					) : (
						<BsBookmarkHeart className="text-gray-500 size-6" />
					)}

					<span>
						{wishListed ? 'Added to Wishlist' : 'Add to Wishlist'}
					</span>
				</button>
			</div>
		</div>
	);
};

export default SingleBook;
