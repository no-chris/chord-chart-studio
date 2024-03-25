import { v4 as uuidv4 } from 'uuid';
import _pick from 'lodash/pick';

import { createSlice } from '@reduxjs/toolkit';
import clock from '../../core/clock';

import editorModeOptions from '../options/editorModeOptions';
import { getCategoryOptions, getLatestModeOptions } from './selectors';

import { editorModeChanged, getEditorMode } from '../../ui/layout/app/uiSlice';
import { getSelectedId } from '../../fileManager/_state/selectors';
import { DB_OPTION_SET_OPTION_VALUE } from '../options/actionsTypes';

const initialState = {
	allFiles: {},
};

function fileCreatedAction(title, content = '') {
	if (!title) {
		throw new TypeError('Cannot create a file without title');
	}
	return {
		payload: {
			id: uuidv4(),
			title,
			content,
		},
	};
}

function fileCreatedReducer(state, action) {
	const { id, title, content } = action.payload;
	state.allFiles[id] = { id, title, content };
}

function fileUpdatedAction(id, { title, content } = {}) {
	if (!id) {
		throw new TypeError('Cannot update a file without an id');
	}
	return {
		payload: {
			id,
			title,
			content,
		},
	};
}

function fileUpdatedReducer(state, action) {
	const { id, title, content } = action.payload;

	if (state.allFiles[id] && !(!title && typeof content === 'undefined')) {
		if (title) {
			state.allFiles[id].title = title;
		}
		if (typeof content !== 'undefined') {
			state.allFiles[id].content = content;
		}
	}
}

function fileDeletedReducer(state, action) {
	const id = action.payload;

	if (id && state.allFiles[id]) {
		delete state.allFiles[id];
	}
}

/**
 * Whenever the user set an option, we save it in the song entity, either:
 * - for the current editing mode if it is a formatting option
 * - in the preferences otherwise
 */
function setOptionValueReducer(state, action) {
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
function editorModeChangedReducer(state, action) {
	const fileId = action.payload.fileId;
	const nextMode = action.payload.mode;

	const hasOptionsForNextMode = !!getCategoryOptions(state, fileId, nextMode);

	if (!hasOptionsForNextMode) {
		const previousModeOptions = _pick(
			getLatestModeOptions(state, fileId) || {},
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

const uiSlice = createSlice({
	name: 'files',
	initialState,
	reducers: {
		fileCreated: {
			reducer: fileCreatedReducer,
			prepare: fileCreatedAction,
		},
		fileImported: {
			reducer: fileCreatedReducer,
			prepare: fileCreatedAction,
		},
		fileUpdated: {
			reducer: fileUpdatedReducer,
			prepare: fileUpdatedAction,
		},
		fileDeleted: fileDeletedReducer,
	},
	extraReducers: (builder) => {
		builder
			.addCase(DB_OPTION_SET_OPTION_VALUE, setOptionValueReducer)
			.addCase(editorModeChanged.fulfilled, editorModeChangedReducer);
	},
});

export const { fileCreated, fileImported, fileUpdated, fileDeleted } =
	uiSlice.actions;

export default uiSlice.reducer;
