import { loadState, saveState } from '../../../src/state/localStorage';

describe('localStorage', () => {
	test('Module', () => {
		expect(loadState).toBeInstanceOf(Function);
		expect(saveState).toBeInstanceOf(Function);
	});
});

beforeEach(() => {
	localStorage.clear();
	localStorage.setItem.mockClear();
	localStorage.getItem.mockClear();
});

describe('saveState()', () => {
	test('should save serialized state to local storage', () => {
		const state = {
			foo: {
				bar: {
					baz: 'foobarbaz',
				},
			},
		};
		const serializedState = JSON.stringify(state);
		saveState(state);

		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(localStorage.setItem).toHaveBeenCalledWith(
			'state',
			serializedState
		);
		expect(localStorage.__STORE__.state).toEqual(serializedState);
	});

	test('should silently fail in case of write error', () => {
		localStorage.setItem.mockImplementation(() => {
			throw new Error();
		});

		saveState({});
	});
});

describe('loadState()', () => {
	test('should load unserialized state from local storage', () => {
		const state = {
			foo: {
				bar: {
					baz: 'foobarbaz',
				},
			},
		};
		localStorage.__STORE__.state = JSON.stringify(state);

		expect(loadState()).toEqual(state);
		expect(localStorage.getItem).toHaveBeenCalledTimes(1);
		expect(localStorage.getItem).toHaveBeenCalledWith('state');
	});

	test('should return undefined if state is not present in store', () => {
		expect(loadState()).toBeUndefined();
	});

	test('should return undefined in case of localStorage error', () => {
		localStorage.getItem.mockImplementation(() => {
			throw new Error();
		});

		expect(loadState()).toBeUndefined();
	});
});
