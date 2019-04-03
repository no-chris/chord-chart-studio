import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

let store;

import fileManager from './fileManager/reducers';
import ui from './ui/reducers';

export default {
	createStore(allReducers, initialState) {
		store = createStore(
			combineReducers({
				fileManager,
				ui
			}),
			initialState,
			compose(
				applyMiddleware(thunk),
				window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
			)
		);
	},

	getStore() {
		return store;
	}
};
