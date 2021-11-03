/* eslint-env node */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildDir = 'docs';

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
		new HtmlWebpackPlugin({
			title: 'Chords Charts Studio',
			template: 'assets/index.html',
		}),
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
				test: /\.hbs$/,
				loader: 'handlebars-loader',
			},
			{
				test: /\.scss|sass|css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8000,
							name: 'images/[fullhash]-[name].[ext]',
						},
					},
				],
			},
		],
	},

	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			react: path.resolve(path.join(__dirname, './node_modules/react')),
			'react-dom': path.resolve(
				path.join(__dirname, './node_modules/react-dom')
			),
			// Needed by ChordSheetJS (duh!)
			handlebars: path.resolve(
				path.join(
					__dirname,
					'./node_modules/handlebars/dist/handlebars.js'
				)
			),
		},
		symlinks: false,
	},
};

module.exports = config;
