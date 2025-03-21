import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import '../../../index.css';

const initialState = {
	completedListItems: [],
};

const completedListSlice = createSlice({
	name: 'completedList',
	initialState,
	reducers: {
		addToCompletedList: (state, action) => {
			const existingItem = state.completedListItems.find(
				(item) => item.id === action.payload.id
			);
			console.log('payload', action.payload);
			if (!existingItem) {
				state.completedListItems.push(action.payload);
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Book Added to the completed List',
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
					title: 'Book is Already in the completed List',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'OK!',
				});
			}
		},
		removeFromCompletedList: (state, action) => {
			state.completedListItems = state.completedListItems.filter(
				(item) => item.id !== action.payload.id
			);
			Swal.fire({
				position: 'top-end',
				title: 'Book Removed from the completed List',
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
		clearCompletedList: (state) => {
			state.completedListItems = [];
		},
	},
});

export const {
	addToCompletedList,
	removeFromCompletedList,
	clearCompletedList,
} = completedListSlice.actions;
export default completedListSlice.reducer;
