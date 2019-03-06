/* eslint-env node */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildDir    = 'docs';
const buildDirAbs = __dirname + '/' + buildDir;

const config = {
	target:'web',

	entry: {
		main: './src/main.js'
	},

	output: {
		filename: '[name].[hash].js',
		path: buildDirAbs,
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'ChordPro2',
			template:'assets/index.hbs'
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