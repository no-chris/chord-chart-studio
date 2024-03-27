/* eslint max-lines: off */
import deepFreeze from 'deep-freeze';
import dispatchThunk from '../../helpers/dispatchThunk';

jest.mock('uuid');
jest.mock('../../../../src/core/clock');

import { v4 as uuidv4 } from 'uuid';
import clock from '../../../../src/core/clock';

import reducers, {
	fileCreated,
	fileImported,
	fileUpdated,
	fileDeleted,
} from '../../../../src/db/files/filesSlice';

import { editorModeChanged } from '../../../../src/ui/layout/app/uiSlice';
import { optionValueChanged } from '../../../../src/db/options/optionsSlice';

describe('db/files: reducers', () => {
	const initialState = deepFreeze(reducers(undefined, {}));

	describe('Unknown action', () => {
		test('should return un-mutated state', () => {
			const state = reducers(initialState, {});
			expect(state).toBe(initialState);
		});
	});

	describe('files/fileCreated', () => {
		test('should create a new file on a empty list', () => {
			uuidv4.mockReturnValue('myUUID');

			const expected = {
				allFiles: {
					myUUID: {
						id: 'myUUID',
						title: 'myTitle',
						content: '',
					},
				},
			};

			const action = fileCreated('myTitle');
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
						content: 'myContent2',
					},
				},
			};

			uuidv4.mockReturnValue('myUUID1');
			const state1 = deepFreeze(
				reducers(initialState, fileCreated('myTitle1'))
			);

			uuidv4.mockReturnValue('myUUID2');
			const state2 = reducers(
				state1,
				fileCreated('myTitle2', 'myContent2')
			);

			expect(state2).toEqual(expected);
		});
	});

	describe('files/fileImported', () => {
		test('should import a new file on a empty list', () => {
			uuidv4.mockReturnValue('myUUID');

			const expected = {
				allFiles: {
					myUUID: {
						id: 'myUUID',
						title: 'myTitle',
						content: '',
					},
				},
			};

			const action = fileImported('myTitle');
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
				},
			};

			uuidv4.mockReturnValue('myUUID1');
			const state1 = deepFreeze(
				reducers(initialState, fileImported('myTitle1'))
			);

			uuidv4.mockReturnValue('myUUID2');
			const state2 = reducers(state1, fileImported('myTitle2'));

			expect(state2).toEqual(expected);
		});
	});

	describe('files/fileUpdated', () => {
		test('should update both title and content', () => {
			const expected = {
				allFiles: {
					myUUID: {
						id: 'myUUID',
						title: 'myNewTitle',
						content: 'myNewContent',
					},
				},
			};
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, fileCreated('myTitle'))
			);
			const state2 = reducers(
				state1,
				fileUpdated('myUUID', {
					title: 'myNewTitle',
					content: 'myNewContent',
				})
			);

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
				},
			};
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, fileCreated('myTitle'))
			);
			const state2 = reducers(
				state1,
				fileUpdated('myUUID', {
					title: 'myNewTitle',
				})
			);

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
				},
			};
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, fileCreated('myTitle'))
			);
			const state2 = reducers(
				state1,
				fileUpdated('myUUID', {
					content: 'myNewContent',
				})
			);

			expect(state2).toEqual(expected);
		});

		test('should allow to clear the content', () => {
			const expected1 = {
				allFiles: {
					myUUID: {
						id: 'myUUID',
						title: 'myTitle',
						content: 'myContent',
					},
				},
			};
			const expected2 = {
				allFiles: {
					myUUID: {
						id: 'myUUID',
						title: 'myTitle',
						content: '',
					},
				},
			};
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, fileCreated('myTitle', 'myContent'))
			);
			expect(state1).toEqual(expected1);

			const state2 = reducers(
				state1,
				fileUpdated('myUUID', {
					content: '',
				})
			);

			expect(state2).toEqual(expected2);
		});

		test('should return same state if given invalid id', () => {
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, fileCreated('myTitle'))
			);
			const state2 = reducers(
				state1,
				fileUpdated('idontexist', { title: 'myNewTitle' })
			);

			expect(state2).toBe(state1);
		});

		test('should return same state if given no title or content', () => {
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, fileCreated('myTitle'))
			);
			const state2 = reducers(state1, fileUpdated('myUUID'));

			expect(state2).toBe(state1);
		});
	});

	describe('files/fileCreated', () => {
		test('should allow to delete a file', () => {
			const expected = {
				allFiles: {},
			};
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, fileCreated('myTitle'))
			);
			const state2 = reducers(state1, fileDeleted('myUUID'));

			expect(state2).toEqual(expected);
		});

		test('returns unmodified state if given no id', () => {
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, fileCreated('myTitle'))
			);
			const state2 = reducers(state1, fileDeleted());

			expect(state2).toBe(state1);
		});

		test('returns unmodified state if given inexistant id', () => {
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, fileCreated('myTitle'))
			);
			const state2 = reducers(state1, fileDeleted('idontexist'));

			expect(state2).toBe(state1);
		});
	});

	describe('options/optionValueChanged', () => {
		const fileId = 'myUUID';

		beforeEach(() => {
			uuidv4.mockReturnValue(fileId);
			clock.mockReturnValue('now');
		});

		test('should return the same state if no fileId is found', async () => {
			const state1 = deepFreeze(
				reducers(initialState, fileCreated('myTitle'))
			);
			const action = await dispatchThunk(state1, () =>
				optionValueChanged({
					context: 'songFormatting',
					key: 'transposeValue',
					value: 5,
				})
			);
			const state2 = reducers(state1, action);

			expect(state2).toBe(state1);
		});

		test('should update a value in the file preferences', async () => {
			const startState = {
				...initialState,
				ui: { editorMode: 'edit' },
				fileManager: { selected: fileId },
			};

			const expected1 = {
				allFiles: {
					[fileId]: {
						id: fileId,
						title: 'myTitle',
						content: '',
						options: {
							preferences: {
								updatedAt: 'now',
								transposeValue: 2,
							},
						},
					},
				},
			};

			const expected2 = {
				allFiles: {
					[fileId]: {
						id: fileId,
						title: 'myTitle',
						content: '',
						options: {
							preferences: {
								updatedAt: 'later',
								transposeValue: 5,
							},
						},
					},
				},
			};
			const state1 = deepFreeze(
				reducers(startState, fileCreated('myTitle'))
			);

			let action = await dispatchThunk(state1, () =>
				optionValueChanged({
					context: 'songPreferences',
					key: 'transposeValue',
					value: 2,
				})
			);
			const state2 = reducers(state1, action);
			expect(state2.allFiles).toEqual(expected1.allFiles);

			clock.mockReturnValue('later');

			action = await dispatchThunk(state1, () =>
				optionValueChanged({
					context: 'songPreferences',
					key: 'transposeValue',
					value: 5,
				})
			);
			const state3 = reducers(state2, action);

			expect(state3.allFiles).toEqual(expected2.allFiles);
		});

		test('should set different options in the same category', async () => {
			const startState = {
				...initialState,
				ui: { editorMode: 'screen' },
				fileManager: { selected: fileId },
			};

			const expected1 = {
				allFiles: {
					[fileId]: {
						id: fileId,
						title: 'myTitle',
						content: '',
						options: {
							screen: {
								updatedAt: 'even-later',
								chartFormat: 'chordPro',
								columnsCount: 4,
								columnBreakOnSection: true,
							},
						},
					},
				},
			};

			const state1 = deepFreeze(
				reducers(startState, fileCreated('myTitle'))
			);
			let action = await dispatchThunk(state1, () =>
				optionValueChanged({
					context: 'songFormatting',
					key: 'chartFormat',
					value: 'chordPro',
				})
			);
			const state2 = deepFreeze(reducers(state1, action));
			clock.mockReturnValue('later');

			action = await dispatchThunk(state1, () =>
				optionValueChanged({
					context: 'songFormatting',
					key: 'columnsCount',
					value: 4,
				})
			);
			const state3 = deepFreeze(reducers(state2, action));
			clock.mockReturnValue('even-later');

			action = await dispatchThunk(state1, () =>
				optionValueChanged({
					context: 'songFormatting',
					key: 'columnBreakOnSection',
					value: true,
				})
			);
			const state4 = deepFreeze(reducers(state3, action));
			expect(state4.allFiles).toEqual(expected1.allFiles);
		});

		test('should add formatting options for Editor mode value', async () => {
			const startState = {
				...initialState,
				ui: { editorMode: 'edit' },
				fileManager: { selected: fileId },
			};

			const expected = {
				allFiles: {
					[fileId]: {
						id: fileId,
						title: 'myTitle',
						content: '',
						options: {
							preferences: {
								updatedAt: 'now',
								transposeValue: 5,
							},
							edit: {
								updatedAt: 'later',
								chartFormat: 'chordmark',
							},
							screen: {
								updatedAt: 'even-later',
								chartFormat: 'chordPro',
							},
							print: {
								updatedAt: 'even-even-later',
								chartFormat: 'ultimateGuitar',
							},
						},
					},
				},
			};

			const state1 = deepFreeze(
				reducers(startState, fileCreated('myTitle'))
			);

			let action = await dispatchThunk(state1, () =>
				optionValueChanged({
					context: 'songPreferences',
					key: 'transposeValue',
					value: 5,
				})
			);
			const state2 = deepFreeze(reducers(state1, action));
			clock.mockReturnValue('later');

			action = await dispatchThunk(state1, () =>
				optionValueChanged({
					context: 'songFormatting',
					key: 'chartFormat',
					value: 'chordmark',
				})
			);
			const state3 = deepFreeze(reducers(state2, action));

			clock.mockReturnValue('even-later');

			action = await dispatchThunk(
				{ ...state3, ui: { editorMode: 'screen' } },
				() =>
					optionValueChanged({
						context: 'songFormatting',
						key: 'chartFormat',
						value: 'chordPro',
					})
			);
			const state4 = deepFreeze(reducers(state3, action));

			clock.mockReturnValue('even-even-later');

			action = await dispatchThunk(
				{ ...state4, ui: { editorMode: 'print' } },
				() =>
					optionValueChanged({
						context: 'songFormatting',
						key: 'chartFormat',
						value: 'ultimateGuitar',
					})
			);
			const state5 = deepFreeze(reducers(state4, action));
			expect(state5.allFiles).toEqual(expected.allFiles);
		});
	});

	describe('ui/editorModeChanged', () => {
		const fileId = 'myUUID';

		const defaultFormattingOptions = {
			columnsCount: 1,
			chartType: 'all',
			alignChordsWithLyrics: true,
			alignBars: true,
			fontSize: 0,
			columnBreakOnSection: true,
			documentMargins: 3,
		};

		test('should copy only relevant options from source mode to destination mode', async () => {
			const state = {
				db: {
					files: {
						allFiles: {
							[fileId]: {
								options: {
									print: {
										updatedAt: 100,
										columnsCount: 3,
										documentMargins: 3, // <== should not be copied!
									},
								},
							},
						},
					},
					options: {
						songFormatting: {
							defaults: defaultFormattingOptions,
						},
					},
				},
				ui: { editorMode: 'print' },
				fileManager: { selected: fileId },
			};

			clock.mockReturnValue('now');

			const action = await dispatchThunk(state, () =>
				editorModeChanged('play')
			);
			const result = reducers(state.db.files, action);

			expect(result.allFiles[fileId].options.play).toBeDefined();
			expect(result.allFiles[fileId].options.play.updatedAt).toBe('now');
			expect(result.allFiles[fileId].options.play.columnsCount).toBe(3);
			expect(
				result.allFiles[fileId].options.play.documentMargins
			).not.toBeDefined();
		});

		test('should not copy anything if destination mode already have options', async () => {
			const state = {
				db: {
					files: {
						allFiles: {
							[fileId]: {
								options: {
									print: {
										updatedAt: 100,
										columnsCount: 3,
										documentMargins: 3,
									},
									play: {
										updatedAt: 200,
										columnsCount: 4,
									},
								},
							},
						},
					},
					options: {
						songFormatting: {
							defaults: defaultFormattingOptions,
						},
					},
				},
				ui: { editorMode: 'print' },
				fileManager: { selected: fileId },
			};

			clock.mockReturnValue('now');

			const result = reducers(
				state.db.files,
				await dispatchThunk(state, () => editorModeChanged('play'))
			);

			expect(result.allFiles[fileId].options.play).toBeDefined();
			expect(result.allFiles[fileId].options.play.updatedAt).toBe(200);
			expect(result.allFiles[fileId].options.play.columnsCount).toBe(4);
			expect(
				result.allFiles[fileId].options.play.documentMargins
			).not.toBeDefined();
		});

		test('should get the latest defined options if previous mode does not have anything defined', async () => {
			const state = {
				db: {
					files: {
						allFiles: {
							[fileId]: {
								options: {
									edit: {}, // <== current mode
									export: {}, // <== destination mode
									print: {
										updatedAt: 100,
										alignBars: '1',
										autoRepeatChords: '1',
									},
									play: {
										updatedAt: 200,
										alignBars: '2',
									},
								},
							},
						},
					},
					options: {
						songFormatting: {
							defaults: defaultFormattingOptions,
						},
					},
				},
				ui: { editorMode: 'edit' },
				fileManager: { selected: fileId },
			};

			clock.mockReturnValue('now');

			const result = reducers(
				state.db.files,
				await dispatchThunk(state, () => editorModeChanged('export'))
			);

			const fileOptions = result.allFiles[fileId].options;
			expect(fileOptions.export).toBeDefined();
			expect(fileOptions.export.updatedAt).toBe('now');
			expect(fileOptions.export.alignBars).toBe('2');
			expect(fileOptions.export.autoRepeatChords).toBe('1');
		});

		test('should not copy anything if no mode already have options', async () => {
			const state = {
				db: {
					files: {
						allFiles: {
							[fileId]: {
								options: {},
							},
						},
					},
					options: {
						songFormatting: {
							defaults: defaultFormattingOptions,
						},
					},
				},
				ui: { editorMode: 'print' },
				fileManager: { selected: fileId },
			};

			const result = reducers(
				state.db.files,
				await dispatchThunk(state, () => editorModeChanged('play'))
			);

			expect(result.allFiles[fileId].options.print).not.toBeDefined();
			expect(result.allFiles[fileId].options.play).not.toBeDefined();
		});
	});
});
