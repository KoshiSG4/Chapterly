import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { HiMiniBars4 } from 'react-icons/hi2';
import { IoSearchSharp } from 'react-icons/io5';
import { FaRegUser, FaUser, FaRegHeart, FaBookOpen } from 'react-icons/fa';
import { IoMdBook } from 'react-icons/io';
import { LuBookCheck } from 'react-icons/lu';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { BsBookmarkHeart } from 'react-icons/bs';
import Logo from '../assets/logo.jpg';
import { useSearchBooksQuery } from '../redux/features/books/booksApi';
import useDebounce from '../hooks/useDebounce';

const navigation = [
	{ name: 'Dashboard', href: '/dashboard' },
	{ name: 'Orders', href: '/orders' },
	{ name: 'Wishlist Page', href: '/wishList' },
	{ name: 'Reading Books Page', href: '/reading' },
	{ name: 'Completed Books Page', href: '/completed' },
];

const Navbar = () => {
	const [isDropDownOpen, setIsDropDownOpen] = useState();
	const [query, setQuery] = useState('');

	const wishListItems = useSelector((state) => state.wishList.wishListItems);
	const readingListItems = useSelector(
		(state) => state.readingList.readingListItems
	);
	const completedListItems = useSelector(
		(state) => state.completedList.completedListItems
	);
	const { currentUser, logout } = useAuth();

	const debouncedQuery = useDebounce(query, 500);
	const { data, isLoading } = useSearchBooksQuery(debouncedQuery, {
		skip: debouncedQuery.length < 3,
	});

	const navigate = useNavigate();

	const handleKeyPress = (e) => {
		if (e.key === 'Enter' && query.trim()) {
			console.log('query', query);
			navigate(`/searchedBooks?query=${query}`);
		}
	};

	const handleLogout = () => {
		logout();
	};

	return (
		<header className="sticky max-w-screen-2xl mx-auto top-0 left-0 w-full z-50 bg-black/90 text-white py-2 px-8">
			<nav className="flex justify-between items-center">
				{/*left side*/}
				<div className="flex items-center md:gap-10 gap-4">
					<HiMiniBars4 className="size-6" />
					<Link to="/">
						<img
							src={Logo}
							alt="Logo"
							className="h-14 w-auto object-contain"
						/>
					</Link>
					{/* <span className="text-3xl font-bold font-sans">
						Chapterly
					</span> */}

					{/* Search input */}
					<div className="relative sm:w-72 w-40 space-x-2">
						<IoSearchSharp className="absolute inline-block left-3 inset-y-2 text-black" />
						<input
							type="text"
							placeholder="Search here"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={handleKeyPress}
							className="bg-[#EAEAEA] text-black w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"></input>

						{/* Search Results Dropdown */}
						{debouncedQuery && data?.length > 0 && (
							<div className="absolute top-10 left-0 w-full bg-white shadow-md rounded-md mt-1 max-h-48 overflow-y-auto z-10">
								{isLoading ? (
									<div className="p-3">Loading...</div>
								) : (
									data.map((book) => (
										<div
											key={book?.id}
											className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
											{book?.title}
										</div>
									))
								)}
							</div>
						)}
					</div>
				</div>

				{/* right side */}
				<div className="relative flex items-center md:space-x-3 space-x-2">
					<div>
						{currentUser ? (
							<>
								<button
									onClick={() =>
										setIsDropDownOpen(!isDropDownOpen)
									}>
									<FaUser className="size-4" />
								</button>
								{/* Show Dropdowns */}
								{isDropDownOpen && (
									<div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
										<ul className="py-2">
											{navigation.map((item) => (
												<li
													key={item.name}
													onClick={() =>
														setIsDropDownOpen(false)
													}>
													<Link
														to={item.href}
														className="block px-4 py-2 text-sm hover:bg-gray-100">
														{item.name}
													</Link>
												</li>
											))}
											<li>
												<button
													onClick={handleLogout}
													className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
													Logout
												</button>
											</li>
										</ul>
									</div>
								)}
							</>
						) : (
							<Link to={'/login'}>
								<FaRegUser className="size-4" />
							</Link>
						)}
					</div>

					<button className="hidden sm:block">
						<FaRegHeart className="size-4" />
					</button>

					{/* Completed Books  */}
					<Link
						to="/completed"
						className=" group relative py-2 flex items-center rounded-sm">
						<LuBookCheck className="size-4" />
						<span className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-fuchsia-950 text-zinc-200 text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
							Completed: {completedListItems.length}
						</span>
					</Link>

					{/* Reading Books */}
					<Link
						to="/reading"
						className="group relative py-2 flex items-center rounded-sm">
						<IoMdBook className="size-5" />
						<span className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-fuchsia-950 text-zinc-200 text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
							Reading: {readingListItems.length}
						</span>
					</Link>

					{/* Wishlisted Books */}
					<Link
						to="/wishList"
						className="group relative py-2 flex items-center rounded-sm">
						<BsBookmarkHeart className="size-4" />
						<span className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-fuchsia-950 text-zinc-200 text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 whitespace-nowrap">
							Wishlist: {wishListItems.length}
						</span>
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
