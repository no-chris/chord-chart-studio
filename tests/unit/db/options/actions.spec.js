import * as actions from '../../../../src/db/options/actions';
import * as actionTypes from '../../../../src/db/options/actionsTypes';

describe('db/options: actions creators', () => {
	describe('setOptionValue()', () => {
		test('should create valid action', () => {
			const expected = {
				type: actionTypes.DB_OPTION_SET_OPTION_VALUE,
				payload: {
					context: 'rendering',
					key: 'transposeValue',
					value: 3,
				},
			};
			const actual = actions.setOptionValue(
				'rendering',
				'transposeValue',
				3
			);

			expect(actual).toEqual(expected);
		});

		test('should throw if not given context', () => {
			const throwingFn = () =>
				actions.setOptionValue(undefined, 'transposeValue', 3);

			expect(throwingFn).toThrow(TypeError);
			expect(throwingFn).toThrow(
				'Cannot set an option without a context'
			);
		});

		test('should throw if not given key', () => {
			const throwingFn = () =>
				actions.setOptionValue('rendering', undefined, 3);

			expect(throwingFn).toThrow(TypeError);
			expect(throwingFn).toThrow('Cannot set an option without a key');
		});
	});
});
