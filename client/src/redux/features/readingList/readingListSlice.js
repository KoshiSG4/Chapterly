import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import '../../../index.css';

const initialState = {
	readingListItems: [],
};

const readingListSlice = createSlice({
	name: 'readingList',
	initialState,
	reducers: {
		addToReadingList: (state, action) => {
			const existingItem = state.readingListItems.find(
				(item) => item.id === action.payload.id
			);
			console.log('payload', action.payload);
			if (!existingItem) {
				state.readingListItems.push(action.payload);
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Book Added to the Reading List',
					showConfirmButton: false,
					timer: 1500,
					width: '400px',
					heightAuto: false,
					customClass: {
						title: 'text-lg font-semibold',
						popup: 'p-6 w-96',
						confirmButton:
							'text-sm px-4 py-2 bg-blue-500 text-white rounded',
					},
				});
			} else {
				Swal.fire({
					title: 'Book is Already in the Reading List',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'OK!',
				});
			}
		},
		removeFromReadingList: (state, action) => {
			state.readingListItems = state.readingListItems.filter(
				(item) => item.id !== action.payload.id
			);
			Swal.fire({
				position: 'top-end',
				title: 'Book Removed from the Reading List',
				icon: 'warning',
				confirmButtonColor: '#3085d6',
				width: '400px',
				heightAuto: false,
				customClass: {
					title: 'text-lg font-semibold',
					popup: 'p-6 w-96',
					confirmButton:
						'text-sm px-4 py-2 bg-blue-500 text-white rounded',
				},
			});
		},
		clearReadingList: (state) => {
			state.readingListItems = [];
		},
	},
});

export const { addToReadingList, removeFromReadingList, clearReadingList } =
	readingListSlice.actions;
export default readingListSlice.reducer;
