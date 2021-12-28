/* eslint-env node */
const baseConfig = require('../../jest.config.base');
const packageJson = require('./package');

module.exports = {
	...baseConfig,
	name: packageJson.name,
	displayName: packageJson.name,

	rootDir: '../..',
	coveragePathIgnorePatterns: [
		'packages/chord-charts-studio/src/core/createGetVersions.js',
	],

	setupFiles: ['jest-localstorage-mock'],
};
