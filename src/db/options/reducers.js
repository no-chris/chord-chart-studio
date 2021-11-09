import * as actionTypes from './actionsTypes';
import { getCategoryOptions, getLatestModeOptions } from '../files/selectors';

import { UI_LAYOUT_APP_SET_EDITOR_MODE } from '../../ui/layout/app/_state/actionsTypes';
import { getSelectedId } from '../../fileManager/_state/selectors';
import { getOptionsDefaults } from './selectors';

const initialState = {};

function setOptionValue(state, action) {
	const { context, key, value } = action.payload;

	if (
		!state[context] ||
		!state[context].values ||
		typeof state[context].values[key] === 'undefined'
	) {
		return state;
	}

	const newState = {
		...state,
		[context]: {
			...state[context],
			values: { ...state[context].values },
		},
	};
	newState[context].values[key] = value;

	return newState;
}

function setEditorMode(state, action, fullState) {
	const fileId = getSelectedId(fullState);
	const nextMode = action.payload.mode;

	let editorModeOptions = getCategoryOptions(fullState, fileId, nextMode);

	if (!editorModeOptions) {
		editorModeOptions = getLatestModeOptions(fullState, fileId) || {};
	}
	delete editorModeOptions.updatedAt;

	const defaultOptions = getOptionsDefaults(fullState, 'songFormatting');
	const newOptions = Object.assign(defaultOptions, editorModeOptions);

	return {
		...state,
		songFormatting: {
			...state.songFormatting,
			values: {
				...newOptions,
			},
		},
	};
}

export default (state = initialState, action = {}, fullState = {}) => {
	switch (action.type) {
		case actionTypes.DB_OPTION_SET_OPTION_VALUE: {
			return setOptionValue(state, action);
		}

		case UI_LAYOUT_APP_SET_EDITOR_MODE: {
			return setEditorMode(state, action, fullState);
		}
	}
	return state;
};
