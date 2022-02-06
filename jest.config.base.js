/* eslint-env node */
module.exports = {
	testEnvironment: 'jsdom',
	rootDir: __dirname,

	collectCoverage: true,
	collectCoverageFrom: ['<rootDir>/packages/chord-chart-studio/src/**/*.js'],
	coverageDirectory: '<rootDir>/coverage',
	coverageReporters: ['json', 'lcov', 'text', 'clover'],
	coverageThreshold: {
		global: {
			branches: 99,
			functions: 99,
			lines: 99,
			statements: 99,
		},
	},

	transform: {
		'\\.js$': 'babel-jest',
		'\\.hbs$': 'jest-handlebars',
		'\\.txt': 'jest-raw-loader',
		'\\.svg': 'jest-raw-loader',
	},
	// whitelisting local modules in the node_modules folder
	transformIgnorePatterns: ['<rootDir>.*(node_modules)(?!.*chord-mark.*).*$'],

	moduleNameMapper: {
		'\\.(css|scss)$': '<rootDir>/tests/styleMock.js',
		'\\.(png)$': '<rootDir>/tests/assetMock.js',
	},
};
