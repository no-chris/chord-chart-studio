import deepFreeze from 'deep-freeze';

import reducers from '../../../../../../src/ui/layout/app/_state/reducers';
import * as actions from '../../../../../../src/ui/layout/app/_state/actions';
import * as actionsTypes from '../../../../../../src/ui/layout/app/_state/actionsTypes';
import * as dbActions from '../../../../../../src/db/files/actions';
import * as dbActionsTypes from '../../../../../../src/db/files/actionsTypes';

const initialState = deepFreeze(reducers());

describe('ui/layout/app: reducers', () => {
	describe('Unknown action', () => {
		test('should return un-mutated state', () => {
			const state = reducers(initialState);
			expect(state).toBe(initialState);
		});
	});


	describe(actionsTypes.UI_LAYOUT_APP_CLOSE_MODAL, () => {
		test('should set the active modal to "none', () => {
			const state1 = deepFreeze(reducers(initialState, actions.closeModal()));
			expect(state1.activeModal).toBe('none');
		});
	});


	describe(actionsTypes.UI_LAYOUT_APP_OPEN_MODAL, () => {
		test('should set the active modal', () => {
			const state1 = deepFreeze(reducers(initialState, actions.openModal('myModal')));
			expect(state1.activeModal).toBe('myModal');
		});
	});


	describe(actionsTypes.UI_LAYOUT_APP_TOGGLE_LEFT_BAR, () => {
		test('should toggle left bar state', () => {
			const state1 = deepFreeze(
				reducers(initialState, actions.toggleLeftBar())
			);
			expect(state1.isLeftBarCollapsed).toBe(
				!initialState.isLeftBarCollapsed
			);

			const state2 = deepFreeze(
				reducers(state1, actions.toggleLeftBar())
			);
			expect(state2.isLeftBarCollapsed).toBe(
				!!initialState.isLeftBarCollapsed
			);
		});
	});

	describe(actionsTypes.UI_LAYOUT_APP_TOGGLE_RIGHT_BAR, () => {
		test('should toggle right bar state', () => {
			const state1 = deepFreeze(
				reducers(initialState, actions.toggleRightBar())
			);
			expect(state1.isRightBarCollapsed).toBe(
				!initialState.isRightBarCollapsed
			);

			const state2 = deepFreeze(
				reducers(state1, actions.toggleRightBar())
			);
			expect(state2.isRightBarCollapsed).toBe(
				!!initialState.isRightBarCollapsed
			);
		});
	});

	describe(actionsTypes.UI_LAYOUT_APP_SET_EDITOR_MODE, () => {
		test('should set editorMode', () => {
			expect(initialState.editorMode).toBe('edit');

			const newState = reducers(
				initialState,
				actions.setEditorMode('myMode1')
			);
			expect(newState.editorMode).toBe('myMode1');
		});
	});

	describe(dbActionsTypes.DB_FILES_CREATE, () => {
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

	describe(dbActionsTypes.DB_FILES_DELETE, () => {
		test('should switch to edit mode when deleting file', () => {
			const state = {
				editorMode: 'play',
			};

			const newState = reducers(state, dbActions.deleteFile('myId'));
			expect(newState.editorMode).toBe('edit');
		});
	});

	describe(dbActionsTypes.DB_FILES_IMPORT, () => {
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
