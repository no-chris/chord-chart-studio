jest.mock('../../../../../src/songRenderers/printPreview/helpers/element');

import { getClientHeight } from '../../../../../src/songRenderers/printPreview/helpers/element';

import getPagesHeight from '../../../../../src/songRenderers/printPreview/helpers/getPagesHeight';

describe('getPagesHeight', () => {
	test('Module', () => {
		expect(getPagesHeight).toBeInstanceOf(Function);
	});
});

describe('getPagesHeight', () => {
	test('should return normalPageHeight and firstPageHeight', () => {
		getClientHeight.mockReturnValue(200);

		return getPagesHeight('myTitle', {
			columnsCount: 2,
			documentSize: 'a4',
			documentMargins: 3,
			fontSize: 0,
		}).then(({ normalPageHeight, firstPageHeight }) => {
			expect(normalPageHeight).toBe(200);
			expect(firstPageHeight).toBe(200);
		});
	});
});
