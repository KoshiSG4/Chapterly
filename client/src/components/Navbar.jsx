import React, { useState } from 'react';
import { Link } from 'react-router';
import { HiMiniBars4 } from 'react-icons/hi2';
import { IoSearchSharp } from 'react-icons/io5';
import { FaRegUser, FaUser, FaRegHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { BsBookmarkHeart } from 'react-icons/bs';

const navigation = [
	{ name: 'Dashboard', href: '/dashboard' },
	{ name: 'Orders', href: '/orders' },
	{ name: 'Wishlist Page', href: '/wishList' },
	{ name: 'Check Out', href: '/checkout' },
];

const Navbar = () => {
	const [isDropDownOpen, setIsDropDownOpen] = useState();
	const wishListItems = useSelector((state) => state.wishList.wishListItems);
	console.log(wishListItems);

	const { currentUser, logout } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return (
		<header className="max-w-screen-2xl mx-auto px-20 py-6">
			<nav className="flex justify-between items-center">
				{/*left side*/}
				<div className="flex items-center md:gap-16 gap-4">
					<Link to="/">
						<HiMiniBars4 className="size-6" />
					</Link>

					{/* Search input */}
					<div className="relative sm:w-72 w-40 space-x-2">
						<IoSearchSharp className="absolute inline-block left-3 inset-y-2" />
						<input
							type="text"
							placeholder="Search here"
							className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"></input>
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
					<Link
						to="/wishList"
						className="bg-primary px-1 sm:px-6 py-2 flex items-center">
						<BsBookmarkHeart className="size-4" />
						{/* {wishListItems.length > 0 ? (
							<span className="text-sm font-semibold sm:ml-1">
								&nbsp;{wishListItems.length}
							</span>
						) : (
							<span className="text-sm font-semibold sm:ml-1">
								&nbsp;0
							</span>
						)} */}
						<span className="text-sm font-semibold sm:ml-1">
							&nbsp;{wishListItems.length}
						</span>
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
