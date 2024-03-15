import _pick from 'lodash/pick';

import * as actionTypes from './actionsTypes';
import { getCategoryOptions, getLatestModeOptions } from '../files/selectors';

import { FILE_MANAGER_SELECT_FILE } from '../../fileManager/_state/actionsTypes';
import { getSelectedId } from '../../fileManager/_state/selectors';
import { getEditorMode } from '../../ui/layout/app/reducers';
import { getOptionsDefaults } from './selectors';
import allEditorModeOptions from './editorModeOptions';

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
	const nextMode = action.payload;

	const newOptions = getModeOptions(fullState, fileId, nextMode);

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

// Get defined options for a mode, either because they exist for the given mode,
// or building them from options stored in the other modes
function getModeOptions(fullState, fileId, mode) {
	const defaultOptions = getOptionsDefaults(fullState, 'songFormatting');
	let editorModeOptions = getCategoryOptions(fullState, fileId, mode);

	if (!editorModeOptions) {
		editorModeOptions = getLatestModeOptions(fullState, fileId) || {};
	}
	delete editorModeOptions.updatedAt;

	// take only relevant options for the mode
	editorModeOptions = _pick(editorModeOptions, allEditorModeOptions[mode]);

	return Object.assign(defaultOptions, editorModeOptions);
}

function selectFile(state, action, fullState) {
	const { id } = action.payload;
	const editorMode = getEditorMode(fullState);

	const newOptions = getModeOptions(fullState, id, editorMode);

	const songPreferences =
		getCategoryOptions(fullState, id, 'preferences') || {};
	delete songPreferences.updatedAt;

	const defaultPreferences = getOptionsDefaults(fullState, 'songPreferences');

	const newPreferences = Object.assign(defaultPreferences, songPreferences);

	return {
		...state,
		songPreferences: {
			...state.songPreferences,
			values: {
				...newPreferences,
			},
		},
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
		case 'ui/editorModeChanged': {
			return setEditorMode(state, action, fullState);
		}
		case FILE_MANAGER_SELECT_FILE: {
			return selectFile(state, action, fullState);
		}
	}
	return state;
};
