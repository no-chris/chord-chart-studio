import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

let store;

export default {
	createStore(allReducers, initialState) {
		store = createStore(
			combineReducers(allReducers),
			initialState,
			compose(
				applyMiddleware(thunk),
				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
			)
		);
	},

	getStore() {
		return store;
	}
};
