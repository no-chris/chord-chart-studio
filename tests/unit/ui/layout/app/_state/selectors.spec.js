import * as selectors from '../../../../../../src/ui/layout/app/_state/selectors';

describe('ui/layout/app: selectors', () => {
	describe('getActiveModal()', () => {
		test('should return activeModal', () => {
			const state = {
				ui: {
					layout: {
						app: {
							activeModal: 'myModal'
						}
					}
				}
			};
			expect(selectors.getActiveModal(state)).toBe('myModal');
		});
	});

	describe('isLeftBarCollapsed()', () => {
		test('should return isLeftBarCollapsed', () => {
			const state = {
				ui: {
					layout: {
						app: {
							isLeftBarCollapsed: true
						}
					}
				}
			};
			expect(selectors.isLeftBarCollapsed(state)).toBe(true);
		});
	});

	describe('isRightBarCollapsed()', () => {
		test('should return isRightBarCollapsed', () => {
			const state = {
				ui: {
					layout: {
						app: {
							isRightBarCollapsed: true
						}
					}
				}
			};
			expect(selectors.isRightBarCollapsed(state)).toBe(true);
		});
	});

	describe('getEditorMode()', () => {
		test('should return editorMode', () => {
			const state = {
				ui: {
					layout: {
						app: {
							editorMode: 'myMode'
						}
					}
				}
			};
			expect(selectors.getEditorMode(state)).toBe('myMode');
		});
	});

});
