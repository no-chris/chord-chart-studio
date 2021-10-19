/* eslint-env node */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'production',
	target: 'web',

	entry: {
		popup: path.resolve(__dirname, 'src/popup/popup.js'),
		ultimateGuitar: path.resolve(
			__dirname,
			'src/importers/ultimateGuitar.js'
		),
		chordChartsStudio: path.resolve(
			__dirname,
			'src/importers/chordChartsStudio.js'
		),
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
	},

	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'static' }],
		}),
	],

	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
};
