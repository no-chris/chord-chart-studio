import { v4 as uuidv4 } from 'uuid';
import _pick from 'lodash/pick';
import _cloneDeep from 'lodash/cloneDeep';

import createAppSlice from '../../core/createAppSlice';
import clock from '../../core/clock';

import allEditorModeOptions from '../options/editorModeOptions';
import { getCategoryOptions, getLatestModeOptions } from './selectors';

import { editorModeChanged, getEditorMode } from '../../ui/layout/app/uiSlice';
import { getSelectedId } from '../../fileManager/_state/selectors';
import { DB_OPTION_SET_OPTION_VALUE } from '../options/actionsTypes';
import { FILE_MANAGER_SELECT_FILE } from '../../fileManager/_state/actionsTypes';

const initialState = {};

const sliceName = 'options';

export const optionValueChangedAction = ({ context, key, value }, thunkAPI) => {
	if (!context) {
		throw new TypeError('Cannot set an option without a context');
	}
	if (!key) {
		throw new TypeError('Cannot set an option without a key');
	}
	const { getState } = thunkAPI;
	const payload = {
		context,
		key,
		value,
		editorMode: getEditorMode(getState()),
		fileId: getSelectedId(getState()),
	};
	return Promise.resolve(payload);
};

function optionValueChangedReducer(state, action) {
	const { context, key, value } = action.payload;

	if (
		!state[context] ||
		!state[context].values ||
		typeof state[context].values[key] === 'undefined'
	) {
		return state;
	}

	state[context].values[key] = value;
}

function editorModeChangedReducer(state, action) {
	const { modeOptions, optionsDefaults } = action.payload;

	if (!state.songFormatting) {
		state.songFormatting = {};
	}
	state.songFormatting.values = { ...optionsDefaults, ...modeOptions };
}
/*
function selectFileReducer(state, action, fullState) {
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
*/

const uiSlice = createAppSlice({
	name: sliceName,
	initialState,
	reducers: (create) => ({
		optionValueChanged: create.asyncThunk(optionValueChangedAction, {
			fulfilled: optionValueChangedReducer,
		}),
	}),
	/*
	tmp: {
		optionValueChanged: {
			reducer: optionValueChangedReducer,
			prepare: optionValueChangedAction,
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
    */
	extraReducers: (builder) => {
		builder
			//.addCase(FILE_MANAGER_SELECT_FILE, selectFileReducer)
			.addCase(editorModeChanged.fulfilled, editorModeChangedReducer);
	},
});

export const { optionValueChanged } = uiSlice.actions;

export default uiSlice.reducer;
