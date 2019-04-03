import _findIndex from 'lodash/findIndex';
import _sortBy from 'lodash/sortBy';

import fileManager from '../core/fileManager';
import createAction from '../core/createAction';

import {
	FM_SELECT_FILE,
	FM_CREATE_FILE,
	FM_ENABLE_RENAME,
	FM_RENAME_FILE,
	FM_UPDATE_FILE_CONTENT,
	FM_DELETE_FILE,
	FM_LOAD_ALL_FILES
} from './actions-types';

import { getAllFiles } from './selectors';


export function selectFile(fileKey) {
	return createAction(FM_SELECT_FILE, { fileKey });
}

export function createFile() {
	const newFile = fileManager.create();
	return dispatch => {
		dispatch(createAction(FM_CREATE_FILE, { newFile }));
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

		dispatch(createAction(FM_DELETE_FILE, { toDeleteIndex }));
		dispatch(selectFile(toSelectAfterDelete));
	};
}

export function renameFile(fileKey, title) {
	fileManager.updateTitle(fileKey, title);
	return createAction(FM_RENAME_FILE, { fileKey, title });
}

export function enableRename(fileKey) {
	return createAction(FM_ENABLE_RENAME, { fileKey });
}

export function loadAllFromStorage() {
	const allFiles = sortFilesBySongTitle(fileManager.getAll());
	return dispatch => {
		dispatch(createAction(FM_LOAD_ALL_FILES, { allFiles }));
	};
}

export function updateFileContent(fileKey, content) {
	fileManager.updateContent(fileKey, content);
	return createAction(FM_UPDATE_FILE_CONTENT, { fileKey, content });
}

function sortFilesBySongTitle(allFiles) {
	return _sortBy(allFiles, o => (o.title || '').toLowerCase());
}
