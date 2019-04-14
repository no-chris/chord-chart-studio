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

	describe(actionTypes.DB_OPTION_SET_OPTION_VALUE, () => {
		const startState = deepFreeze({
			rendering: {
				transposeValue: {
					value: 0,
					default: 0,
				},
			}
		});

		test('should allow to set an option value of an existing option', () => {
			const expected = {
				rendering: {
					transposeValue: {
						value: 3,
						default: 0,
					},
				}
			};

			const action = actions.setOptionValue('rendering', 'transposeValue', 3);
			const actual = reducers(startState, action);

			expect(actual).toEqual(expected);
		});

		test('should fail silently if trying to set a value of an non existing context', () => {
			const action = actions.setOptionValue('newContext', 'newOption', 3);
			const actual = reducers(startState, action);

			expect(actual).toBe(startState);
		});

		test('should fail silently if trying to set a value of an non existing option', () => {
			const action = actions.setOptionValue('rendering', 'newOption', 3);
			const actual = reducers(startState, action);

			expect(actual).toBe(startState);
		});


	});


});
