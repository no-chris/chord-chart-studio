import { createSlice } from '@reduxjs/toolkit';
import {
	DB_FILES_CREATE,
	DB_FILES_IMPORT,
	DB_FILES_DELETE,
} from '../../../db/files/actionsTypes';

const initialState = {
	isLeftBarCollapsed: false,
	isRightBarCollapsed: false,
	editorMode: 'edit',
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		leftBarToggled(state) {
			state.isLeftBarCollapsed = !state.isLeftBarCollapsed;
		},
		rightBarToggled(state) {
			state.isRightBarCollapsed = !state.isRightBarCollapsed;
		},
		editorModeChanged(state, action) {
			state.editorMode = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(DB_FILES_CREATE, (state) => {
			state.editorMode = 'edit';
		});
		builder.addCase(DB_FILES_IMPORT, (state) => {
			state.editorMode = 'edit';
		});
		builder.addCase(DB_FILES_DELETE, (state) => {
			state.editorMode = 'edit';
		});
	},
	selectors: {
		isLeftBarCollapsed: (state) => state.isLeftBarCollapsed,
		isRightBarCollapsed: (state) => state.isRightBarCollapsed,
		getEditorMode: (state) => state.editorMode,
	},
});

export const { leftBarToggled, rightBarToggled, editorModeChanged } =
	uiSlice.actions;

export const { isLeftBarCollapsed, isRightBarCollapsed, getEditorMode } =
	uiSlice.selectors;

export default uiSlice.reducer;
