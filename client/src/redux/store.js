import { configureStore } from '@reduxjs/toolkit';
import wishListReducer from './features/wishList/wishListSlice';
import readingListReducer from './features/readingList/readingListSlice';
import completedListReducer from './features/completedList/completedListSlice';
import bookListReducer from './bookSlice';
import booksApi from './features/books/booksApi';

export const store = configureStore({
	reducer: {
		wishList: wishListReducer,
		readingList: readingListReducer,
		completedList: completedListReducer,
		bookList: bookListReducer,
		[booksApi.reducerPath]: booksApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(booksApi.middleware),
});

export default store;
