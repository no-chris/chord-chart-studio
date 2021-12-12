/* eslint-env node */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
	mode: 'development',

	devtool: 'inline-source-map',

	devServer: {
		hot: true,
		static: {
			directory: path.join(__dirname, 'assets'),
			watch: true,
		},
		historyApiFallback: true,
		port: 8084, // config.devServer.port,
		host: '127.0.0.1',
	},
});
