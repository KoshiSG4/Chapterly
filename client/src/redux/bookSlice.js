import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	allBooks: [],
	selectedBook: null,
	bookText: null,
	news: null,
	loading: false,
	error: null,
};

export const getAllBooks = createAsyncThunk(
	'books/getAllBooks',
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(import.meta.env.VITE_BOOKS_URL, {
				headers: {
					'x-rapidapi-key': import.meta.env.VITE_X_RAPIDAPI_KEY,
					'x-rapidapi-host': import.meta.env.VITE_X_RAPIDAPI_HOST,
				},
			});

			const books = response.data.results;
			const popularBooks = books
				.sort((a, b) => b.download_count - a.download_count)
				.slice(0, 50);

			return popularBooks;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data || 'Failed to fetch books'
			);
		}
	}
);

export const getBookText = createAsyncThunk(
	'books/getBookText',
	async (id, thunkAPI) => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BOOKS_URL}/${id}/text`,
				{
					headers: {
						'x-rapidapi-key': import.meta.env.VITE_X_RAPIDAPI_KEY,
						'x-rapidapi-host': import.meta.env.VITE_X_RAPIDAPI_HOST,
					},
				}
			);

			console.log(response.data.text);
			return response.data.text;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data || 'Failed to fetch book text'
			);
		}
	}
);

export const fetchNews = createAsyncThunk(
	'books/getNews',
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(
				`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${
					import.meta.env.VITE_NEWS_API_KEY
				}`
			);
			const news = response.data.articles;
			return news;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data || 'Failed to fetch news'
			);
		}
	}
);

const bookListSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		clearResults: (state) => {
			state.allBooks = [];
		},
		setSelectedBook: (state, action) => {
			state.selectedBook = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllBooks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getAllBooks.fulfilled, (state, action) => {
				state.loading = false;
				state.allBooks = action.payload;
			})
			.addCase(getAllBooks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(getBookText.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(getBookText.fulfilled, (state, action) => {
				state.loading = false;
				state.bookText = action.payload;
			})
			.addCase(getBookText.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchNews.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchNews.fulfilled, (state, action) => {
				state.loading = false;
				state.news = action.payload;
			})
			.addCase(fetchNews.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { clearResults, setSelectedBook } = bookListSlice.actions;
export default bookListSlice.reducer;
