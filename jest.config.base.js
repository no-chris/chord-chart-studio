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
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},

	transform: {
		'\\.js$': 'babel-jest',
		'\\.txt': 'jest-text-transformer',
		'\\.svg': 'jest-text-transformer',
	},
	// whitelisting local modules in the node_modules folder
	transformIgnorePatterns: [
		'<rootDir>.*(node_modules)(?!.*chord-(symbol|mark).*).*$',
	],

	moduleNameMapper: {
		'\\.(css|scss)$': '<rootDir>/tests/styleMock.js',
		'\\.(png)$': '<rootDir>/tests/assetMock.js',
	},
};
