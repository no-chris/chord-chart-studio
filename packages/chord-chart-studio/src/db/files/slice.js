import { v4 as uuidv4 } from 'uuid';
import { _cloneDeep } from 'lodash/cloneDeep';
import { _isEqual } from 'lodash/isEqual';
import { _sortBy } from 'lodash/sortBy';
import { _pick } from 'lodash/pick';
import { _map } from 'lodash/map';

import { createSelectorCreator, defaultMemoize } from 'reselect';

import { createSlice } from '@reduxjs/toolkit';

import { editorModeChanged } from '../../ui/layout/app/reducers';
import editorModeOptions from '../options/editorModeOptions';

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

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, _isEqual);

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
	/*
	extraReducers: (builder) => {
		builder.addCase(editorModeChanged, (state) => {
			//state.editorMode = 'edit';
		});
		builder.addCase(DB_FILES_IMPORT, (state) => {
			state.editorMode = 'edit';
		});
		builder.addCase(DB_FILES_DELETE, (state) => {
			state.editorMode = 'edit';
		});
	},
	*/
});

export const { fileCreated, fileImported, fileUpdated, fileDeleted } =
	uiSlice.actions;

export default uiSlice.reducer;
