import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

let store;

export default {
	createStore(allReducers, initialState) {
		store = createStore(
			reducers,
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
