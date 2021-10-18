/* eslint-env node */
module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	plugins: [],

	extends: ['eslint:recommended'],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		complexity: ['error', { max: 10 }],
		'max-depth': ['error', 4],
		'max-len': ['error', { code: 150 }],
		'max-lines': [
			'error',
			{ max: 300, skipBlankLines: true, skipComments: true },
		],
		'max-params': ['warn', { max: 4 }],
		'no-shadow': ['error', { builtinGlobals: true }],
		semi: ['error', 'always'],
	},
};
