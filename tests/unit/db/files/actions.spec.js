jest.mock('uuid');

import * as actions from '../../../../src/db/files/actions';
import * as actionTypes from '../../../../src/db/files/actionsTypes';

import uuid from 'uuid';

describe('db/files: actions creators', () => {

	describe('createFile()', () => {
		test('should create valid action', () => {
			uuid.v4.mockReturnValue('myUUID');

			const expected = {
				type: actionTypes.DB_FILES_CREATE,
				payload: {
					id: 'myUUID',
					title: 'myTitle',
					content: ''
				}
			};
			const actual = actions.createFile('myTitle');

			expect(actual).toEqual(expected);
		});

		test('should throw if not given title', () => {
			const throwingFn = () => actions.createFile();

			expect(throwingFn).toThrow(TypeError);
			expect(throwingFn).toThrow('Cannot create a file without title');
		});
	});


	describe('updateFile()', () => {
		test('should allow update of both title and content', () => {
			const expected = {
				type: actionTypes.DB_FILES_UPDATE,
				payload: {
					id: 'myUUID',
					title: 'myNewTitle',
					content: 'myNewContent'
				}
			};
			const actual = actions.updateFile('myUUID', {
				title: 'myNewTitle',
				content: 'myNewContent',
			});

			expect(actual).toEqual(expected);
		});

		test('should allow update of only title', () => {
			const expected = {
				type: actionTypes.DB_FILES_UPDATE,
				payload: {
					id: 'myUUID',
					title: 'myNewTitle',
				}
			};
			const actual = actions.updateFile('myUUID', {
				title: 'myNewTitle',
			});

			expect(actual).toEqual(expected);
		});

		test('should allow update of only content', () => {
			const expected = {
				type: actionTypes.DB_FILES_UPDATE,
				payload: {
					id: 'myUUID',
					content: 'myNewContent',
				}
			};
			const actual = actions.updateFile('myUUID', {
				content: 'myNewContent',
			});

			expect(actual).toEqual(expected);
		});

		test('should throw if given no id', () => {
			const throwingFn = () => actions.updateFile(undefined, {
				title: 'myNewTitle',
				content: 'myNewContent',
			});

			expect(throwingFn).toThrow(TypeError);
			expect(throwingFn).toThrow('Cannot update a file without an id');
		});
	});


	describe('deleteFile()', () => {
		test('should create valid action', () => {
			const expected = {
				type: actionTypes.DB_FILES_DELETE,
				payload: {
					id: 'myUUID'
				}
			};
			const actual = actions.deleteFile('myUUID');

			expect(actual).toEqual(expected);
		});
	});

});
