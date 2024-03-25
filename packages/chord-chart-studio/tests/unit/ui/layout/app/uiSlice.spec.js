import deepFreeze from 'deep-freeze';
import dispatchThunk from '../../../helpers/dispatchThunk';

import reducers, {
	leftBarToggled,
	rightBarToggled,
	editorModeChanged,
	isLeftBarCollapsed,
	isRightBarCollapsed,
	getEditorMode,
} from '../../../../../src/ui/layout/app/reducers';

import * as dbActions from '../../../../../src/db/files/actions';

const initialState = deepFreeze(reducers(undefined, {}));

describe('ui: reducers', () => {
	describe('Unknown action', () => {
		test('should return un-mutated state', () => {
			const state = reducers(initialState, {});
			expect(state).toBe(initialState);
		});
	});

	describe('leftBarToggled / isLeftBarCollapsed', () => {
		test('should toggle left bar state', () => {
			expect(isLeftBarCollapsed({ ui: initialState })).toBe(false);

			const state1 = deepFreeze(reducers(initialState, leftBarToggled()));
			expect(isLeftBarCollapsed({ ui: state1 })).toBe(true);

			const state2 = deepFreeze(reducers(state1, leftBarToggled()));
			expect(isLeftBarCollapsed({ ui: state2 })).toBe(false);
		});
	});

	describe('rightBarToggled / isRightBarCollapsed', () => {
		test('should toggle right bar state', () => {
			expect(isRightBarCollapsed({ ui: initialState })).toBe(false);

			const state1 = deepFreeze(
				reducers(initialState, rightBarToggled())
			);
			expect(isRightBarCollapsed({ ui: state1 })).toBe(true);

			const state2 = deepFreeze(reducers(state1, rightBarToggled()));
			expect(isRightBarCollapsed({ ui: state2 })).toBe(false);
		});
	});

	describe('editorModeChanged / getEditorMode', () => {
		test('should set editorMode', async () => {
			expect(getEditorMode({ ui: initialState })).toBe('edit');

			const action = await dispatchThunk(
				{ fileManager: { selected: 'myId' } },
				() => editorModeChanged('myMode1')
			);
			const newState = reducers(initialState, action);
			expect(getEditorMode({ ui: newState })).toBe('myMode1');
		});

		test('should return selected file id', async () => {
			const action = await dispatchThunk(
				{ fileManager: { selected: 'myId' } },
				() => editorModeChanged('myMode1')
			);
			expect(action.payload.fileId).toBe('myId');
		});
	});

	describe('DB_FILES_CREATE', () => {
		test('should switch to edit mode when creating file', () => {
			const state = {
				editorMode: 'play',
			};

			const newState = reducers(
				state,
				dbActions.createFile('myFile', '')
			);
			expect(newState.editorMode).toBe('edit');
		});
	});

	describe('DB_FILES_DELETE', () => {
		test('should switch to edit mode when deleting file', () => {
			const state = {
				editorMode: 'play',
			};

			const newState = reducers(state, dbActions.deleteFile('myId'));
			expect(newState.editorMode).toBe('edit');
		});
	});

	describe('DB_FILES_IMPORT', () => {
		test('should switch to edit mode when deleting file', () => {
			const state = {
				editorMode: 'play',
			};

			const newState = reducers(
				state,
				dbActions.importFile('myFile', '')
			);
			expect(newState.editorMode).toBe('edit');
		});
	});
});
