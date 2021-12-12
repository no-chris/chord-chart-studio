import { getNonInteractableWidgets } from '../../../../src/optionsPanels/rendering/_state/selectors';

describe('getNonInteractableWidgets', () => {
	test('should be a function', () => {
		expect(typeof getNonInteractableWidgets).toBe('function');
	});
});
