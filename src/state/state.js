import _defaultsDeep from 'lodash/defaultsDeep';

import { createStore, applyMiddleware, compose } from 'redux';

import { loadState, saveState } from './localStorage';
import allReducers from './reducers';
import seed from './seed';


let store;

export default {
	createStore() {
		const persistedState = loadState();
		const initialState = _defaultsDeep(persistedState, seed);
		console.log(initialState);

		store = createStore(
			allReducers,
			initialState,
			compose(
				//applyMiddleware(thunk),
				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
			)
		);

		store.subscribe(() => {
			saveState(store.getState());
		});
	},

	getStore() {
		return store;
	}
};
