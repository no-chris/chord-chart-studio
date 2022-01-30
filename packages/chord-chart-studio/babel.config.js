/* eslint-env node */
const presets = [
	[
		'@babel/preset-env',
		{
			targets: {
				browsers: 'last 2 versions',
			},
			corejs: '3.0',
			useBuiltIns: 'usage',
		},
	],
	'@babel/preset-react',
];

module.exports = { presets };
