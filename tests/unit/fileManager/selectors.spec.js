import * as selectors from '../../../src/fileManager/selectors';

describe('fileManager: selectors', () => {

	describe('getSelectedId()', () => {
		test('should return selected Id', () => {
			const state = {
				fileManager: {
					selected: 'myId'
				}
			};
			expect(selectors.getSelectedId(state)).toBe('myId');
		});
	});

	describe('getRenamedId()', () => {
		test('should return renamed Id', () => {
			const state = {
				fileManager: {
					renamed: 'myId'
				}
			};
			expect(selectors.getRenamedId(state)).toBe('myId');
		});
	});

	describe('getRenamedId()', () => {
		test('should return default title', () => {
			const state = {
				fileManager: {
					defaultTitle: 'default'
				}
			};
			expect(selectors.getDefaultTitle(state)).toBe('default');
		});
	});
});
