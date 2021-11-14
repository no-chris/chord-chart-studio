import {
	UI_LAYOUT_APP_SET_EDITOR_MODE,
	UI_LAYOUT_APP_TOGGLE_LEFT_BAR,
	UI_LAYOUT_APP_TOGGLE_RIGHT_BAR,
} from './actionsTypes';

import createAction from '../../../../core/createAction';

export const setEditorMode = (mode) =>
	createAction(UI_LAYOUT_APP_SET_EDITOR_MODE, { mode });

export const toggleLeftBar = () => createAction(UI_LAYOUT_APP_TOGGLE_LEFT_BAR);

export const toggleRightBar = () =>
	createAction(UI_LAYOUT_APP_TOGGLE_RIGHT_BAR);
