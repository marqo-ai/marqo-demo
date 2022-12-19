module.exports = {
	content: [
		'node_modules/daisyui/dist/**/*.js',
		'node_modules/react-daisyui/dist/**/*.js',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	plugins: [require('daisyui')],
	daisyui: {
		// themes: ['dark', 'aqua', 'light'],
		themes: [
			{
				light: {
					primary: '#020659',
					secondary: '#00FFAA',
					accent: '#513EE9',
					neutral: '#1A1B28',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272',
					contrast: '#1A1B28',
					'neutral-100': '#FFFFFF',
					'neutral-200': '#E5E7EB',
					'neutral-300': '#D1D5DB',
					'neutral-400': '#9CA3AF',
					'neutral-500': '#6B7280',
					'neutral-600': '#4B5563',
					'neutral-700': '#30324A',
					'neutral-800': '#242536',
					'neutral-900': '#1A1B28',
				},
			},
		],
	},
};
