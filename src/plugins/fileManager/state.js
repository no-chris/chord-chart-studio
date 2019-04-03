import _sortBy from 'lodash/sortBy';
import _findIndex from 'lodash/findIndex';

import createAction from '../../core/createAction';
import pluginId from './id';
import fileManagerFactory from '../../core/fileManager';

import { openSong } from '../../editor/playRenderer/state'; //fixme: this beaks plugin encapsulation


const fileManager = fileManagerFactory;

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





/**
 * ==============
 * REDUCERS
 * ==============
 */



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
