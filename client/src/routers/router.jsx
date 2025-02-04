import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/home/home';
import Login from '../components/Login';
import Register from '../components/Register';
import Cart from '../pages/books/Cart';
import Checkout from '../pages/books/Checkout';
import SingleBook from '../pages/books/singleBook';

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
				path: '/orders',
				element: <div>Orders</div>,
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
				path: '/cart',
				element: <Cart />,
			},
			{
				path: '/checkout',
				element: <Checkout />,
			},
			{
				path: '/books/:id',
				element: <SingleBook />,
			},
		],
	},
]);

export default router;
