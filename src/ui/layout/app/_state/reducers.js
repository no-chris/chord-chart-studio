import {
	UI_LAYOUT_APP_TOGGLE_RIGHT_BAR,
	UI_LAYOUT_APP_TOGGLE_LEFT_BAR,
	UI_LAYOUT_APP_SET_EDITOR_MODE,
} from './actionsTypes';

const initialState = {
	isLeftBarCollapsed: false,
	isRightBarCollapsed: false,
	editorMode: 'edit',
};

export default function reducers(state = initialState, action = {}) {
	switch (action.type) {
		case UI_LAYOUT_APP_TOGGLE_LEFT_BAR: {
			return {
				...state,
				isLeftBarCollapsed: !state.isLeftBarCollapsed,
			};
		}
		case UI_LAYOUT_APP_TOGGLE_RIGHT_BAR: {
			return {
				...state,
				isRightBarCollapsed: !state.isRightBarCollapsed,
			};
		}
		case UI_LAYOUT_APP_SET_EDITOR_MODE: {
			const { mode } = action.payload;
			return {
				...state,
				editorMode: mode,
			};
		}
	}
	return state;
}
