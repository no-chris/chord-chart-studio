/* eslint-env node */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const buildDir    = 'build';
const buildDirAbs = __dirname + '/' + buildDir;

// noinspection SpellCheckingInspection
const config = {
	mode: 'development',

	target:'web',

	entry: {
		main: './src/main.js'
	},

	output: {
		filename: '[name].[hash].js',
		path: buildDirAbs,
		publicPath: '/'
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'ChordPro2',
			template:'assets/index.hbs'
		}),
		new ExtractTextPlugin({
			//filename: 'css/[name].[contenthash].css',
			filename: 'css/[name].css',
			allChunks: true,
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
				test: /\.tpl$/,
				loader: 'handlebars-loader'
			},
			{
				test: /\.scss|sass|css$/,
				loader: ExtractTextPlugin.extract({
					use: [
						{ loader: 'css-loader', options: { /* minimize: true */ } },
						'sass-loader'
					]
				})
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