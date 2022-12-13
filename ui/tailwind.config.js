module.exports = {
	content: [
		'node_modules/daisyui/dist/**/*.js',
		'node_modules/react-daisyui/dist/**/*.js',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./public/index.html',
	],
	plugins: [
		require('daisyui'),
		require('@tailwindcss/line-clamp'),
		require('tailwind-scrollbar')({ nocompatible: true }),
	],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#020659',
					secondary: '#00FFAA',
					accent: '#9092C1',
					neutral: '#1A1B28',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272',
					contrast: '#1A1B28',
				},
				dark: {
					primary: '#1A1C2C',
					secondary: '#00FFAA',
					accent: '#8A8BA3',
					neutral: '#1A1B28',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272',
					contrast: '#1A1B28',
				},
			},
		],
		variants: {
			lineClamp: ['responsive', 'hover'],
		},
	},
};
