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

	describe(actionTypes.SONG_IMPORTER_SET_INPUT_FORMAT, () => {
		test('should set the input format', () => {
			const expected = {
				...initialState,
				inputFormat: 'ultimateGuitar',
			};
			const state = reducers(
				initialState,
				actions.setInputFormat('ultimateGuitar')
			);
			expect(state).toEqual(expected);
		});
	});

	describe(actionTypes.SONG_IMPORTER_IMPORT_CANCEL, () => {
		test('should reset import state on cancel, except input format', () => {
			const startState = {
				...initialState,
				content: 'someContent',
				title: 'aTitle',
				isImporting: true,
				inputFormat: 'ultimateGuitar',
			};
			const expected = {
				...initialState,
				content: '',
				title: '',
				isImporting: false,
				inputFormat: 'ultimateGuitar',
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
				inputFormat: 'chordpro',
			};
			const expected = {
				...initialState,
				content: '',
				title: '',
				isImporting: false,
				inputFormat: 'chordpro',
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
				inputFormat: 'ultimateGuitar',
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
				inputFormat: 'ultimateGuitar',
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
				inputFormat: 'auto',
				isImporting: true,
				isFromWeb: false,
			};
			const state = reducers(initialState, actions.startImport());
			expect(state).toEqual(expected);
		});
	});
});
