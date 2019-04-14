import deepFreeze from 'deep-freeze';

jest.mock('uuid');

import reducers from '../../../../src/db/files/reducers';
import * as actions from '../../../../src/db/files/actions';
import * as actionTypes from '../../../../src/db/files/actionsTypes';

import uuid from 'uuid';

describe('db/files: reducers', () => {

	const initialState = deepFreeze(reducers());

	describe('Unknown action', () => {
		test('should return un-mutated state', () => {
			const state = reducers(initialState);
			expect(state).toBe(initialState);
		});
	});

	describe(actionTypes.DB_FILES_CREATE, () => {
		test('should create a new file on a empty list', () => {
			uuid.v4.mockReturnValue('myUUID');

			const expected = {
				allFiles: {
					myUUID: {
						id: 'myUUID',
						title: 'myTitle',
						content: '',
					}
				}
			};

			const action = actions.createFile('myTitle');
			const actual = reducers(initialState, action);

			expect(actual).toEqual(expected);
		});

		test('should add to a list', () => {
			const expected = {
				allFiles: {
					myUUID1: {
						id: 'myUUID1',
						title: 'myTitle1',
						content: '',
					},
					myUUID2: {
						id: 'myUUID2',
						title: 'myTitle2',
						content: '',
					},
				}
			};

			uuid.v4.mockReturnValue('myUUID1');
			const state1 = deepFreeze(reducers(initialState, actions.createFile('myTitle1')));

			uuid.v4.mockReturnValue('myUUID2');
			const state2 = reducers(state1, actions.createFile('myTitle2'));

			expect(state2).toEqual(expected);
		});
	});

	describe(actionTypes.DB_FILES_UPDATE, () => {
		test('should update both title and content', () => {
			const expected = {
				allFiles: {
					myUUID: {
						id: 'myUUID',
						title: 'myNewTitle',
						content: 'myNewContent',
					},
				}
			};
			uuid.v4.mockReturnValue('myUUID');
			const state1 = deepFreeze(reducers(initialState, actions.createFile('myTitle')));
			const state2 = reducers(state1, actions.updateFile('myUUID', {
				title: 'myNewTitle',
				content: 'myNewContent'
			}));

			expect(state2).toEqual(expected);
		});

		test('should update title only', () => {
			const expected = {
				allFiles: {
					myUUID: {
						id: 'myUUID',
						title: 'myNewTitle',
						content: '',
					},
				}
			};
			uuid.v4.mockReturnValue('myUUID');
			const state1 = deepFreeze(reducers(initialState, actions.createFile('myTitle')));
			const state2 = reducers(state1, actions.updateFile('myUUID', {
				title: 'myNewTitle',
			}));

			expect(state2).toEqual(expected);
		});

		test('should update content only', () => {
			const expected = {
				allFiles: {
					myUUID: {
						id: 'myUUID',
						title: 'myTitle',
						content: 'myNewContent',
					},
				}
			};
			uuid.v4.mockReturnValue('myUUID');
			const state1 = deepFreeze(reducers(initialState, actions.createFile('myTitle')));
			const state2 = reducers(state1, actions.updateFile('myUUID', {
				content: 'myNewContent',
			}));

			expect(state2).toEqual(expected);
		});

		test('should return same state if given invalid id', () => {
			uuid.v4.mockReturnValue('myUUID');
			const state1 = deepFreeze(reducers(initialState, actions.createFile('myTitle')));
			const state2 = reducers(state1, actions.updateFile('idontexist', { title: 'myNewTitle' }));

			expect(state2).toBe(state1);
		});

		test('should return same state if given no title or content', () => {
			uuid.v4.mockReturnValue('myUUID');
			const state1 = deepFreeze(reducers(initialState, actions.createFile('myTitle')));
			const state2 = reducers(state1, actions.updateFile('myUUID'));

			expect(state2).toBe(state1);
		});
	});


	describe(actionTypes.DB_FILES_DELETE, () => {
		test('should allow to delete a file', () => {
			const expected = {
				allFiles: {}
			};
			uuid.v4.mockReturnValue('myUUID');
			const state1 = deepFreeze(reducers(initialState, actions.createFile('myTitle')));
			const state2 = reducers(state1, actions.deleteFile('myUUID'));

			expect(state2).toEqual(expected);
		});

		test('returns unmodified state if given no id', () => {
			uuid.v4.mockReturnValue('myUUID');
			const state1 = deepFreeze(reducers(initialState, actions.createFile('myTitle')));
			const state2 = reducers(state1, actions.deleteFile());

			expect(state2).toBe(state1);
		});

		test('returns unmodified state if given inexistant id', () => {
			uuid.v4.mockReturnValue('myUUID');
			const state1 = deepFreeze(reducers(initialState, actions.createFile('myTitle')));
			const state2 = reducers(state1, actions.deleteFile('idontexist'));

			expect(state2).toBe(state1);
		});
	});

});
