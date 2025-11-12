import React, { useEffect, useState } from 'react';
import BookCard from '../books/BookCard';
import axios from 'axios';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../../redux/bookSlice';
import store from '../../redux/store';

const categories = ['Choose a genre', 'Science', 'Fiction', 'Crime', 'History'];

const TopSellers = ({ book }) => {
	const [selectedCategory, setSelectedCategory] = useState('Choose a genre');
	const { allBooks } = useSelector((state) => state.bookList);

	const books = allBooks?.popularBooks || [];
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllBooks());
	}, [dispatch]);

	const filteredBooks =
		selectedCategory === 'Choose a genre'
			? books
			: books.filter((book) =>
					book.bookshelves?.some((shelf) =>
						shelf
							.toLowerCase()
							.includes(selectedCategory.toLowerCase())
					)
			  );

	return (
		<div className="py-10">
			<h2 className="text-2xl font-semibold mb-6">Top Sellers</h2>
			{/* category filtering */}
			<div className="mb-8 flex items-center">
				<select
					onChange={(e) => setSelectedCategory(e.target.value)}
					name="category"
					id="category"
					className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none">
					{categories.map((category, index) => (
						<option key={index} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>

			<Swiper
				slidesPerView={1}
				spaceBetween={30}
				navigation={true}
				breakpoints={{
					640: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 40,
					},
					1024: {
						slidesPerView: 2,
						spaceBetween: 50,
					},
					1180: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
				modules={[Pagination, Navigation]}
				className="mySwiper">
				{filteredBooks.length > 0 &&
					filteredBooks.map((book, index) => {
						return (
							<SwiperSlide key={book.id}>
								<BookCard book={book} />
							</SwiperSlide>
						);
					})}
			</Swiper>
		</div>
	);
};

export default TopSellers;
