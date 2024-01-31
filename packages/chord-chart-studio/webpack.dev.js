/* eslint-env node */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const buildDir = path.resolve(process.cwd(), 'build');

module.exports = merge(common, {
	mode: 'development',

	devtool: 'inline-source-map',

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Chord Chart Studio',
			template: 'assets/index.html',
			favicon: 'assets/favicon.png',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: './assets/service-worker.js',
					to: buildDir + '/service-worker.js',
				},
			],
		}),
	],

	devServer: {
		hot: true,
		static: {
			directory: path.join(__dirname, 'assets'),
			watch: true,
			publicPath: '/app',
		},
		historyApiFallback: true,
		port: 8084, // config.devServer.port,
		host: '127.0.0.1',
	},
});
