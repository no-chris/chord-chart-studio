import {
	getOffsetHeight,
	getClientHeight,
} from '../../../../../src/songRenderers/printPreview/helpers/element';

describe('getOffsetHeight()', () => {
	test('Should return offsetHeight property of given element', () => {
		expect(getOffsetHeight({ offsetHeight: 50 })).toBe(50);
	});

	test('Should return clientHeight property of given element', () => {
		expect(getClientHeight({ clientHeight: 50 })).toBe(50);
	});
});
