import createAction from '../../../../core/createAction';
import pluginId from './id';

const initialState = {
	isLeftBarCollapsed: false,
	isRightBarCollapsed: false,
};


/**
 * ==============
 * ACTIONS
 * ==============
 */

const TOGGLE_LEFT_BAR = pluginId + '_toggleLeftBar';
const TOGGLE_RIGHT_BAR = pluginId + '_toggleRightBar';

export function toggleLeftBar(dispatch) {
	dispatch(createAction(TOGGLE_LEFT_BAR));
}

export function toggleRightBar(dispatch) {
	dispatch(createAction(TOGGLE_RIGHT_BAR));
}


/**
 * ==============
 * REDUCERS
 * ==============
 */

export function reducers(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_LEFT_BAR: {
			return {
				...state,
				isLeftBarCollapsed: !state.isLeftBarCollapsed
			};
		}
		case TOGGLE_RIGHT_BAR: {
			return {
				...state,
				isRightBarCollapsed: !state.isRightBarCollapsed
			};
		}
	}
	return state;
}


/**
 * ==============
 * SELECTORS
 * ==============
 */

export function getIsLeftBarCollapsed(state) {
	return state[pluginId].isLeftBarCollapsed;
}

export function getIsRightBarCollapsed(state) {
	return state[pluginId].isRightBarCollapsed;
}
