import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import '../../../index.css';

const initialState = {
	wishListItems: [],
};

const wishListSlice = createSlice({
	name: 'wishList',
	initialState,
	reducers: {
		addToWishList: (state, action) => {
			const existingItem = state.wishListItems.find(
				(item) => item.id === action.payload.id
			);
			if (!existingItem) {
				state.wishListItems.push(action.payload);
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Book Added to the Wishlist',
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
					title: 'Book is Already in the Wishlist',
					text: "You won't be able to revert this!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'OK!',
				});
			}
		},
		removeFromWishList: (state, action) => {
			state.wishListItems = state.wishListItems.filter(
				(item) => item.id !== action.payload.id
			);
			Swal.fire({
				position: 'top-end',
				title: 'Book Removed from the Wishlist',
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
		clearWishList: (state) => {
			state.wishListItems = [];
		},
	},
});

export const { addToWishList, removeFromWishList, clearWishList } =
	wishListSlice.actions;
export default wishListSlice.reducer;
