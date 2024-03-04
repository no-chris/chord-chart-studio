/* eslint-env node */
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
	plugins: [
		postcssPresetEnv({
			stage: 3,
			features: {
				'nesting-rules': [
					'auto',
					{
						noIsPseudoSelector: false,
					},
				],
			},
		}),
	],
};
