import * as actions from '../../../../src/songImporter/_state/actions';
import * as actionsTypes from '../../../../src/songImporter/_state/actionsTypes';

describe('songImporter: actions creators', () => {
	describe('setContent()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.SONG_IMPORTER_SET_CONTENT,
				payload: {
					content: 'myContent',
				},
			};

			const actual = actions.setContent('myContent');

			expect(actual).toEqual(expected);
		});
	});

	describe('setInputFormat()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.SONG_IMPORTER_SET_INPUT_FORMAT,
				payload: {
					inputFormat: 'ultimateGuitar',
				},
			};

			const actual = actions.setInputFormat('ultimateGuitar');

			expect(actual).toEqual(expected);
		});
	});

	describe('startImport()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.SONG_IMPORTER_IMPORT_START,
				payload: {
					isFromWeb: false,
				},
			};

			const actual = actions.startImport();

			expect(actual).toEqual(expected);
		});
	});

	describe('startImportFromWeb()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.SONG_IMPORTER_IMPORT_START,
				payload: {
					content: 'myContent',
					inputFormat: 'ultimateGuitar',
					title: 'myTitle',
					isFromWeb: true,
				},
			};

			const actual = actions.startImportFromWeb(
				'ultimateGuitar',
				'myContent',
				'myTitle'
			);

			expect(actual).toEqual(expected);
		});
	});

	describe('cancelImport()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.SONG_IMPORTER_IMPORT_CANCEL,
			};

			const actual = actions.cancelImport();

			expect(actual).toEqual(expected);
		});
	});
});
