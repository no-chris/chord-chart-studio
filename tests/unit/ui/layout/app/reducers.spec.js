import deepFreeze from 'deep-freeze';

import reducers from '../../../../../src/ui/layout/app/reducers';
import * as actions from '../../../../../src/ui/layout/app/actions';
import * as actionsTypes from '../../../../../src/ui/layout/app/actionsTypes';

const initialState = deepFreeze(reducers());

describe('ui/layout/app: reducers', () => {

	describe('Unknown action', () => {
		test('should return un-mutated state', () => {
			const state = reducers(initialState);
			expect(state).toBe(initialState);
		});
	});


	describe(actionsTypes.UI_LAYOUT_APP_TOGGLE_LEFT_BAR, () => {
		test('should toggle left bar state', () => {
			const state1 = deepFreeze(reducers(initialState, actions.toggleLeftBar()));
			expect(state1.isLeftBarCollapsed).toBe(!initialState.isLeftBarCollapsed);

			const state2 = deepFreeze(reducers(state1, actions.toggleLeftBar()));
			expect(state2.isLeftBarCollapsed).toBe(!!initialState.isLeftBarCollapsed);
		});
	});


	describe(actionsTypes.UI_LAYOUT_APP_TOGGLE_RIGHT_BAR, () => {
		test('should toggle right bar state', () => {
			const state1 = deepFreeze(reducers(initialState, actions.toggleRightBar()));
			expect(state1.isRightBarCollapsed).toBe(!initialState.isRightBarCollapsed);

			const state2 = deepFreeze(reducers(state1, actions.toggleRightBar()));
			expect(state2.isRightBarCollapsed).toBe(!!initialState.isRightBarCollapsed);
		});
	});

});
