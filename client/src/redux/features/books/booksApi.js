import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL';

const baseQuery = fetchBaseQuery({
	baseUrl: `${getBaseUrl()}/api/books`,
	credentials: 'include',
	prepareHeaders: (Headers) => {
		const token = localStorage.getItem('token');
		if (token) {
			Headers.set('Authorization', `Bearer ${token}`);
		}
		return Headers;
	},
});

const booksApi = createApi({
	reducerPath: 'booksApi',
	baseQuery,
	tagTypes: ['Books'],
	endpoints: (builder) => ({
		fetchAllBooks: builder.query({
			query: () => '/',
			providesTags: ['Books'],
		}),
		fetchBookById: builder.query({
			query: (id) => `/${id}`,
			providesTags: (results, error, id) => [{ type: 'Books', id }],
		}),
		searchBooks: builder.query({
			query: (searchTerm) => `/search?query=${searchTerm}`,
			providesTags: ['Books'],
		}),
		addBook: builder.mutation({
			query: (newBook) => ({
				url: `/create-book`,
				method: 'POST',
				body: newBook,
			}),
			invalidatesTags: ['Books'],
		}),
		updateBook: builder.mutation({
			query: ({ id, ...rest }) => ({
				url: `/update/${id}`,
				method: 'PUT',
				body: newBook,
				headers: {
					'Content-Type': 'application/json',
				},
			}),
			invalidatesTags: ['Books'],
		}),
		deleteBook: builder.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Books'],
		}),
		fetchNews: builder.query({
			query: () => '/news',
			providesTags: ['Books'],
		}),
	}),
});

export const {
	useFetchAllBooksQuery,
	useFetchBookByIdQuery,
	useSearchBooksQuery,
	useAddBookMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
	useFetchNewsQuery,
} = booksApi;
export default booksApi;
