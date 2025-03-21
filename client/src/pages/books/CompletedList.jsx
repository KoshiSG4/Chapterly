import React from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getImgUrl } from '../../utils/getImgUrl';
import {
	clearCompletedList,
	removeFromCompletedList,
} from '../../redux/features/completedList/completedListSlice';

const CompletedList = () => {
	const completedListItems = useSelector(
		(state) => state.completedList.completedListItems
	);
	const dispatch = useDispatch();

	const handleRemoveFromCompletedList = (product) => {
		dispatch(removeFromCompletedList(product));
	};

	const handleClearCompletedList = () => {
		dispatch(clearCompletedList());
	};
	return (
		<>
			<div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
				<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
					<div className="flex items-start justify-between">
						<div className="text-lg font-medium text-gray-900">
							Completed List
						</div>
						<div className="ml-3 flex h-7 items-center ">
							<button
								type="button"
								onClick={handleClearCompletedList}
								className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200  ">
								<span className="">Clear Completed List</span>
							</button>
						</div>
					</div>

					<div className="mt-8">
						<div className="flow-root">
							{completedListItems.length > 0 ? (
								<ul
									role="list"
									className="-my-6 divide-y divide-gray-200">
									{completedListItems.map((book) => (
										<li
											key={book?.id}
											className="flex py-6">
											<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
												<img
													alt=""
													src={`${getImgUrl(
														book?.formats[
															'image/jpeg'
														]
													)}`}
													className="h-full w-full object-cover object-center hover:scale-105 bg-cover
												 p-2 rounded-md cursor-pointer transition-all duration-200"
												/>
											</div>

											<div className="ml-4 flex flex-1 flex-col">
												<div>
													<div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
														<h3>
															<Link
																to={`/books/${book.id}`}>
																{book?.title}
															</Link>
														</h3>
													</div>
													<p className="mt-1 text-sm text-gray-500 capitalize">
														<strong>
															Category:
														</strong>{' '}
														{book?.bookshelves?.map(
															(shelf, index) => (
																<li key={index}>
																	{shelf}
																</li>
															)
														)}
													</p>
												</div>
												<div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
													<div className="flex">
														<button
															onClick={() =>
																handleRemoveFromCompletedList(
																	book
																)
															}
															type="button"
															className="font-medium text-indigo-600 hover:text-indigo-500">
															Remove
														</button>
													</div>
												</div>
											</div>
										</li>
									))}
								</ul>
							) : (
								<p>No books were found!</p>
							)}
						</div>
					</div>
				</div>

				<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
					<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
						<Link to="/">
							<button
								type="button"
								className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
								Continue Browsing
								<span aria-hidden="true"> &rarr;</span>
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default CompletedList;
