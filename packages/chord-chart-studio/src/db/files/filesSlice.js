import { v4 as uuidv4 } from 'uuid';
import _pick from 'lodash/pick';

import { createSlice } from '@reduxjs/toolkit';
import clock from '../../core/clock';

import editorModeOptions from '../options/editorModeOptions';
import { getCategoryOptions, getLatestModeOptions } from './selectors';

import { optionValueChanged } from '../options/optionsSlice';
import { editorModeChanged } from '../../ui/layout/app/uiSlice';

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
function optionValueChangedReducer(state, action) {
	const { context, key, value, fileId, editorMode } = action.payload;

	if (
		['songFormatting', 'songPreferences'].includes(context) &&
		state.allFiles[fileId]
	) {
		const optionCategory =
			context === 'songPreferences' ? 'preferences' : editorMode;

		if (!state.allFiles[fileId].options) {
			state.allFiles[fileId].options = {};
		}
		if (!state.allFiles[fileId].options[optionCategory]) {
			state.allFiles[fileId].options[optionCategory] = {};
		}
		state.allFiles[fileId].options[optionCategory].updatedAt = clock();
		state.allFiles[fileId].options[optionCategory][key] = value;
	}
	return state;
}

/**
 * When a user switch mode and the target mode does not have any saved settings yet,
 * we apply the latest saved settings (all modes merged) for a better user flow
 */
function editorModeChangedReducer(state, action) {
	const { fileId, mode: nextMode } = action.payload;

	const hasOptionsForNextMode = !!getCategoryOptions(state, fileId, nextMode);

	if (!hasOptionsForNextMode) {
		const previousModeOptions = _pick(
			getLatestModeOptions(state, fileId) || {},
			editorModeOptions[nextMode]
		);

		if (Object.keys(previousModeOptions).length) {
			previousModeOptions.updatedAt = clock();
			if (!state.allFiles[fileId].options) {
				state.allFiles[fileId].options = {};
			}

			state.allFiles[fileId].options[nextMode] = previousModeOptions;
		}
	}
	return state;
}

const uiSlice = createSlice({
	name: 'files',
	initialState,
	reducers: (create) => ({
		fileCreated: create.preparedReducer(
			fileCreatedAction,
			fileCreatedReducer
		),
		fileImported: create.preparedReducer(
			fileCreatedAction,
			fileCreatedReducer
		),
		fileUpdated: create.preparedReducer(
			fileUpdatedAction,
			fileUpdatedReducer
		),
		fileDeleted: create.reducer(fileDeletedReducer),
	}),
	extraReducers: (builder) => {
		builder
			.addCase(optionValueChanged.fulfilled, optionValueChangedReducer)
			.addCase(editorModeChanged.fulfilled, editorModeChangedReducer);
	},
});

export const { fileCreated, fileImported, fileUpdated, fileDeleted } =
	uiSlice.actions;

export default uiSlice.reducer;
