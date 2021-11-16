import deepFreeze from 'deep-freeze';

import reducers from '../../../../src/songImporter/_state/reducers';
import * as actions from '../../../../src/songImporter/_state/actions';
import * as actionTypes from '../../../../src/songImporter/_state/actionsTypes';

import { importFile } from '../../../../src/db/files/actions';

describe('songImporter: reducers', () => {
	const initialState = deepFreeze(reducers());

	describe('Unknown action', () => {
		test('should return un-mutated state', () => {
			const state = reducers(initialState);
			expect(state).toBe(initialState);
		});
	});

	describe(actionTypes.SONG_IMPORTER_SET_CONTENT, () => {
		test('should set the input content and title', () => {
			const expected = {
				...initialState,
				content: 'myContent',
				title: 'myTitle',
			};
			const state = reducers(
				initialState,
				actions.setContent('myContent', 'myTitle')
			);
			expect(state).toEqual(expected);
		});

		test('should revert to empty title if not given', () => {
			const expected = {
				...initialState,
				content: 'myContent',
				title: '',
			};
			const state = reducers(
				initialState,
				actions.setContent('myContent')
			);
			expect(state).toEqual(expected);
		});

		test('should strip tags from content and title', () => {
			const expected = {
				...initialState,
				content: 'myContent',
				title: 'myTitle',
			};
			const state = reducers(
				initialState,
				actions.setContent(
					'<b>myContent</b>',
					'<strong>myTitle</strong>'
				)
			);
			expect(state).toEqual(expected);
		});
	});

	describe(actionTypes.SONG_IMPORTER_SET_SOURCE_TYPE, () => {
		test('should set the input source type', () => {
			const expected = {
				...initialState,
				sourceType: 'ultimateGuitar',
			};
			const state = reducers(
				initialState,
				actions.setSourceType('ultimateGuitar')
			);
			expect(state).toEqual(expected);
		});
	});

	describe(actionTypes.SONG_IMPORTER_IMPORT_CANCEL, () => {
		test('should reset import state on cancel, except source type', () => {
			const startState = {
				...initialState,
				content: 'someContent',
				title: 'aTitle',
				isImporting: true,
				sourceType: 'ultimateGuitar',
			};
			const expected = {
				...initialState,
				content: '',
				title: '',
				isImporting: false,
				sourceType: 'ultimateGuitar',
			};
			const state = reducers(startState, actions.cancelImport());
			expect(state).toEqual(expected);
		});

		test('should reset import state on actual file import', () => {
			const startState = {
				...initialState,
				content: 'someContent',
				title: 'aTitle',
				isImporting: true,
				sourceType: 'chordpro',
			};
			const expected = {
				...initialState,
				content: '',
				title: '',
				isImporting: false,
				sourceType: 'chordpro',
			};
			const state = reducers(
				startState,
				importFile('myTitle', 'myContent')
			);
			expect(state).toEqual(expected);
		});

		test('should properly set import state on start import when all parameters are given', () => {
			const expected = {
				...initialState,
				content: 'someContent',
				title: 'aTitle',
				sourceType: 'ultimateGuitar',
				isImporting: true,
				isFromWeb: true,
			};
			const state = reducers(
				initialState,
				actions.startImportFromWeb(
					'ultimateGuitar',
					'someContent',
					'aTitle'
				)
			);
			expect(state).toEqual(expected);
		});

		test('should strip tags from content and title', () => {
			const expected = {
				...initialState,
				content: 'myContent',
				title: 'myTitle',
				sourceType: 'ultimateGuitar',
				isImporting: true,
				isFromWeb: true,
			};

			const state = reducers(
				initialState,
				actions.startImportFromWeb(
					'ultimateGuitar',
					'<b>myContent</b>',
					'<strong>myTitle</strong>'
				)
			);
			expect(state).toEqual(expected);
		});

		test('should set default values on start import when missing or empty parameters', () => {
			const expected = {
				...initialState,
				content: '',
				title: '',
				sourceType: 'basic',
				isImporting: true,
				isFromWeb: false,
			};
			const state = reducers(initialState, actions.startImport());
			expect(state).toEqual(expected);
		});
	});
});
