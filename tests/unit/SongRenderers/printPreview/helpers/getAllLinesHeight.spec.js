jest.mock('../../../../../src/songRenderers/printPreview/helpers/element');

import { getOffsetHeight } from '../../../../../src/songRenderers/printPreview/helpers/element';

import getAllLinesHeight from '../../../../../src/songRenderers/printPreview/helpers/getAllLinesHeight';

describe('getAllLinesHeight', () => {
	test('Module', () => {
		expect(getAllLinesHeight).toBeInstanceOf(Function);
	});
});

describe('getAllLinesHeight', () => {
	test('should return an array of all lines height', () => {
		getOffsetHeight.mockReturnValue(30);

		const allLines = new Array(20).fill('<div class="ucc-line">myVerse</div>');

		return getAllLinesHeight(allLines, {
			columnsCount: 2,
			documentSize: 'a4',
			documentMargins: 3,
			printFontSize: 0,
		})
			.then(allLinesHeight => {
				expect(allLinesHeight).toEqual(new Array(20).fill(30));
			});
	});
});
