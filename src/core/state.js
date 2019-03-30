import { combineReducers, createStore } from 'redux';

let store;

export default {
	createStore(allReducers, initialState) {
		store = createStore(
			combineReducers(allReducers),
			initialState,
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
		);
	},

	getStore() {
		return store;
	}
};
