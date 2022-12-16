module.exports = {
	content: [
		'node_modules/daisyui/dist/**/*.js',
		'node_modules/react-daisyui/dist/**/*.js',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['dark', 'aqua', 'light'],
	},
};
