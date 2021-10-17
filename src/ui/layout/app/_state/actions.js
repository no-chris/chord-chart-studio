import {
	UI_LAYOUT_APP_CLOSE_MODAL,
	UI_LAYOUT_APP_OPEN_MODAL,
	UI_LAYOUT_APP_SET_EDITOR_MODE,
	UI_LAYOUT_APP_TOGGLE_LEFT_BAR,
	UI_LAYOUT_APP_TOGGLE_RIGHT_BAR,
} from './actionsTypes';

import createAction from '../../../../core/createAction';

export const closeModal = () => createAction(UI_LAYOUT_APP_CLOSE_MODAL);

export const openModal = (modalId) => createAction(UI_LAYOUT_APP_OPEN_MODAL, { modalId });

export const setEditorMode = (mode) => createAction(UI_LAYOUT_APP_SET_EDITOR_MODE, { mode });

export const toggleLeftBar = () => createAction(UI_LAYOUT_APP_TOGGLE_LEFT_BAR);

export const toggleRightBar = () => createAction(UI_LAYOUT_APP_TOGGLE_RIGHT_BAR);

