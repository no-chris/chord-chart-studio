module.exports = {
	'env': {
		'browser': true,
		'es6': true
	},
	'plugins': [
		'import',
		'no-unsanitized',
		'react-hooks',
		'jam3', // for dangerouslySetInnerHTML
	],

	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module',
		'jsx': true,
	},
	'rules': {
		'complexity': 				[ 'error', { max: 10 } ],
		'indent': 					[ 'error', 'tab', { 'SwitchCase': 1 } ],
		'linebreak-style': 			[ 'error',  'unix' ],
		'max-depth': 				[ 'error', 4 ],
		'max-len': 					[ 'error', {'code': 150 } ],
		'max-lines': 				[ 'error', { max: 300, skipBlankLines: true, skipComments: true, } ],
		'max-params': 				[ 'warn', { max: 4 } ],
		'no-shadow': 				[ 'error', { 'builtinGlobals': true } ],
		'quotes': 					[ 'error',  'single' ],
		'semi': 					[ 'error',  'always' ],

		'no-restricted-imports':[
			'error',
			{
				paths: [
					{
						name: 'lodash',
						message: 'Please do not import lodash as a whole: import individual lodash functions instead.'
					}
				]
			}
		],

		'jam3/no-sanitizer-with-danger': ['error', { wrapperName: ['escapeHTML'] }],

		'no-unsanitized/property': 	[ 'error', { escape: { methods: ['escapeHTML'] } } ],
		'no-unsanitized/method': 	[ 'error' ],

		'react/prop-types': 		[ 'error' ],

		'react-hooks/rules-of-hooks': [ 'error' ],
		'react-hooks/exhaustive-deps': [ 'warn' ],

	},
	'settings': {
		'react': {
			'pragma': 'React',
			'version': 'detect'
		},
	}
};
