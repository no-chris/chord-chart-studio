jest.mock('../../../src/state/reducers');

import store  from '../../../src/state/store';
import reducers  from '../../../src/state/reducers';

describe('store', () => {
	test('Module', () => {
		expect(store).toBeInstanceOf(Object);
		expect(store.get).toBeInstanceOf(Function);
		expect(store.create).toBeInstanceOf(Function);
	});
});

beforeEach(() => {
	localStorage.clear();
	localStorage.setItem.mockClear();
	localStorage.getItem.mockClear();
	reducers.mockClear();
});

describe('localStorage persistence', () => {
	test('should read initial state from localStorage', () => {
		const state = {
			foo: {
				bar: {
					baz: 'foobarbaz'
				}
			}
		};
		localStorage.__STORE__.state = JSON.stringify(state);

		reducers.mockReturnValue(state);

		store.create();
		const reduxStore = store.get();

		expect(reduxStore.getState()).toEqual(state);
	});

	test('should save serialized state to localStorage', () => {
		const initialState = {};
		reducers.mockReturnValue(initialState);

		store.create();
		const reduxStore = store.get();

		const modifiedState = { foo: 'bar' };
		reducers.mockReturnValue(modifiedState);

		reduxStore.dispatch({ type: 'dummyAction' });

		expect(localStorage.__STORE__.state).toEqual(JSON.stringify(modifiedState));
	});


	test('should enable devTools', () => {
		window.__REDUX_DEVTOOLS_EXTENSION__ = jest.fn();

		store.create();

		expect(window.__REDUX_DEVTOOLS_EXTENSION__).toHaveBeenCalledTimes(1);
	});
});
