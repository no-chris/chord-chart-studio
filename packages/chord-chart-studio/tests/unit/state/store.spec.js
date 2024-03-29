jest.mock('../../../src/state/reducers');

import { createStore, getStore } from '../../../src/state/store';
import reducers from '../../../src/state/reducers';

describe('store', () => {
	test('Module', () => {
		expect(createStore).toBeInstanceOf(Function);
		expect(getStore).toBeInstanceOf(Function);
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
					baz: 'foobarbaz',
				},
			},
		};
		localStorage.__STORE__.state = JSON.stringify(state);

		reducers.mockReturnValue(state);

		createStore();
		const reduxStore = getStore();

		expect(reduxStore.getState()).toEqual(state);
	});

	test('should save serialized state to localStorage', () => {
		const initialState = {};
		reducers.mockReturnValue(initialState);

		createStore();
		const reduxStore = getStore();

		const modifiedState = { foo: 'bar' };
		reducers.mockReturnValue(modifiedState);

		reduxStore.dispatch({ type: 'dummyAction' });

		expect(localStorage.__STORE__.state).toEqual(
			JSON.stringify(modifiedState)
		);
	});
});

describe.each([
	/* */
	['non existant store', undefined],
	['empty object', {}],
	['empty db', { db: {} }],
	['empty option', { db: { options: {} } }],
	['with rendering options', { db: { options: { rendering: {} } } }],
	/**/
])('migration: %s', (title, state) => {
	test('should remove rendering options', () => {
		localStorage.__STORE__.state = JSON.stringify(state);

		reducers.mockImplementation((initialState) => initialState);

		createStore();
		const actualState = getStore().getState();

		expect(actualState.db.options.rendering).toBeUndefined();
	});
});
