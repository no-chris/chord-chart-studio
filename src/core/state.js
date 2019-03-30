import { combineReducers, createStore } from 'redux';

let store;

export default {
	createStore(allReducers, initialState) {
		store = createStore(combineReducers(allReducers), initialState);
	},

	getStore() {
		return store;
	}
};
