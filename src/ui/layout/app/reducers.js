import { TOGGLE_RIGHT_BAR, TOGGLE_LEFT_BAR } from './actions-types';

const initialState = {
	isLeftBarCollapsed: false,
	isRightBarCollapsed: false,
};

export default function reducers(state = initialState, action) {
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
