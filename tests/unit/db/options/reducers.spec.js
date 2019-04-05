import deepFreeze from 'deep-freeze';

import reducers from '../../../../src/db/options/reducers';
import * as actions from '../../../../src/db/options/actions';
import * as actionTypes from '../../../../src/db/options/actionsTypes';

describe('db/options: reducers', () => {

	const initialState = deepFreeze(reducers());

	describe('Unknown action', () => {
		test('should return un-mutated state', () => {
			const state = reducers(initialState);
			expect(state).toBe(initialState);
		});
	});

	describe(actionTypes.DB_OPTION_SET, () => {
		test('should allow to set an option in a new context', () => {
			const expected = {
				options: {
					rendering: {
						transposeValue: 3,
					}
				}
			};

			const action = actions.setOption('rendering', 'transposeValue', 3);
			const actual = reducers(initialState, action);

			expect(actual).toEqual(expected);
		});

		test('should allow to add an option to an existing context', () => {
			const expected = {
				options: {
					rendering: {
						transposeValue: 3,
						fontSize: 4,
					}
				}
			};

			const action1 = actions.setOption('rendering', 'transposeValue', 3);
			const state1 = deepFreeze(reducers(initialState, action1));

			const action2 = actions.setOption('rendering', 'fontSize', 4);
			const state2 = deepFreeze(reducers(state1, action2));

			expect(state2).toEqual(expected);
		});

		test('should allow to create multiple contexts', () => {
			const expected = {
				options: {
					rendering: {
						transposeValue: 3,
						fontSize: 4,
					},
					user: {
						theme: 'dark'
					}
				}
			};

			const action1 = actions.setOption('rendering', 'transposeValue', 3);
			const state1 = deepFreeze(reducers(initialState, action1));

			const action2 = actions.setOption('rendering', 'fontSize', 4);
			const state2 = deepFreeze(reducers(state1, action2));

			const action3 = actions.setOption('user', 'theme', 'dark');
			const state3 = deepFreeze(reducers(state2, action3));

			expect(state3).toEqual(expected);
		});
	});


});
