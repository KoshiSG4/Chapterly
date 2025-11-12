import React, { useEffect } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Link } from 'react-router';
import { useFetchNewsQuery } from '../../redux/features/books/booksApi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../redux/bookSlice';

const News = () => {
	const { news } = useSelector((state) => state.bookList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchNews());
	}, []);

	const newsList = news || [];

	return (
		<div className="py-16">
			<h2 className="text-2xl font-semibold mb-6">News</h2>

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
				{newsList.map((item, index) => (
					<SwiperSlide key={index}>
						<div className="flex flex-col sm:flex-row sm:justify-between sm:h-72  items-start gap-12">
							{/* content */}
							<div className="py-4">
								<Link to={item?.url}>
									<h3 className="text-base font-semibold hover:text-blue-500 mb-3">
										{item?.title}
									</h3>
								</Link>
								<p className="text-sm text-gray-600">
									{item?.description
										? `${item?.description.slice(0, 80)}...`
										: ''}
								</p>
							</div>

							{/* image */}
							<div className="w-52 h-auto sm:h-72 sm:flex-shrink-0 border rounded-md">
								<img
									src={item.urlToImage}
									alt=""
									className="bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200 object-cover"
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default News;
