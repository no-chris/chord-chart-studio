import * as actions from '../../../../../../src/ui/layout/app/_state/actions';
import * as actionsTypes from '../../../../../../src/ui/layout/app/_state/actionsTypes';

describe('ui/layout/app: actions creators', () => {

	describe('closeModal()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.UI_LAYOUT_APP_CLOSE_MODAL,
			};

			const actual = actions.closeModal() ;

			expect(actual).toEqual(expected);
		});
	});

	describe('openModal()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.UI_LAYOUT_APP_OPEN_MODAL,
				payload: {
					modalId: 'myModal'
				}
			};

			const actual = actions.openModal('myModal') ;

			expect(actual).toEqual(expected);
		});
	});

	describe('toggleLeftBar()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.UI_LAYOUT_APP_TOGGLE_LEFT_BAR,
			};

			const actual = actions.toggleLeftBar();

			expect(actual).toEqual(expected);
		});
	});

	describe('toggleRightBar()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.UI_LAYOUT_APP_TOGGLE_RIGHT_BAR,
			};

			const actual = actions.toggleRightBar();

			expect(actual).toEqual(expected);
		});
	});

	describe('setEditorMode()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.UI_LAYOUT_APP_SET_EDITOR_MODE,
				payload: {
					mode: 'myMode',
				},
			};

			const actual = actions.setEditorMode('myMode');

			expect(actual).toEqual(expected);
		});
	});
});
