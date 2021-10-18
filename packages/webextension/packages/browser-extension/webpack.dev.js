/* eslint-env node */
const webpackConfig = require('./webpack.config');

module.exports = {
	...webpackConfig,
	watch: true,
	watchOptions: {
		poll: 1000,
	},
};
