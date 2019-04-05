import * as actions from '../../../src/fileManager/actions';
import * as actionsTypes from '../../../src/fileManager/actionsTypes';

describe('fileManager/actions creators', () => {

	describe('selectFile()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.FILE_MANAGER_SELECT_FILE,
				payload: {
					id: 'myId'
				}
			};

			const actual = actions.selectFile('myId') ;

			expect(actual).toEqual(expected);
		});
	});

	describe('enableRename()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.FILE_MANAGER_ENABLE_RENAME,
				payload: {
					id: 'myId'
				}
			};

			const actual = actions.enableRename('myId') ;

			expect(actual).toEqual(expected);
		});
	});

});
