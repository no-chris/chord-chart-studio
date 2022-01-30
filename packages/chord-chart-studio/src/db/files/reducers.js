import _pick from 'lodash/pick';
import clock from '../../core/clock';

import * as actionTypes from './actionsTypes';

import { DB_OPTION_SET_OPTION_VALUE } from '../options/actionsTypes';
import { UI_LAYOUT_APP_SET_EDITOR_MODE } from '../../ui/layout/app/_state/actionsTypes';
import { getEditorMode } from '../../ui/layout/app/_state/selectors';
import { getSelectedId } from '../../fileManager/_state/selectors';
import { getLatestModeOptions, getCategoryOptions } from './selectors';
import editorModeOptions from '../options/editorModeOptions';

const initialState = {
	allFiles: {},
};

function createFile(state, action) {
	const { id, title, content } = action.payload;

	const allFiles = { ...state.allFiles };
	allFiles[id] = {
		id,
		title,
		content,
	};

	return {
		...state,
		allFiles,
	};
}

function updateFile(state, action) {
	const { id, title, content } = action.payload;

	if ((!title && typeof content === 'undefined') || !state.allFiles[id]) {
		return state;
	}

	const allFiles = { ...state.allFiles };

	allFiles[id] = { ...allFiles[id] };

	if (title) {
		allFiles[id].title = title;
	}
	if (typeof content !== 'undefined') {
		allFiles[id].content = content;
	}
	return {
		...state,
		allFiles,
	};
}

function deleteFile(state, action) {
	const { id } = action.payload;

	if (!id || !state.allFiles[id]) {
		return state;
	}

	const allFiles = { ...state.allFiles };
	delete allFiles[id];

	return {
		...state,
		allFiles,
	};
}

/**
 * Whenever the user set an option, we save it in the song entity, either:
 * - for the current editing mode if it is a formatting option
 * - in the preferences otherwise
 */
function updateFileOption(state, action, fullState) {
	const { context, key, value } = action.payload;
	const id = getSelectedId(fullState);
	const allFiles = { ...state.allFiles };

	if (
		['songFormatting', 'songPreferences'].includes(context) &&
		allFiles[id]
	) {
		const editorMode = getEditorMode(fullState);
		const optionCategory =
			context === 'songPreferences' ? 'preferences' : editorMode;

		allFiles[id] = addOption(allFiles[id], optionCategory, key, value);
		return {
			...state,
			allFiles,
		};
	}
	return state;
}

function addOption(fileState, category, key, value) {
	return {
		...fileState,
		options: {
			...fileState.options,
			[category]: {
				...(fileState.options || {})[category],
				updatedAt: clock(),
				[key]: value,
			},
		},
	};
}

/**
 * When a user switch mode and the target mode does not have any saved settings yet,
 * we apply the latest saved settings (all modes merged) for a better user flow
 */
function setEditorMode(state, action, fullState) {
	const fileId = getSelectedId(fullState);
	const nextMode = action.payload.mode;

	const hasOptionsForNextMode = !!getCategoryOptions(
		fullState,
		fileId,
		nextMode
	);

	if (!hasOptionsForNextMode) {
		const previousModeOptions = _pick(
			getLatestModeOptions(fullState, fileId) || {},
			editorModeOptions[nextMode]
		);

		if (Object.keys(previousModeOptions).length) {
			previousModeOptions.updatedAt = clock();
			const allFiles = { ...state.allFiles };

			allFiles[fileId] = {
				...allFiles[fileId],
				options: {
					...allFiles[fileId].options,
					[nextMode]: previousModeOptions,
				},
			};

			return {
				...state,
				allFiles,
			};
		}
	}
	return state;
}

export default (state = initialState, action = {}, fullState = {}) => {
	switch (action.type) {
		case actionTypes.DB_FILES_CREATE:
		case actionTypes.DB_FILES_IMPORT:
			return createFile(state, action);
		case actionTypes.DB_FILES_UPDATE:
			return updateFile(state, action);
		case actionTypes.DB_FILES_DELETE:
			return deleteFile(state, action);
		case DB_OPTION_SET_OPTION_VALUE:
			return updateFileOption(state, action, fullState);
		case UI_LAYOUT_APP_SET_EDITOR_MODE:
			return setEditorMode(state, action, fullState);
	}
	return state;
};
