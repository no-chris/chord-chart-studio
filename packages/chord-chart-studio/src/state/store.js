import _defaultsDeep from 'lodash/defaultsDeep';

import { configureStore } from '@reduxjs/toolkit';

import { loadState, saveState } from './localStorage';
import allReducers from './reducers';
import seed from './seed';

let store;

export function createStore() {
	const persistedState = loadState();

	// store migrations
	if (persistedState && persistedState.db && persistedState.db.options) {
		delete persistedState.db.options.rendering; // remove old options before the options refactor in v0.9.0
	}

	/* Reset all options * /
	Object.keys(persistedState.db.files.allFiles).forEach((fileId) => {
		delete persistedState.db.files.allFiles[fileId].options;
	});
	delete persistedState.db.options;
	/**/
	/* misc * /
	delete persistedState.songImporter;
	delete persistedState.fileManager.selected;
	/**/

	const initialState = _defaultsDeep(persistedState, seed);

	store = configureStore({
		reducer: allReducers,
		preloadedState: initialState,
	});

	store.subscribe(() => {
		saveState(store.getState());
	});
}

export function getStore() {
	return store;
}
