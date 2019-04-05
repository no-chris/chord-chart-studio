import {
	UI_LAYOUT_APP_TOGGLE_RIGHT_BAR,
	UI_LAYOUT_APP_TOGGLE_LEFT_BAR
} from './actionsTypes';

const initialState = {
	isLeftBarCollapsed: false,
	isRightBarCollapsed: false,
};

export default function reducers(state = initialState, action = {}) {
	switch (action.type) {
		case UI_LAYOUT_APP_TOGGLE_LEFT_BAR: {
			return {
				...state,
				isLeftBarCollapsed: !state.isLeftBarCollapsed
			};
		}
		case UI_LAYOUT_APP_TOGGLE_RIGHT_BAR: {
			return {
				...state,
				isRightBarCollapsed: !state.isRightBarCollapsed
			};
		}
	}
	return state;
}
