import _cloneDepp from 'lodash/cloneDeep';

export default function (state, action) {
	const newState = _cloneDepp(state);

	switch (action.type) {
		case 'LAYOUT__toggleLeftBar': {
			newState.layout.App.isLeftBarCollapsed = !state.layout.App.isLeftBarCollapsed;
			return newState;
		}
		case 'LAYOUT__toggleRightBar': {
			newState.layout.App.isRightBarCollapsed = !state.layout.App.isRightBarCollapsed;
			return newState;
		}
	}
	return state;
}
