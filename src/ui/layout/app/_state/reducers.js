import {
	UI_LAYOUT_APP_CLOSE_MODAL,
	UI_LAYOUT_APP_OPEN_MODAL,
	UI_LAYOUT_APP_TOGGLE_RIGHT_BAR,
	UI_LAYOUT_APP_TOGGLE_LEFT_BAR,
	UI_LAYOUT_APP_SET_EDITOR_MODE,
} from './actionsTypes';

const initialState = {
	isLeftBarCollapsed: false,
	isRightBarCollapsed: false,
	editorMode: 'edit',
	activeModal: 'none',
};

export default function reducers(state = initialState, action = {}) {
	switch (action.type) {
		case  UI_LAYOUT_APP_CLOSE_MODAL: {
			return {
				...state,
				activeModal: 'none'
			};
		}
		
		case  UI_LAYOUT_APP_OPEN_MODAL: {
			const { modalId } = action.payload;
			
			return {
				...state,
				activeModal: modalId
			};
		}
		
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
