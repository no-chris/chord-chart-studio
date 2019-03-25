/* eslint-env node */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildDir = 'docs';

const config = {
	target:'web',

	entry: {
		main: './src/app/main.js'
	},

	output: {
		filename: '[name].[hash].js',
		path: path.resolve(process.cwd(), buildDir),
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Universal Chord Charts',
			version: require('./package.json').version,
			template:'assets/index.hbs',
			inlineSource: '.(js|css)$'
		}),
		new MiniCssExtractPlugin({
			filename:'css/[name].[hash].css',
		}),
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader'
			},
			{
				test: /\.scss|sass|css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 8000,
						name: 'images/[hash]-[name].[ext]'
					}
				}]
			}
		]
	}
};

module.exports = config;
