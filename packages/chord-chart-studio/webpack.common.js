/* eslint-env node */
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildDir = 'build';

const config = {
	target: 'web',

	entry: {
		main: './src/main.js',
	},

	output: {
		filename: '[name].[fullhash].js',
		path: path.resolve(process.cwd(), buildDir),
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].[fullhash].css',
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
		/*
		alias: {
			react: path.resolve(path.join(__dirname, './node_modules/react')),
			'react-dom': path.resolve(
				path.join(__dirname, './node_modules/react-dom')
			),
		},
		*/
		symlinks: false,
		//modules: [path.resolve(__dirname, '../../node_modules')],
	},
};

module.exports = config;
