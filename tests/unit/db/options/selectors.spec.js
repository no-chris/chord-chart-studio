import * as selectors from '../../../../src/db/options/selectors';

describe('db/options: selectors', () => {
	describe('getOption()', () => {
		test('should return required option', () => {
			const state = {
				db: {
					options: {
						rendering: {
							transposeValue: 3
						}
					}
				}
			};
			const expected = 3;

			const result = selectors.getOption(state, 'rendering', 'transposeValue');

			expect(result).toEqual(expected);
		});

		test('should return undefined if context does not exists', () => {
			const state = {
				db: {
					options: {
						rendering: {
							transposeValue: 3
						}
					}
				}
			};
			const result = selectors.getOption(state, 'user', 'theme');

			expect(result).toBeUndefined();
		});

		test('should return undefined if key does not exists', () => {
			const state = {
				db: {
					options: {
						rendering: {
							transposeValue: 3
						}
					}
				}
			};
			const result = selectors.getOption(state, 'rendering', 'fontSize');

			expect(result).toBeUndefined();
		});
	});

	describe('getContext()', () => {
		test('should return all values for context', () => {
			const state = {
				db: {
					options: {
						rendering: {
							transposeValue: 3,
							fontSize: 4,
							simplify: true,
						}
					}
				}
			};
			const expected = {
				transposeValue: 3,
				fontSize: 4,
				simplify: true,
			};

			const result = selectors.getContext(state, 'rendering');

			expect(result).toEqual(expected);
		});

		test('should return undefined if context does not exists', () => {
			const state = {
				db: {
					options: {
						rendering: {
							transposeValue: 3
						}
					}
				}
			};
			const result = selectors.getOption(state, 'user');

			expect(result).toBeUndefined();
		});

	});

});
