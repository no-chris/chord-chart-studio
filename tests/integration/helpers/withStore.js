/**
 * Helpers functions to allow testing a redux-connected component with the real application store
 */

import { Provider } from 'react-redux';
import { createStore, getStore } from '../../../src/state/store';

import React from 'react';

export function resetStore() {
	localStorage.clear();
	createStore();
}

export function withStore(Container) {
	return (
		<Provider store={getStore()}>
			{Container}
		</Provider>
	);
}

export function getState() {
	return getStore().getState();
}

export function dispatch(action) {
	return getStore().dispatch(action);
}
