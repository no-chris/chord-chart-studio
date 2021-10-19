/* eslint-env node */
module.exports = {
	testEnvironment: 'jsdom',

	collectCoverage: true,
	collectCoverageFrom: ['src/**/*.js', '!src/main.js', '!**/node_modules/**'],
	coverageDirectory: '<rootDir>/coverage',
	coveragePathIgnorePatterns: [
		'node_modules',
		'src/ui/layout/app/createGetVersions.js',
	],
	coverageReporters: ['json', 'lcov', 'text', 'clover'],
	coverageThreshold: {
		global: {
			branches: 99,
			functions: 99,
			lines: 99,
			statements: 100,
		},
	},

	transform: {
		'\\.js$': 'babel-jest',
		'\\.hbs$': 'jest-handlebars',
	},

	setupFiles: ['jest-localstorage-mock'],

	moduleNameMapper: {
		'\\.(css|scss)$': '<rootDir>/scss/__mocks__/styleMock.js',
	},
};
