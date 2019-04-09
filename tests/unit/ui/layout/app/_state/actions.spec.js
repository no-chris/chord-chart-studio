import * as actions from '../../../../../../src/ui/layout/app/_state/actions';
import * as actionsTypes from '../../../../../../src/ui/layout/app/_state/actionsTypes';

describe('ui/layout/app: actions creators', () => {

	describe('toggleLeftBar()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.UI_LAYOUT_APP_TOGGLE_LEFT_BAR,
			};

			const actual = actions.toggleLeftBar() ;

			expect(actual).toEqual(expected);
		});
	});

	describe('toggleRightBar()', () => {
		test('should return a valid action', () => {
			const expected = {
				type: actionsTypes.UI_LAYOUT_APP_TOGGLE_RIGHT_BAR,
			};

			const actual = actions.toggleRightBar() ;

			expect(actual).toEqual(expected);
		});
	});

});
