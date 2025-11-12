import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getBaseUrl from '../utils/baseURL';

const initialState = {
	allBooks: [],
	selectedBook: null,
	loading: false,
	error: null,
};

export const getAllBooks = createAsyncThunk('books/getAllBooks', async () => {
	try {
		const response = await axios.get(`${getBaseUrl()}/api/books/getAll`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || error.message);
	}
});
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
				state.error = action.error.message || 'Failed to fetch books';
			});
	},
});

export const { clearResults, setSelectedBook } = bookListSlice.actions;
export default bookListSlice.reducer;
