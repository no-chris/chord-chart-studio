import clock from '../../core/clock';

import * as actionTypes from './actionsTypes';

import { DB_OPTION_SET_OPTION_VALUE } from '../options/actionsTypes';
import { getEditorMode } from '../../ui/layout/app/_state/selectors';
import { getSelectedId } from '../../fileManager/_state/selectors';

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

	if ((!title && !content) || !state.allFiles[id]) {
		return state;
	}

	const allFiles = { ...state.allFiles };

	allFiles[id] = { ...allFiles[id] };

	if (title) {
		allFiles[id].title = title;
	}
	if (content) {
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

function updateFileOptions(state, action, fullState) {
	const { context, key, value } = action.payload;
	const id = getSelectedId(fullState);
	const editorMode = getEditorMode(fullState);
	const allFiles = { ...state.allFiles };

	if (
		['songFormatting', 'songPreferences'].includes(context) &&
		allFiles[id]
	) {
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
			return updateFileOptions(state, action, fullState);
		// todo: change editor mode
	}
	return state;
};
