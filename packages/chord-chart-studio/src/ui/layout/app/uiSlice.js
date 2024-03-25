import createAppSlice from '../../../core/createAppSlice';
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

export const editorModeChangedAction = (mode, thunkAPI) => {
	const payload = {
		mode,
		fileId: getSelectedId(thunkAPI.getState()),
	};
	return Promise.resolve(payload);
};

const uiSlice = createAppSlice({
	name: sliceName,
	initialState,
	reducers: (create) => ({
		leftBarToggled: create.reducer((state) => {
			state.isLeftBarCollapsed = !state.isLeftBarCollapsed;
		}),
		rightBarToggled: create.reducer((state) => {
			state.isRightBarCollapsed = !state.isRightBarCollapsed;
		}),
		editorModeChanged: create.asyncThunk(editorModeChangedAction, {
			fulfilled: (state, action) => {
				state.editorMode = action.payload.mode;
			},
		}),
	}),
	extraReducers: (builder) => {
		builder
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

export const { leftBarToggled, rightBarToggled, editorModeChanged } =
	uiSlice.actions;

export const { isLeftBarCollapsed, isRightBarCollapsed, getEditorMode } =
	uiSlice.selectors;

export default uiSlice.reducer;
