/* eslint-env node */
module.exports = {

	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.js',
		'!src/main.js',
		'!**/node_modules/**'
	],
	coverageDirectory: '<rootDir>/coverage',
	coveragePathIgnorePatterns: ['node_modules'],
	coverageReporters: ['json', 'lcov', 'text', 'clover'],
	coverageThreshold: {
		'global': {
			'branches': 40,
			'functions': 50,
			'lines': 50,
			'statements': -100
		}
	},

	transform: {
		'\\.js$': 'babel-jest',
		'\\.hbs$': 'jest-handlebars',
	},

	setupFiles: [
		'jest-localstorage-mock'
	],

	moduleNameMapper: {
		'\\.(css|scss)$': '<rootDir>/scss/__mocks__/styleMock.js'
	}
};
