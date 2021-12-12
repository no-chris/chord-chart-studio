import padColumns from '../../../../../src/songRenderers/printPreview/helpers/padColumns';

describe('padColumns', () => {
	test('Module', () => {
		expect(padColumns).toBeInstanceOf(Function);
	});
});

describe('padColumns()', () => {
	test('Should return an array of "columnCount" empty arrays', () => {
		const allColumns = padColumns(5);
		expect(allColumns).toEqual([[], [], [], [], []]);
	});

	test('Should add necessary amount of empty array so returned array has "columnCount" items', () => {
		const allColumns = padColumns(5, [['col1'], ['col2']]);
		expect(allColumns).toEqual([['col1'], ['col2'], [], [], []]);
	});
});
