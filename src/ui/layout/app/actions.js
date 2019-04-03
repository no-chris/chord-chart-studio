import { TOGGLE_LEFT_BAR, TOGGLE_RIGHT_BAR } from './actions-types';
import createAction from '../../../core/createAction';

export function toggleLeftBar(dispatch) {
	dispatch(createAction(TOGGLE_LEFT_BAR));
}

export function toggleRightBar(dispatch) {
	dispatch(createAction(TOGGLE_RIGHT_BAR));
}
