import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/home/home';
import Login from '../components/Login';
import Register from '../components/Register';
import Wishlist from '../pages/books/Wishlist';
import SingleBook from '../pages/books/SingleBook';
import SearchedBooks from '../pages/books/SearchedBooks';
import ReadingList from '../pages/books/ReadingList';
import CompletedList from '../pages/books/completedList';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/about',
				element: <div>About</div>,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/wishList',
				element: <Wishlist />,
			},
			{
				path: '/reading',
				element: <ReadingList />,
			},
			{
				path: '/completed',
				element: <CompletedList />,
			},
			{
				path: '/books/:id',
				element: <SingleBook />,
			},
			{
				path: '/searchedBooks',
				element: <SearchedBooks />,
			},
		],
	},
]);

export default router;
