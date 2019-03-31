import _sortBy from 'lodash/sortBy';
import _findIndex from 'lodash/findIndex';

import createAction from '../../core/createAction';
import pluginId from './id';
import fileManagerFactory from './services/fileManager';

import { openSong } from '../songRenderer/state'; //fixme: this beaks plugin encapsulation


const fileManager = fileManagerFactory();

const initialState = {
	allFiles: [],
	selected: '',
	renamed: '',
	defaultTitle: 'Untitled'
};


// Helpers
function sortFilesBySongTitle(allFiles) {
	return _sortBy(allFiles, o => (o.title || '').toLowerCase());
}

/**
 * ==============
 * ACTIONS
 * ==============
 */

const SELECT_FILE = pluginId + '_selectFile';
const CREATE_FILE = pluginId + '_createFile';
const DELETE_FILE = pluginId + '_deleteFile';
const RENAME_FILE = pluginId + '_renameFile';
const ENABLE_RENAME = pluginId + '_enableRename';
const LOAD_ALL_FILES = pluginId + '_loadAllFiles';


export function selectFile(fileKey) {
	return dispatch => {
		const selectedSong = fileManager.getOneByKey(fileKey);

		dispatch(createAction(SELECT_FILE, { fileKey }));
		dispatch(openSong(selectedSong.content));
	};
}

export function createFile() {
	const newFile = fileManager.create();
	return dispatch => {
		dispatch(createAction(CREATE_FILE, { newFile }));
		dispatch(selectFile(newFile.key));
		dispatch(enableRename(newFile.key));
	};
}

export function deleteFile(fileKey) {
	return (dispatch, getState) => {
		const allFiles = getAllFiles(getState());
		const toDeleteIndex = _findIndex(allFiles, o => o.key === fileKey);

		let toSelectAfterDelete = '';

		if (allFiles[toDeleteIndex + 1]) {
			toSelectAfterDelete = allFiles[toDeleteIndex + 1].key;

		} else if (allFiles[toDeleteIndex - 1]) {
			toSelectAfterDelete = allFiles[toDeleteIndex - 1].key;
		}

		fileManager.deleteOne(fileKey);

		dispatch(createAction(DELETE_FILE, { toDeleteIndex }));
		dispatch(selectFile(toSelectAfterDelete));
	};
}

export function renameFile(fileKey, title) {
	fileManager.updateTitle(fileKey, title);
	return createAction(RENAME_FILE, { fileKey, title });
}

export function enableRename(fileKey) {
	return createAction(ENABLE_RENAME, { fileKey });
}

export function loadAllFromStorage() {
	const allFiles = sortFilesBySongTitle(fileManager.getAll());
	return dispatch => {
		dispatch(createAction(LOAD_ALL_FILES, { allFiles }));
		dispatch(openSong(allFiles[0].content));
	};
}

/**
 * ==============
 * REDUCERS
 * ==============
 */

export function reducers(state = initialState, action) {
	switch (action.type) {
		case LOAD_ALL_FILES: {
			const { allFiles } = action.payload;
			const selected = allFiles[0].key;

			return {
				...state,
				allFiles,
				selected
			};
		}

		case SELECT_FILE: {
			const { fileKey } = action.payload;
			return {
				...state,
				selected: fileKey,
				renamed: (fileKey === state.renamed) ? fileKey : ''
			};
		}

		case CREATE_FILE: {
			const { newFile } = action.payload;
			const currentFileIndex = _findIndex(state.allFiles, o => o.key === state.selected);
			return {
				...state,
				allFiles: [
					...state.allFiles.slice(0, currentFileIndex + 1),
					newFile,
					...state.allFiles.slice(currentFileIndex + 1)
				]
			};
		}

		case DELETE_FILE: {
			const { toDeleteIndex } = action.payload;

			return {
				...state,
				allFiles: [
					...state.allFiles.slice(0, toDeleteIndex),
					...state.allFiles.slice(toDeleteIndex + 1)
				]
			};
		}

		case RENAME_FILE: {
			const { fileKey, title } = action.payload;
			const toRenameIndex = _findIndex(state.allFiles, o => o.key === fileKey);

			return {
				...state,
				allFiles: [
					...state.allFiles.slice(0, toRenameIndex),
					{
						...state.allFiles[toRenameIndex],
						title
					},
					...state.allFiles.slice(toRenameIndex + 1)
				],
				renamed: ''
			};
		}

		case ENABLE_RENAME: {
			const { fileKey } = action.payload;

			return {
				...state,
				renamed: fileKey
			};
		}
	}
	return state;
}


/**
 * ==============
 * SELECTORS
 * ==============
 */

export function getAllFiles(state) {
	return state[pluginId].allFiles;
}

export function getSelectedFile(state) {
	return state[pluginId].selected;
}

export function getRenamedFile(state) {
	return state[pluginId].renamed;
}

export function getDefaultTitle(state) {
	return state[pluginId].defaultTitle;
}
