jest.mock('uuid');

import deepFreeze from 'deep-freeze';
import uuid from 'uuid';

import reducers from '../../../src/fileManager/reducers';
import * as fmActionsTypes from '../../../src/fileManager/actionsTypes';
import * as fmActions from '../../../src/fileManager/actions';
import * as dbFilesActionsTypes from '../../../src/db/files/actionsTypes';
import * as dbFilesActions from '../../../src/db/files/actions';

describe('fileManager: reducers', () => {
	const initialState = deepFreeze(reducers());

	describe('Unknown action', () => {
		test('should return un-mutated state', () => {
			const state = reducers(initialState);
			expect(state).toBe(initialState);
		});
	});


	describe(fmActionsTypes.FILE_MANAGER_SELECT_FILE, () => {
		test('should select given file and stop renaming', () => {
			const expected = {
				...initialState,
				selected: 'myId',
				renamed: ''
			};
			const state = reducers(initialState, fmActions.selectFile('myId'));
			expect(state).toEqual(expected);
		});

		test('should keep renaming if selected file is being renamed', () => {
			const expected = {
				...initialState,
				selected: 'myId',
				renamed: 'myId'
			};
			const state1 = deepFreeze({
				...initialState,
				renamed: 'myId'
			});
			const state = reducers(state1, fmActions.selectFile('myId'));
			expect(state).toEqual(expected);
		});
	});


	describe(fmActionsTypes.FILE_MANAGER_ENABLE_RENAME, () => {
		test('should select given file and start renaming', () => {
			const originalState = deepFreeze({
				...initialState,
				renamed: ''
			});
			const expected = {
				...initialState,
				renamed: 'myId'
			};
			const state = reducers(originalState, fmActions.enableRename('myId'));
			expect(state).toEqual(expected);
		});
	});


	describe(dbFilesActionsTypes.DB_FILES_CREATE, function () {
		test('should select and rename created file', () => {
			const expected = {
				...initialState,
				selected: 'myId',
				renamed: 'myId'
			};
			uuid.v4.mockReturnValue('myId');

			const state = reducers(initialState, dbFilesActions.createFile('myTitle'));
			expect(state).toEqual(expected);
		});
	});


	describe(dbFilesActionsTypes.DB_FILES_UPDATE, () => {
		test('should stop renaming file on update', () => {
			const originalState = deepFreeze({
				...initialState,
				selected: 'myId',
				renamed: 'myId'
			});
			const expected = {
				...originalState,
				renamed: ''
			};
			uuid.v4.mockReturnValue('myId');

			const state = reducers(originalState, dbFilesActions.updateFile('myId', { title: 'myNewTitle' }));
			expect(state).toEqual(expected);
		});
	});


	describe(dbFilesActionsTypes.DB_FILES_DELETE, () => {
		test('should de-select file and stop renaming it on delete', () => {
			const originalState = deepFreeze({
				...initialState,
				selected: 'myId',
				renamed: 'myId'
			});
			const expected = {
				...originalState,
				selected: '',
				renamed: ''
			};
			uuid.v4.mockReturnValue('myId');

			const state = reducers(originalState, dbFilesActions.deleteFile('myId'));
			expect(state).toEqual(expected);
		});
	});

});
