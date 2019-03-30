import _sortBy from 'lodash/sortBy';
import _findIndex from 'lodash/findIndex';

import createAction from '../../core/createAction';
import pluginId from './id';

import fileManagerFactory from './services/fileManager';

const fileManager = fileManagerFactory();


const sortedFiles = _sortBy(fileManager.getAll(), o => o.title);

const initialState = {
	allFiles: sortedFiles,
	selected: (sortedFiles.length) ? sortedFiles[0].key : '',
	renamed: '',
	defaultTitle: 'Untitled'
};


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

export function selectFile(dispatch, fileKey) {
	dispatch(
		createAction(SELECT_FILE, { fileKey })
	);
}

export function createFile(dispatch) {
	const newFile = fileManager.create();
	dispatch(
		createAction(CREATE_FILE, { newFile })
	);
}

export function deleteFile(dispatch, fileKey) {
	fileManager.deleteOne(fileKey);
	dispatch(
		createAction(DELETE_FILE, { fileKey })
	);
}

export function renameFile(dispatch, fileKey, title) {
	fileManager.updateTitle(fileKey, title);
	dispatch(
		createAction(RENAME_FILE, { fileKey, title })
	);
}

export function enableRename(dispatch, fileKey) {
	dispatch(
		createAction(ENABLE_RENAME, { fileKey })
	);
}


/**
 * ==============
 * REDUCERS
 * ==============
 */

export function reducers(state = initialState, action) {
	switch (action.type) {
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
				],
				selected: newFile.key,
				renamed: newFile.key,
			};
		}

		case DELETE_FILE: {
			const { fileKey } = action.payload;
			const toDeleteIndex = _findIndex(state.allFiles, o => o.key === fileKey);

			let selected = '';

			if (typeof state.allFiles[toDeleteIndex + 1] !== 'undefined') {
				selected = state.allFiles[toDeleteIndex + 1].key;

			} else if (typeof state.allFiles[toDeleteIndex - 1] !== 'undefined') {
				selected = state.allFiles[toDeleteIndex - 1].key;
			}

			return {
				...state,
				allFiles: [
					...state.allFiles.slice(0, toDeleteIndex),
					...state.allFiles.slice(toDeleteIndex + 1)
				],
				selected
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
