import { configureStore } from '@reduxjs/toolkit';
import wishListReducer from './features/wishList/wishListSlice';
import booksApi from './features/books/booksApi';

export const store = configureStore({
	reducer: {
		wishList: wishListReducer,
		[booksApi.reducerPath]: booksApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(booksApi.middleware),
});
