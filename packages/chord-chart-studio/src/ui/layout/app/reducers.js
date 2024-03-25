import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	DB_FILES_CREATE,
	DB_FILES_IMPORT,
	DB_FILES_DELETE,
} from '../../../db/files/actionsTypes';
import { getSelectedId } from '../../../fileManager/_state/selectors';

const initialState = {
	isLeftBarCollapsed: false,
	isRightBarCollapsed: false,
	editorMode: 'edit',
};

const sliceName = 'ui';

const uiSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		leftBarToggled(state) {
			state.isLeftBarCollapsed = !state.isLeftBarCollapsed;
		},
		rightBarToggled(state) {
			state.isRightBarCollapsed = !state.isRightBarCollapsed;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(editorModeChanged.fulfilled, (state, action) => {
				state.editorMode = action.payload.mode;
			})
			.addCase(DB_FILES_CREATE, (state) => {
				state.editorMode = 'edit';
			})
			.addCase(DB_FILES_IMPORT, (state) => {
				state.editorMode = 'edit';
			})
			.addCase(DB_FILES_DELETE, (state) => {
				state.editorMode = 'edit';
			});
	},
	selectors: {
		isLeftBarCollapsed: (state) => state.isLeftBarCollapsed,
		isRightBarCollapsed: (state) => state.isRightBarCollapsed,
		getEditorMode: (state) => state.editorMode,
	},
});

export const editorModeChanged = createAsyncThunk(
	sliceName + '/editorModeChanged',
	(mode, thunkAPI) => {
		const payload = {
			mode,
			fileId: getSelectedId(thunkAPI.getState()),
		};
		return Promise.resolve(payload);
	}
);

export const { leftBarToggled, rightBarToggled } = uiSlice.actions;

export const { isLeftBarCollapsed, isRightBarCollapsed, getEditorMode } =
	uiSlice.selectors;

export default uiSlice.reducer;
