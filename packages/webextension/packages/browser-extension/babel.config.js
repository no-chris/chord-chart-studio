/* eslint-env node */
const presets = [
	[
		'@babel/preset-env',
		{
			targets: {
				browsers: 'defaults',
			},
		},
	],
	'@babel/preset-react',
];

module.exports = { presets };
