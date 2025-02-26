import React, { useEffect, useState } from 'react';
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import {
	addToWishList,
	removeFromWishList,
} from '../../redux/features/wishList/wishListSlice';

const BookCard = ({ book }) => {
	const dispatch = useDispatch();
	const [wishListed, setWishListed] = useState(false);

	const handleAddToWishList = (product) => {
		setWishListed(!wishListed);
		dispatch(addToWishList(product));
	};

	const handleToggleWishlist = () => {
		if (wishListed) {
			dispatch(removeFromWishList(book.id));
		} else {
			dispatch(addToWishList(book));
		}
		setWishListed(!wishListed);
	};

	return (
		<div className=" rounded-lg transition-shadow duration-300">
			<div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
				<div className="w-52 h-auto sm:h-72 sm:flex-shrink-0 border rounded-md ">
					<Link to={`/books/${book._id}`}>
						<img
							src={getImgUrl(book.formats['image/jpeg'])}
							alt={book.title}
							className=" bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200 object-cover"
						/>
					</Link>
				</div>

				<div>
					<Link to={`/books/${book._id}`}>
						<h3 className="text-base font-semibold hover:text-blue-600 mb-3">
							{book?.title}
						</h3>
					</Link>
					<p className="text-sm text-gray-600 mb-5">
						{book?.summaries?.[0]
							? `${book?.summaries[0].slice(0, 80)}...`
							: book?.summaries?.[0]}
					</p>
					<button
						onClick={() => handleAddToWishList(book)}
						className="btn-primary px-3 space-x-1 flex items-center gap-1 ">
						{wishListed ? (
							<BsBookmarkHeartFill className="text-red-500" />
						) : (
							<BsBookmarkHeart className="text-gray-500" />
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
	);
};

export default BookCard;
