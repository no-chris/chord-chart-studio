/* eslint-env node */
const webpack = require('webpack');

const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
	mode: 'production',

	devtool: 'source-map',

	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({ extractComments: false }),
			new CssMinimizerPlugin(),
		],
	},

	plugins: [
		new CleanWebpackPlugin(),
		new webpack.ids.HashedModuleIdsPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		/*
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
		}),
		*/

		new HtmlWebpackPlugin({
			title: 'Chord Chart Studio',
			template: 'assets/index.html',
			favicon: 'assets/favicon.png',
		}),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
			runtimeCaching: [
				// based on https://developer.chrome.com/docs/workbox/modules/workbox-recipes
				// and https://stackoverflow.com/questions/52451678/caching-google-fonts-using-workbox
				{
					urlPattern: /^https:\/\/fonts\.googleapis\.com/,
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'google-fonts-stylesheets',
					},
				},
				{
					urlPattern: /^https:\/\/fonts\.gstatic\.com/,
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'google-fonts-webfonts',
						cacheableResponse: {
							statuses: [0, 200],
						},
						expiration: {
							maxAgeSeconds: 60 * 60 * 24 * 365,
							maxEntries: 30,
						},
					},
				},
			],
		}),
	],
});
