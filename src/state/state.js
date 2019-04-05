import { createStore, applyMiddleware, compose } from 'redux';

import { loadState, saveState } from './localStorage';
import allReducers from './reducers';


let store;

export default {
	createStore() {
		const persistedState = loadState();
		store = createStore(
			allReducers,
			persistedState,
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
