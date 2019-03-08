/* eslint-env node */
module.exports = {
	//verbose: true,
	collectCoverage: true,
	coverageDirectory: '<rootDir>/coverage',
	coveragePathIgnorePatterns: ['node_modules'],
	coverageReporters: ['json', 'lcov', 'text', 'clover'],

	transform: {
		'\\.js$': 'babel-jest',
		'\\.hbs$': 'jest-handlebars',
	}

};