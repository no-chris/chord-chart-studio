import _defaultsDeep from 'lodash/defaultsDeep';

import { createStore, compose } from 'redux';

import { loadState, saveState } from './localStorage';
import allReducers from './reducers';
import seed from './seed';


let store;

export default {
	create() {
		const persistedState = loadState();
		const initialState = _defaultsDeep(persistedState, seed);

		store = createStore(
			allReducers,
			initialState,
			compose(
				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
			)
		);

		store.subscribe(() => {
			saveState(store.getState());
		});
	},

	get() {
		return store;
	}
};
