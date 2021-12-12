/* eslint-env node */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [{ from: 'static' }],
		}),
	],

	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false,
				terserOptions: {
					format: {
						comments: false,
					},
				},
			}),
		],
	},

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
