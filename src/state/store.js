import _defaultsDeep from 'lodash/defaultsDeep';

import { createStore as createReduxStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { loadState, saveState } from './localStorage';
import allReducers from './reducers';
import seed from './seed';

let store;

export function createStore() {
	const storeEnhancers = composeWithDevTools(
		applyMiddleware(thunkMiddleware)
	);

	const persistedState = loadState();
	const initialState = _defaultsDeep(persistedState, seed);

	store = createReduxStore(allReducers, initialState, storeEnhancers);

	store.subscribe(() => {
		saveState(store.getState());
	});
}

export function getStore() {
	return store;
}
