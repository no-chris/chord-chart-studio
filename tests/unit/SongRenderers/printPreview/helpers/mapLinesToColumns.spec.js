import mapLinesToColumns from '../../../../../src/songRenderers/printPreview/helpers/mapLinesToColumns';

describe('mapLinesToColumns', () => {
	test('Module', () => {
		expect(mapLinesToColumns).toBeInstanceOf(Function);
	});
});


function getLines(from, to) {
	const count = to - from + 1;
	const lines = new Array(count).fill('line');
	return lines.map((line, index) => line + (from + index));
}

function getDimensions(count, height) {
	return new Array(count).fill(height);
}

describe.each([
	[
		'no page height',
		{
			allLines: getLines(1, 3),
			columnsCount: 2,
			dimensions: {
				allLinesHeight: getDimensions(3, 20),
				normalPageHeight: 0
			}
		},
		[
			[[]],
		],
	],
	[
		'1 page, 1 column',
		{
			allLines: getLines(1, 3),
			columnsCount: 2,
			dimensions: {
				allLinesHeight: getDimensions(3, 20),
				normalPageHeight: 100
			}
		},
		[
			[getLines(1, 3)],
		],
	],
	[
		'1 page, 2 columns',
		{
			allLines: getLines(1, 7),
			columnsCount: 2,
			dimensions: {
				allLinesHeight: getDimensions(7, 20),
				normalPageHeight: 100
			}
		},
		[
			[getLines(1, 5), getLines(6, 7)],
		],
	],
	[
		'1 page, 3 columns',
		{
			allLines: getLines(1, 13),
			columnsCount: 3,
			dimensions: {
				allLinesHeight: getDimensions(13, 20),
				normalPageHeight: 100
			}
		},
		[
			[getLines(1, 5), getLines(6, 10), getLines(11, 13)],
		],
	],
	[
		'3 pages, 1 column',
		{
			allLines: getLines(1, 13),
			columnsCount: 1,
			dimensions: {
				allLinesHeight: getDimensions(13, 20),
				normalPageHeight: 100
			}
		},
		[
			[getLines(1, 5)],
			[getLines(6, 10)],
			[getLines(11, 13)],
		],
	],
	[
		'2 pages, 2 columns',
		{
			allLines: getLines(1, 18),
			columnsCount: 2,
			dimensions: {
				allLinesHeight: getDimensions(18, 20),
				normalPageHeight: 100
			}
		},
		[
			[getLines(1, 5), getLines(6, 10)],
			[getLines(11, 15), getLines(16, 18)],
		],
	],
	[
		'2 pages, 3 columns',
		{
			allLines: getLines(1, 27),
			columnsCount: 3,
			dimensions: {
				allLinesHeight: getDimensions(27, 20),
				normalPageHeight: 100
			}
		},
		[
			[getLines(1, 5), getLines(6, 10), getLines(11, 15)],
			[getLines(16, 20), getLines(21, 25), getLines(26, 27)],
		],
	],

])('mapLinesToColumns: %s', (title, input, expected) => {
	test('Should correctly map lines to columns', () => {
		const allPagesColumns = mapLinesToColumns(input.allLines, input.columnsCount, input.dimensions);

		expect(allPagesColumns).toEqual(expected);
	});
});
