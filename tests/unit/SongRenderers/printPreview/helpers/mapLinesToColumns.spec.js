import mapLinesToColumns from '../../../../../src/songRenderers/printPreview/helpers/mapLinesToColumns';

describe('mapLinesToColumns', () => {
	test('Module', () => {
		expect(mapLinesToColumns).toBeInstanceOf(Function);
	});
});

function getLines({ from, to }) {
	const count = to - from + 1;
	const lines = new Array(count).fill('<div class="ucc-text-line">{CONTENT}</div>');
	return lines.map((line, index) => line.replace('{CONTENT}', 'line' + (from + index)));
}

function getLinesWithHeight({ from, to, height }) {
	return getLines({ from, to })
		.map(line => ({
			content: line,
			height
		}));
}

describe.each([
	[
		'no page height',
		{
			allLinesWithHeight: getLinesWithHeight({ from: 1, to: 3, height: 20}),
			options: {
				columnsCount: 2,
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
			allLinesWithHeight: getLinesWithHeight({ from: 1, to: 3, height: 20}),
			options: {
				columnsCount: 2,
				normalPageHeight: 100
			}
		},
		[
			[getLines({ from: 1, to: 3 })],
		],
	],
	[
		'1 page, 2 columns',
		{
			allLinesWithHeight: getLinesWithHeight({ from: 1, to: 7, height: 20}),
			options: {
				columnsCount: 2,
				normalPageHeight: 100
			}
		},
		[
			[getLines({ from: 1, to: 5 }), getLines({ from: 6, to: 7 })],
		],
	],
	[
		'1 page, 3 columns',
		{
			allLinesWithHeight: getLinesWithHeight({ from: 1, to: 13, height: 20}),
			options: {
				columnsCount: 3,
				normalPageHeight: 100
			}
		},
		[
			[getLines({ from: 1, to: 5 }), getLines({ from: 6, to: 10 }), getLines({ from: 11, to: 13 })],
		],
	],
	[
		'3 pages, 1 column',
		{
			allLinesWithHeight: getLinesWithHeight({ from: 1, to: 13, height: 20}),
			options: {
				columnsCount: 1,
				normalPageHeight: 100
			}
		},
		[
			[getLines({ from: 1, to: 5 })],
			[getLines({ from: 6, to: 10 })],
			[getLines({ from: 11, to: 13 })],
		],
	],
	[
		'2 pages, 2 columns',
		{
			allLinesWithHeight: getLinesWithHeight({ from: 1, to: 18, height: 20}),
			options: {
				columnsCount: 2,
				normalPageHeight: 100
			}
		},
		[
			[getLines({ from: 1, to: 5 }), getLines({ from: 6, to: 10 })],
			[getLines({ from: 11, to: 15 }), getLines({ from: 16, to: 18 })],
		],
	],
	[
		'2 pages, 3 columns',
		{
			allLinesWithHeight: getLinesWithHeight({ from: 1, to: 27, height: 20}),
			options: {
				columnsCount: 3,
				normalPageHeight: 100
			}
		},
		[
			[getLines({ from: 1, to: 5 }), getLines({ from: 6, to: 10 }), getLines({ from: 11, to: 15 })],
			[getLines({ from: 16, to: 20 }), getLines({ from: 21, to: 25 }), getLines({ from: 26, to: 27 })],
		],
	],

])('mapLinesToColumns: %s', (title, input, expected) => {
	test('Should correctly map lines to columns', () => {
		const allPagesColumns = mapLinesToColumns(input.allLinesWithHeight, input.options);

		expect(allPagesColumns).toEqual(expected);
	});
});


describe('noEmptyLinesOnColumnStart', () => {
	const emptyLine = '<div class="ucc-empty-line"> </div>';

	const allLinesWithHeight = getLinesWithHeight({ from: 1, to: 20, height: 20 });
	allLinesWithHeight[5].content =
		allLinesWithHeight[6].content =
			allLinesWithHeight[7].content =
				allLinesWithHeight[13].content =
					allLinesWithHeight[14].content =
						allLinesWithHeight[15].content = emptyLine;

	test('should not allow empty lines on column start with noEmptyLinesOnColumnStart = true', () => {
		const allPagesColumns = mapLinesToColumns(allLinesWithHeight, {
			columnsCount: 2,
			noEmptyLinesOnColumnStart: true,
			normalPageHeight: 100,
		});

		const expected = [
			[getLines({ from: 1, to: 5 }), getLines({ from: 9, to: 13 })],
			[getLines({ from: 17, to: 20 })],
		];

		expect(allPagesColumns).toEqual(expected);
	});

	test('edge case if blank line is "part" of a non breakable block: empty line should not disappear', () => {
		const chordLine = '<div class="ucc-chord-line">C F G</div>';
		const textLine = '<div class="ucc-text-line">My verse</div>';

		const allLinesWithHeightLocal =
			[
				chordLine, textLine, chordLine, textLine, chordLine,
				textLine, emptyLine, chordLine, textLine
			]
				.map(line => ({ content: line, height: 20 }));

		const allPagesColumns = mapLinesToColumns(allLinesWithHeightLocal, {
			columnsCount: 2,
			noEmptyLinesOnColumnStart: true,
			noOrphanTextLine: true,
			normalPageHeight: 100,
		});

		const expected = [
			[
				[chordLine, textLine, chordLine, textLine],
				[chordLine, textLine, emptyLine, chordLine, textLine],
			],
		];

		expect(allPagesColumns).toEqual(expected);
	});

	test('should allow empty lines on column start with noEmptyLinesOnColumnStart = false', () => {
		const allPagesColumns = mapLinesToColumns(allLinesWithHeight, {
			columnsCount: 2,
			noEmptyLinesOnColumnStart: false,
			normalPageHeight: 100,
		});

		const expected = [
			[
				getLines({ from: 1, to: 5 }),
				[emptyLine, emptyLine, emptyLine, ...getLines({ from: 9, to: 10 })]
			],
			[
				[...getLines({ from: 11, to: 13 }), emptyLine, emptyLine],
				[emptyLine, ...getLines({ from: 17, to: 20 })],
			],
		];

		expect(allPagesColumns).toEqual(expected);
	});
});

describe('noOrphanTextLine', () => {
	const chordLine = '<div class="ucc-chord-line">C F G</div>';
	const textLine = '<div class="ucc-text-line">My verse</div>';

	const allLinesWithHeight = new Array(20)
		.fill(textLine)
		.map((_, index) => (index % 2 === 0) ? chordLine : textLine)
		.map(line => ({ content: line, height: 20 }));

	test('should not allow to break a chord line from its associated text line if noOrphanTextLine = true', () => {
		const allPagesColumns = mapLinesToColumns(allLinesWithHeight, {
			columnsCount: 2,
			noOrphanTextLine: true,
			normalPageHeight: 100,
		});

		const expected = [
			[
				[chordLine, textLine, chordLine, textLine],
				[chordLine, textLine, chordLine, textLine],
			],
			[
				[chordLine, textLine, chordLine, textLine],
				[chordLine, textLine, chordLine, textLine],
			],
			[
				[chordLine, textLine, chordLine, textLine],
			],
		];

		expect(allPagesColumns).toEqual(expected);
	});
});
