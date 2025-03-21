import React from 'react';
// import bannerImg from '../../assets/banner.png';
import books1 from '../../assets/banners/books1.jpg';
import books2 from '../../assets/banners/books2.jpg';
import books3 from '../../assets/banners/books3.jpg';
import books4 from '../../assets/banners/books4.jpg';
import books5 from '../../assets/banners/books5.jpg';
import books6 from '../../assets/banners/books6.jpg';
import books7 from '../../assets/banners/books7.jpg';
import books8 from '../../assets/banners/books8.jpg';
import books9 from '../../assets/banners/books9.jpg';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
	return (
		<div className=" -mx-20 w-screen flex flex-col md:flex-row-reverse justify-between items-center h-[800px] md:h-[600px] top-0">
			{/* <div className="md:w-1/2 w-full flex item-center md:justify-end">
				<img src={bannerImg} alt="" />
			</div>
			<div className="md:w-1/2 w-full">
				<h1 className="md:text-5xl text-2xl font-medium mb-7">
					New Releases This Week
				</h1>
				<p className="mb-10">
					It's time to update your reading list with some of the
					latest and greatest releases in the literary world. From
					heart-pumping thrillers to captivating memoirs, this week's
					new releases offer something for everyone
				</p>
				<button className="btn-primary">Subscribe</button>
			</div> */}
			<Swiper
				spaceBetween={0}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={false}
				modules={[Autoplay, Pagination, Navigation]}
				className="w-full h-[400px] md:h-[500px]">
				{[
					{
						img: books1,
						quote: '“I have always imagined that Paradise will be a kind of library.” – Jorge Luis Borges',
					},
					{
						img: books2,
						quote: '“There is no friend as loyal as a book.” – Ernest Hemingway',
					},
					{
						img: books3,
						quote: '“The only thing that you absolutely have to know is the location of the library.” – Albert Einstein',
					},
					{
						img: books4,
						quote: '“A book is a dream that you hold in your hands.” – Neil Gaiman',
					},
					{
						img: books5,
						quote: '“No two persons ever read the same book.” – Edmund Wilson',
					},
					{
						img: books6,
						quote: '“A room without books is like a body without a soul.” – Marcus Tullius Cicero',
					},
					{
						img: books7,
						quote: '“Books are the plane, and the train, and the road. They are the destination and the journey. They are home.” – Anna Quindlen',
					},
					{
						img: books8,
						quote: '“The world was hers for the reading.” – Betty Smith',
					},
					{
						img: books9,
						quote: '“I do believe something very magical can happen when you read a good book.” – J.K. Rowling',
					},
				].map((item, index) => (
					<SwiperSlide key={index}>
						<div className="relative w-full h-full ">
							<img
								src={item.img}
								alt="Library Image"
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-black/65 flex items-center justify-center">
								<p className="text-slate-300 bg-white/35 w-2/4 p-6 text-xl md:text-2xl font-semibold text-center leading-relaxed flex items-center justify-center">
									{item.quote}
								</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Banner;
