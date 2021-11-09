jest.mock('../../../../src/ui/layout/app/_state/selectors');
jest.mock('../../../../src/fileManager/_state/selectors');
jest.mock('../../../../src/db/options/selectors');

import deepFreeze from 'deep-freeze';

import reducers from '../../../../src/db/options/reducers';
import * as actions from '../../../../src/db/options/actions';
import * as actionTypes from '../../../../src/db/options/actionsTypes';

import { setEditorMode } from '../../../../src/ui/layout/app/_state/actions';
import { UI_LAYOUT_APP_SET_EDITOR_MODE } from '../../../../src/ui/layout/app/_state/actionsTypes';

import { getSelectedId } from '../../../../src/fileManager/_state/selectors';
import { getOptionsDefaults } from '../../../../src/db/options/selectors';

describe('db/options: reducers', () => {
	const initialState = deepFreeze(reducers());

	describe('Unknown action', () => {
		test('should return un-mutated state', () => {
			const state = reducers(initialState);
			expect(state).toBe(initialState);
		});
	});

	describe(actionTypes.DB_OPTION_SET_OPTION_VALUE, () => {
		const startState = deepFreeze({
			rendering: {
				values: {
					transposeValue: 0,
				},
				default: {
					transposeValue: 0,
				},
			},
		});

		test('should allow to set an option value of an existing option', () => {
			const expected = {
				rendering: {
					values: {
						transposeValue: 3,
					},
					default: {
						transposeValue: 0,
					},
				},
			};

			const action = actions.setOptionValue(
				'rendering',
				'transposeValue',
				3
			);
			const actual = reducers(startState, action);

			expect(actual).toEqual(expected);
		});

		test('should fail silently if trying to set a value of an non existing context', () => {
			const action = actions.setOptionValue('newContext', 'newOption', 3);
			const actual = reducers(startState, action);

			expect(actual).toBe(startState);
		});

		test('should fail silently if trying to set a value of an non existing option', () => {
			const action = actions.setOptionValue('rendering', 'newOption', 3);
			const actual = reducers(startState, action);

			expect(actual).toBe(startState);
		});
	});

	describe(UI_LAYOUT_APP_SET_EDITOR_MODE, () => {
		const fileId = 'myUUID';
		const defaultFormattingOptions = {
			documentSize: 'a4',
			documentMargins: '3',
			columnsCount: '1',
			columnBreakOnParagraph: true,
		};

		test('should apply options of previous mode if there are no saved options for next mode', () => {
			const previousMode = 'edit';
			const nextMode = 'print';
			getSelectedId.mockReturnValue(fileId);
			getOptionsDefaults.mockReturnValue(defaultFormattingOptions);

			const fullState = {
				db: {
					files: {
						allFiles: {
							[fileId]: {
								options: {
									[previousMode]: {
										updatedAt: '6969',
										documentSize: 'a2',
										columnsCount: 2,
									},
								},
							},
						},
					},
				},
			};
			const expected = {
				songFormatting: {
					values: {
						...defaultFormattingOptions,
						documentSize: 'a2',
						columnsCount: 2,
					},
				},
			};
			const state = reducers(
				initialState,
				setEditorMode(nextMode),
				fullState
			);
			expect(state).toEqual(expected);
		});

		test('should apply options of next mode if they are defined', () => {
			const previousMode = 'edit';
			const nextMode = 'print';
			getSelectedId.mockReturnValue(fileId);
			getOptionsDefaults.mockReturnValue(defaultFormattingOptions);

			const fullState = {
				db: {
					files: {
						allFiles: {
							[fileId]: {
								options: {
									[previousMode]: {
										updatedAt: '6969',
										documentSize: 'a2',
										columnsCount: 2,
									},
									[nextMode]: {
										updatedAt: '6969',
										documentSize: 'a3',
										columnsCount: 3,
									},
								},
							},
						},
					},
				},
			};
			const expected = {
				songFormatting: {
					values: {
						...defaultFormattingOptions,
						documentSize: 'a3',
						columnsCount: 3,
					},
				},
			};
			const state = reducers(
				initialState,
				setEditorMode(nextMode),
				fullState
			);
			expect(state).toEqual(expected);
		});

		test('should apply latest defined options if no options are available for previous or next mode', () => {
			const nextMode = 'export';
			getSelectedId.mockReturnValue(fileId);
			getOptionsDefaults.mockReturnValue(defaultFormattingOptions);

			const fullState = {
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
										expandSectionRepeats: '1',
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
			const expected = {
				songFormatting: {
					values: {
						...defaultFormattingOptions,
						alignBars: '2',
						expandSectionRepeats: '1',
					},
				},
			};
			const state = reducers(
				initialState,
				setEditorMode(nextMode),
				fullState
			);
			expect(state).toEqual(expected);
		});
	});
});
