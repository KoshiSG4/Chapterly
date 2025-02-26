import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
	wishListItems: [],
};

const wishListSlice = createSlice({
	name: 'wishList',
	initialState,
	reducers: {
		addToWishList: (state, action) => {
			const existingItem = state.wishListItems.find(
				(item) => item._id === action.payload._id
			);
			if (!existingItem) {
				state.wishListItems.push(action.payload);
				Swal.fire({
					position: 'top-end',
					icon: 'success',
					title: 'Book Added to the Wishlist',
					showConfirmButton: false,
					timer: 1500,
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
				(item) => item._id !== action.payload._id
			);
		},
		clearWishList: (state) => {
			state.wishListItems = [];
		},
	},
});

export const { addToWishList, removeFromWishList, clearWishList } =
	wishListSlice.actions;
export default wishListSlice.reducer;
