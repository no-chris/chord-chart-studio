/* eslint max-lines: off */
import deepFreeze from 'deep-freeze';

jest.mock('uuid');
jest.mock('../../../../src/core/clock');
jest.mock('../../../../src/ui/layout/app/_state/selectors');
jest.mock('../../../../src/fileManager/_state/selectors');

import reducers from '../../../../src/db/files/reducers';
import * as actions from '../../../../src/db/files/actions';
import * as actionTypes from '../../../../src/db/files/actionsTypes';
import { setOptionValue } from '../../../../src/db/options/actions';
import { DB_OPTION_SET_OPTION_VALUE } from '../../../../src/db/options/actionsTypes';

import { v4 as uuidv4 } from 'uuid';
import clock from '../../../../src/core/clock';
import { getEditorMode } from '../../../../src/ui/layout/app/_state/selectors';
import { getSelectedId } from '../../../../src/fileManager/_state/selectors';
import { UI_LAYOUT_APP_SET_EDITOR_MODE } from '../../../../src/ui/layout/app/_state/actionsTypes';
import { setEditorMode } from '../../../../src/ui/layout/app/_state/actions';

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
				},
			};

			uuidv4.mockReturnValue('myUUID1');
			const state1 = deepFreeze(
				reducers(initialState, actions.createFile('myTitle1'))
			);

			uuidv4.mockReturnValue('myUUID2');
			const state2 = reducers(state1, actions.createFile('myTitle2'));

			expect(state2).toEqual(expected);
		});
	});

	describe(actionTypes.DB_FILES_IMPORT, () => {
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

			const action = actions.importFile('myTitle');
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
				reducers(initialState, actions.importFile('myTitle1'))
			);

			uuidv4.mockReturnValue('myUUID2');
			const state2 = reducers(state1, actions.importFile('myTitle2'));

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
				},
			};
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = reducers(
				state1,
				actions.updateFile('myUUID', {
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
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = reducers(
				state1,
				actions.updateFile('myUUID', {
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
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = reducers(
				state1,
				actions.updateFile('myUUID', {
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
				reducers(
					initialState,
					actions.createFile('myTitle', 'myContent')
				)
			);
			expect(state1).toEqual(expected1);

			const state2 = reducers(
				state1,
				actions.updateFile('myUUID', {
					content: '',
				})
			);

			expect(state2).toEqual(expected2);
		});

		test('should return same state if given invalid id', () => {
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = reducers(
				state1,
				actions.updateFile('idontexist', { title: 'myNewTitle' })
			);

			expect(state2).toBe(state1);
		});

		test('should return same state if given no title or content', () => {
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = reducers(state1, actions.updateFile('myUUID'));

			expect(state2).toBe(state1);
		});
	});

	describe(actionTypes.DB_FILES_DELETE, () => {
		test('should allow to delete a file', () => {
			const expected = {
				allFiles: {},
			};
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = reducers(state1, actions.deleteFile('myUUID'));

			expect(state2).toEqual(expected);
		});

		test('returns unmodified state if given no id', () => {
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = reducers(state1, actions.deleteFile());

			expect(state2).toBe(state1);
		});

		test('returns unmodified state if given inexistant id', () => {
			uuidv4.mockReturnValue('myUUID');
			const state1 = deepFreeze(
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = reducers(state1, actions.deleteFile('idontexist'));

			expect(state2).toBe(state1);
		});
	});

	describe(DB_OPTION_SET_OPTION_VALUE, () => {
		const fileId = 'myUUID';

		beforeEach(() => {
			uuidv4.mockReturnValue(fileId);
			clock.mockReturnValue('now');
		});

		test('should return the same state if no fileId is found', () => {
			getEditorMode.mockReturnValue('edit');
			getSelectedId.mockReturnValue('idontexist');

			const state1 = deepFreeze(
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = reducers(
				state1,
				setOptionValue('songFormatting', 'harmonizeAccidentals', true)
			);

			expect(state2).toBe(state1);
		});

		test('should update a value in the file preferences', () => {
			getEditorMode.mockReturnValue('edit');
			getSelectedId.mockReturnValue(fileId);

			const expected1 = {
				allFiles: {
					[fileId]: {
						id: fileId,
						title: 'myTitle',
						content: '',
						options: {
							preferences: {
								updatedAt: 'now',
								harmonizeAccidentals: true,
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
								harmonizeAccidentals: false,
							},
						},
					},
				},
			};
			const state1 = deepFreeze(
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = reducers(
				state1,
				setOptionValue('songPreferences', 'harmonizeAccidentals', true)
			);
			expect(state2).toEqual(expected1);

			clock.mockReturnValue('later');

			const state3 = reducers(
				state2,
				setOptionValue('songPreferences', 'harmonizeAccidentals', false)
			);

			expect(state3).toEqual(expected2);
		});

		test('should set different options in the same category', () => {
			getEditorMode.mockReturnValue('screen');
			getSelectedId.mockReturnValue(fileId);

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
								columnBreakOnParagraph: true,
							},
						},
					},
				},
			};

			const state1 = deepFreeze(
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = deepFreeze(
				reducers(
					state1,
					setOptionValue('songFormatting', 'chartFormat', 'chordPro')
				)
			);
			clock.mockReturnValue('later');

			const state3 = deepFreeze(
				reducers(
					state2,
					setOptionValue('songFormatting', 'columnsCount', 4)
				)
			);
			clock.mockReturnValue('even-later');
			getEditorMode.mockReturnValue('screen');

			const state4 = deepFreeze(
				reducers(
					state3,
					setOptionValue(
						'songFormatting',
						'columnBreakOnParagraph',
						true
					)
				)
			);
			expect(state4).toEqual(expected1);
		});

		test('should add formatting options for Editor mode value', () => {
			getEditorMode.mockReturnValue('edit');
			getSelectedId.mockReturnValue(fileId);

			const expected = {
				allFiles: {
					[fileId]: {
						id: fileId,
						title: 'myTitle',
						content: '',
						options: {
							preferences: {
								updatedAt: 'now',
								harmonizeAccidentals: true,
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
				reducers(initialState, actions.createFile('myTitle'))
			);
			const state2 = deepFreeze(
				reducers(
					state1,
					setOptionValue(
						'songPreferences',
						'harmonizeAccidentals',
						true
					)
				)
			);
			clock.mockReturnValue('later');

			const state3 = deepFreeze(
				reducers(
					state2,
					setOptionValue('songFormatting', 'chartFormat', 'chordmark')
				)
			);
			clock.mockReturnValue('even-later');
			getEditorMode.mockReturnValue('screen');

			const state4 = deepFreeze(
				reducers(
					state3,
					setOptionValue('songFormatting', 'chartFormat', 'chordPro')
				)
			);
			clock.mockReturnValue('even-even-later');
			getEditorMode.mockReturnValue('print');

			const state5 = deepFreeze(
				reducers(
					state4,
					setOptionValue(
						'songFormatting',
						'chartFormat',
						'ultimateGuitar'
					)
				)
			);
			expect(state5).toEqual(expected);
		});
	});

	describe(UI_LAYOUT_APP_SET_EDITOR_MODE, () => {
		const fileId = 'myUUID';

		test('should copy only relevant options from source mode to destination mode', () => {
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
				},
			};

			clock.mockReturnValue('now');
			getSelectedId.mockReturnValue(fileId);
			getEditorMode.mockReturnValue('print');

			const result = reducers(
				state.db.files,
				setEditorMode('play'),
				state
			);

			expect(result.allFiles[fileId].options.play).toBeDefined();
			expect(result.allFiles[fileId].options.play.updatedAt).toBe('now');
			expect(result.allFiles[fileId].options.play.columnsCount).toBe(3);
			expect(
				result.allFiles[fileId].options.play.documentMargins
			).not.toBeDefined();
		});

		test('should not copy anything if destination mode already have options', () => {
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
				},
			};

			clock.mockReturnValue('now');
			getSelectedId.mockReturnValue(fileId);
			getEditorMode.mockReturnValue('print');

			const result = reducers(
				state.db.files,
				setEditorMode('play'),
				state
			);

			expect(result.allFiles[fileId].options.play).toBeDefined();
			expect(result.allFiles[fileId].options.play.updatedAt).toBe(200);
			expect(result.allFiles[fileId].options.play.columnsCount).toBe(4);
			expect(
				result.allFiles[fileId].options.play.documentMargins
			).not.toBeDefined();
		});

		test('should get the latest defined options if previous mode does not have anything defined', () => {
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
				},
			};

			clock.mockReturnValue('now');
			getSelectedId.mockReturnValue(fileId);
			getEditorMode.mockReturnValue('edit');

			const result = reducers(
				state.db.files,
				setEditorMode('export'),
				state
			);

			const fileOptions = result.allFiles[fileId].options;
			expect(fileOptions.export).toBeDefined();
			expect(fileOptions.export.updatedAt).toBe('now');
			expect(fileOptions.export.alignBars).toBe('2');
			expect(fileOptions.export.autoRepeatChords).toBe('1');
		});

		test('should not copy anything if no mode already have options', () => {
			const state = {
				db: {
					files: {
						allFiles: {
							[fileId]: {
								options: {},
							},
						},
					},
				},
			};

			getSelectedId.mockReturnValue(fileId);
			getEditorMode.mockReturnValue('print');

			const result = reducers(
				state.db.files,
				setEditorMode('play'),
				state
			);

			expect(result.allFiles[fileId].options.print).not.toBeDefined();
			expect(result.allFiles[fileId].options.play).not.toBeDefined();
		});
	});
});
