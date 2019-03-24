/* eslint-env node */
const webpack = require('webpack');

const merge = require('webpack-merge');
const common = require('./webpack.common');

const TerserPlugin       	= require('terser-webpack-plugin');
const CleanWebpackPlugin    = require('clean-webpack-plugin');
const CopyWebpackPlugin     = require('copy-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');

module.exports = merge(common, {
	mode: 'production',

	devtool: 'source-map',

	optimization: {
		splitChunks: {
			chunks: 'all'
		},
		minimizer: [
			new TerserPlugin({
				sourceMap: true,
			}),
			new OptimizeCssnanoPlugin({
				sourceMap: true,
			}),
		],
	},

	plugins: [
		new CleanWebpackPlugin(),
		new webpack.HashedModuleIdsPlugin(),
		new CopyWebpackPlugin([
			{ from: 'assets/css', to: 'css'},
			{ from: 'assets/fonts', to: 'fonts'},
		]),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': 'production'
		}),
	],
});
