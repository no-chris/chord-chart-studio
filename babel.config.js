/* eslint-env node */
const presets = [
	[
		'@babel/preset-env',
		{
			targets: {
				browsers: 'defaults'
			},
			corejs: '3.0',
			useBuiltIns: 'usage',
		},
	],
];

module.exports = { presets };
