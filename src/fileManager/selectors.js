import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';

import { createSelectorCreator, defaultMemoize } from 'reselect';

// create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
	defaultMemoize,
	_isEqual
);

export function getAllFiles(state) {
	return state.fileManager.allFiles.map(({ key, title }) => ({ key, title }));
}

export const getAllFilesTitles = createDeepEqualSelector(
	getAllFiles,
	allFiles => allFiles
);

export function getSelectedFile(state) {
	return _find(state.fileManager.allFiles, o => o.key === state.fileManager.selected);
}

export function getSelectedFileKey(state) {
	return state.fileManager.selected;
}

export function getRenamedFileKey(state) {
	return state.fileManager.renamed;
}

export function getDefaultTitle(state) {
	return state.fileManager.defaultTitle;
}
