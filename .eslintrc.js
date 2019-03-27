module.exports = {
	'env': {
		'browser': true,
		'es6': true
	},
	'plugins': [
		'import',
		'no-unsanitized'
	],
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'rules': {
		'indent': 				[ 'error', 'tab', { 'SwitchCase': 1 } ],
		'linebreak-style': 		[ 'error',  'unix' ],
		'quotes': 				[ 'error',  'single' ],
		'semi': 				[ 'error',  'always' ],
		'no-shadow': 			[ 'error',  { 'builtinGlobals': true } ],

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

		'no-unsanitized/property': 	[ 'error', { escape: { methods: ['escapeHTML'] } } ],
		'no-unsanitized/method': 	[ 'error' ],

	}
};
