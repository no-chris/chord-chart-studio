import _defaultsDeep from 'lodash/defaultsDeep';

import { createStore as createReduxStore, compose } from 'redux';

import { loadState, saveState } from './localStorage';
import allReducers from './reducers';
import seed from './seed';

const storeEnhancers = [];

/* * /
import { applyMiddleware } from 'redux';
const logger = () => next => action => {
	console.log('!!! DISPATCHING ACTION: ', action);
	let result = next(action);
	return result;
};
storeEnhancers.push(applyMiddleware(logger));
/* */


let store;

export function createStore() {
	if (window.__REDUX_DEVTOOLS_EXTENSION__) {
		storeEnhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true }));
	}

	const persistedState = loadState();
	const initialState = _defaultsDeep(persistedState, seed);

	store = createReduxStore(
		allReducers,
		initialState,
		compose(...storeEnhancers)
	);

	store.subscribe(() => {
		saveState(store.getState());
	});
}

export function getStore() {
	return store;
}
