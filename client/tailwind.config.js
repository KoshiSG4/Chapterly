/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FFCE1A',
				secondary: '#0D0842',
				blackBG: '#F3F3F3',
				Favorite: '#FF5841',
			},
			fontFamily: {
				primary: ['Montserrat', 'sans-serif'],
				secondary: ['Nunito Sans', 'sans-serif'],
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
			},
		},
	},
	plugins: [],
};
