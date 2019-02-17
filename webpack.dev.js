/* eslint-env node */
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

// const config = require('./src/songs/config');

module.exports = merge(common, {
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],

	devtool: 'inline-source-map',

	devServer: {
		contentBase: path.join(__dirname, 'assets'),
		historyApiFallback: true,
		//         proxy: {
		//             "/clientConfig": "http://localhost:" + config.express.port,
		//             "/data/*":       "http://localhost:" + config.express.port,
		//         },
		port: 8084, // config.devServer.port,
		//host: '0.0.0.0', // enable this to run dev server from a docker container
		inline: true,
		watchOptions: {
			poll: true
		}
	},

});
