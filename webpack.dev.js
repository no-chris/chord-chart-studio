/* eslint-env node */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',

	plugins: [new webpack.HotModuleReplacementPlugin()],

	devtool: 'inline-source-map',

	devServer: {
		contentBase: path.join(__dirname, 'assets'),
		historyApiFallback: true,
		port: 8084, // config.devServer.port,
		//host: '0.0.0.0', // enable this to run dev server from a docker container
		host: '127.0.0.1',
		inline: true,
		watchOptions: {
			poll: true,
		},
	},
});
