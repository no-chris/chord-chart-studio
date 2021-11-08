import * as selectors from '../../../../src/db/options/selectors';

describe('db/options: selectors', () => {
	describe('getOptionValue()', () => {
		const state = {
			db: {
				options: {
					rendering: {
						values: {
							transposeValue: 3,
						},
					},
				},
			},
		};

		test('should return required option', () => {
			const expected = 3;

			const result = selectors.getOptionValue(
				state,
				'rendering',
				'transposeValue'
			);

			expect(result).toEqual(expected);
		});

		test('should return undefined if context does not exists', () => {
			const result = selectors.getOptionValue(state, 'user', 'theme');

			expect(result).toBeUndefined();
		});

		test('should return undefined if context does not have values', () => {
			const stateWithNoValuesProp = {
				db: {
					options: {
						rendering: {
							shoudBeValues: {
								transposeValue: 3,
							},
						},
					},
				},
			};
			const result = selectors.getOptionValue(
				stateWithNoValuesProp,
				'rendering',
				'transposeValue'
			);

			expect(result).toBeUndefined();
		});

		test('should return undefined if key does not exists', () => {
			const result = selectors.getOptionValue(
				state,
				'rendering',
				'fontSize'
			);

			expect(result).toBeUndefined();
		});
	});

	describe('getAllOptionValues()', () => {
		const state = {
			db: {
				options: {
					rendering: {
						values: {
							transposeValue: 3,
							fontSize: 4,
							simplify: true,
						},
					},
				},
			},
		};

		test('should return all values for context', () => {
			const expected = {
				transposeValue: 3,
				fontSize: 4,
				simplify: true,
			};

			const result = selectors.getAllOptionValues(state, 'rendering');

			expect(result).toEqual(expected);
		});

		test('should return a copy of the state', () => {
			const result = selectors.getAllOptionValues(state, 'rendering');

			result.transposeValue = 4;
			result.fontSize = 3;
			result.simplify = false;

			expect(state.db.options.rendering.values.transposeValue).toEqual(3);
			expect(state.db.options.rendering.values.simplify).toEqual(true);
			expect(state.db.options.rendering.values.fontSize).toEqual(4);
		});

		test('should return undefined if context does not exists', () => {
			const result = selectors.getAllOptionValues(state, 'user');

			expect(result).toBeUndefined();
		});
	});

	describe('getOptionsDefaults()', () => {
		const state = {
			db: {
				options: {
					rendering: {
						defaults: {
							transposeValue: 3,
							fontSize: 4,
							simplify: true,
						},
					},
				},
			},
		};

		test('should return all values for context', () => {
			const expected = {
				transposeValue: 3,
				fontSize: 4,
				simplify: true,
			};

			const result = selectors.getOptionsDefaults(state, 'rendering');

			expect(result).toEqual(expected);
		});

		test('should return a copy of the state', () => {
			const result = selectors.getOptionsDefaults(state, 'rendering');

			result.transposeValue = 5;
			result.fontSize = 4;
			result.simplify = false;

			expect(state.db.options.rendering.defaults.transposeValue).toEqual(
				3
			);
			expect(state.db.options.rendering.defaults.simplify).toEqual(true);
			expect(state.db.options.rendering.defaults.fontSize).toEqual(4);
		});

		test('should return undefined if context does not exists', () => {
			const result = selectors.getOptionsDefaults(state, 'user');

			expect(result).toBeUndefined();
		});
	});
});
