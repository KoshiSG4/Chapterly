import React, { useEffect, useState } from 'react';
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { LuBookCheck } from 'react-icons/lu';
import { IoMdBook } from 'react-icons/io';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
	addToWishList,
	removeFromWishList,
} from '../../redux/features/wishList/wishListSlice';
import {
	addToReadingList,
	removeFromReadingList,
} from '../../redux/features/readingList/readingListSlice';
import {
	addToCompletedList,
	removeFromCompletedList,
} from '../../redux/features/completedList/completedListSlice';

const BookCard = ({ book }) => {
	const dispatch = useDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState();
	const [wishListed, setWishListed] = useState(false);
	const [readingList, setReadingList] = useState(false);
	const [completedList, setCompletedList] = useState(false);

	const wishListItems = useSelector((state) => state.wishList.wishListItems);
	const readingListItems = useSelector(
		(state) => state.readingList.readingListItems
	);
	const completedListItems = useSelector(
		(state) => state.completedList.completedListItems
	);

	const options = [
		'Add to Wishlist',
		'Currently Reading',
		'Completed Reading',
	];

	useEffect(() => {
		if (book) {
			setWishListed(wishListItems.some((item) => item.id === book.id));
			setReadingList(
				readingListItems.some((item) => item.id === book.id)
			);
			setCompletedList(
				completedListItems.some((item) => item.id === book.id)
			);
		}
	}, [book, wishListItems, readingListItems, completedListItems]);

	const handleToggleWishlist = () => {
		if (wishListed) {
			dispatch(removeFromWishList(book));
		} else {
			dispatch(addToWishList(book));
		}
		setWishListed(!wishListed);
	};
	const handleToggleReadingList = () => {
		if (readingList) {
			dispatch(removeFromReadingList(book));
		} else {
			dispatch(addToReadingList(book));
		}
		setReadingList(!readingList);
	};
	const handleToggleCompletedList = () => {
		if (completedList) {
			dispatch(removeFromCompletedList(book));
		} else {
			dispatch(addToCompletedList(book));
		}
		setCompletedList(!completedList);
	};

	const handleSelect = (option) => {
		setSelectedOption(option);
		if (option === 'Add to Wishlist') {
			handleToggleWishlist(book);
		} else if (option === 'Currently Reading') {
			handleToggleReadingList(book);
		} else if (option === 'Completed Reading') {
			handleToggleCompletedList(book);
		}
		setIsOpen(false);
	};

	return (
		<div className="relative rounded-lg transition-shadow duration-300 overflow-hidden">
			<div className="flex flex-col sm:flex-row sm:items-start sm:h-72  sm:justify-center gap-4">
				<div className="w-52 h-80 sm:h-80 sm:flex-shrink-0 border rounded-md p-2 shadow-md ">
					<Link to={`/books/${book.id}`}>
						<img
							src={getImgUrl(book.formats['image/jpeg'])}
							alt={book.title}
							className="bg-cover rounded-md cursor-pointer hover:scale-105 transition-transform duration-200 object-cover"
						/>
					</Link>
				</div>

				<div className="flex flex-col sm:h-72 justify-between">
					<Link to={`/books/${book.id}`}>
						<h3 className="text-base font-semibold hover:text-blue-600 mb-3">
							{book?.title?.length > 30
								? `${book?.title.slice(0, 40)}...`
								: book?.title}
						</h3>
					</Link>
					<p className="text-sm text-gray-600 mb-5">
						{book?.summaries?.[0]
							? `${book?.summaries[0].slice(0, 130)}...`
							: book?.summaries?.[0]}
					</p>
					{/* combined split button */}
					<div className="inline-flex rounded-md shadow-sm w-full">
						{/* Main Button */}
						<button
							onClick={() => {
								if (completedList) {
									handleToggleCompletedList(book);
								} else if (readingList) {
									handleToggleReadingList(book);
								} else {
									handleToggleWishlist(book);
								}
							}}
							className="flex items-center gap-1 btn-primary px-3 mt-auto">
							{completedList ? (
								<LuBookCheck className="text-blue-700 size-6" />
							) : readingList ? (
								<IoMdBook className="text-blue-700 size-6" />
							) : wishListed ? (
								<BsBookmarkHeartFill className="text-blue-700 size-6" />
							) : (
								<BsBookmarkHeart className="text-gray-500 size-6" />
							)}

							<span>
								{completedList
									? 'Completed Reading'
									: readingList
									? 'Currently Reading'
									: wishListed
									? 'Added to Wishlist'
									: 'Add to Wishlist'}
							</span>
						</button>

						{/* dropdown button */}
						<button
							onClick={() => {
								setIsOpen(!isOpen);
							}}
							className="relative flex items-center justify-center gap-1 btn-primary px-3 ">
							<RiArrowDropDownLine className="ml-2 size-6" />
						</button>
						{isOpen && (
							<div className="absolute bottom-1/4 right-0 mb-1 w-40 bg-slate-200 rounded-lg shadow-lg z-10">
								{options.map((option) => (
									<button
										key={option}
										onClick={() => handleSelect(option)}
										className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
											option === selectedOption
												? 'bg-gray-200 font-semibold'
												: ''
										}`}>
										{option}
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookCard;
