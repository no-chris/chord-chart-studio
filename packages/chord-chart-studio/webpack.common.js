/* eslint-env node */
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const buildDir = path.resolve(process.cwd(), 'build');

const config = {
	target: 'web',

	entry: {
		main: './src/main.js',
	},

	output: {
		filename: '[name].[fullhash].js',
		path: buildDir,
		publicPath: '/',
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[fullhash].css',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: './assets/manifest.json',
					to: buildDir + '/manifest.json',
				},
			],
		}),
	],

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.scss|sass|css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.svg/,
				type: 'asset/resource',
			},
			{
				test: /\.txt/,
				type: 'asset/source',
			},
		],
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		symlinks: false,
	},
};

module.exports = config;
