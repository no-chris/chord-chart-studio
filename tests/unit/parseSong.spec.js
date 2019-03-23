import parseSong from '../../src/parseSong';
import parseChord from '../../src/parseChord';

import parseChordLine from '../../src/parseChordLine';
import parseTimeSignature from '../../src/parseTimeSignature';

const mockParseChordLine = () => ({
	allBars: [{
		allChords: []
	}]
});

describe('parseSong', () => {
	test('Module', () => {
		expect(parseSong).toBeInstanceOf(Function);
	});
});

describe('Global', () => {

	test('Accept multiline string as an input', () => {
		const input = `C.. G..
When I find myself in times of trouble
Am.. F..
Mother mary comes to me`;
		const expected = {
			allLines: [
				{ type: 'chord', 	string: 'C.. G..', model: parseChordLine('C.. G..') },
				{ type: 'text', 	string: 'When I find myself in times of trouble' },
				{ type: 'chord', 	string: 'Am.. F..', model: parseChordLine('Am.. F..') },
				{ type: 'text', 	string: 'Mother mary comes to me' },
			],
			allChords: [
				parseChord('C'),
				parseChord('G'),
				parseChord('Am'),
				parseChord('F')
			]
		};

		expect(parseSong(input, { parseChordLine })).toEqual(expected);
	});

	test('Also accept array as an input', () => {
		const input = [
			'C.. G..',
			'When I find myself in times of trouble',
			'Am.. F..',
			'Mother mary comes to me'
		];
		const expected = {
			allLines: [
				{ type: 'chord', 	string: 'C.. G..', model: parseChordLine('C.. G..') },
				{ type: 'text', 	string: 'When I find myself in times of trouble' },
				{ type: 'chord', 	string: 'Am.. F..', model: parseChordLine('Am.. F..') },
				{ type: 'text', 	string: 'Mother mary comes to me' },
			],
			allChords: [
				parseChord('C'),
				parseChord('G'),
				parseChord('Am'),
				parseChord('F')
			]
		};

		expect(parseSong(input, { parseChordLine })).toEqual(expected);
	});
});

describe('Chord Lines', () => {
	test('Correctly detect and parses chord lines', () => {
		const input = `C.. G..
When I find myself in times of trouble
Am.. F..
Mother mary comes to me
C.. G..
Speaking words of wisdom
F. Em. Dm. C.
Let it be

Am.. G..
Let it be, let it be
C.. F..
Let it be, let it be
C.. G..
Whispers words of wisdom
F. Em. Dm. C.
Let it be`;

		const expected = [
			{type: 'chord', string: 'C.. G..', model: mockParseChordLine('C.. G..')},
			{type: 'text', string: 'When I find myself in times of trouble'},
			{type: 'chord', string: 'Am.. F..', model: mockParseChordLine('Am.. F..')},
			{type: 'text', string: 'Mother mary comes to me'},
			{type: 'chord', string: 'C.. G..', model: mockParseChordLine('C.. G..')},
			{type: 'text', string: 'Speaking words of wisdom'},
			{type: 'chord', string: 'F. Em. Dm. C.', model: mockParseChordLine('F. Em. Dm. C.')},
			{type: 'text', string: 'Let it be'},
			{type: 'text', string: ''},
			{type: 'chord', string: 'Am.. G..', model: mockParseChordLine('Am.. G..')},
			{type: 'text', string: 'Let it be, let it be'},
			{type: 'chord', string: 'C.. F..', model: mockParseChordLine('C.. F..')},
			{type: 'text', string: 'Let it be, let it be'},
			{type: 'chord', string: 'C.. G..', model: mockParseChordLine('C.. G..')},
			{type: 'text', string: 'Whispers words of wisdom'},
			{type: 'chord', string: 'F. Em. Dm. C.', model: mockParseChordLine('F. Em. Dm. C.')},
			{type: 'text', string: 'Let it be'},
		];

		const parsed = parseSong(input, {parseChordLine: mockParseChordLine});
		expect(parsed.allLines).toEqual(expected);
	});

	test('Set chordline as text if parsing fails', () => {
		const localParseChordLine = chordLine => { throw new Error(chordLine); };
		const input = 'C. D.. E..';
		const expected = [
			{ type: 'text',	string: input }
		];

		const parsed = parseSong(input, {parseChordLine: localParseChordLine});
		expect(parsed.allLines).toEqual(expected);
	});

});

describe('timeSignature', () => {
	test('Correctly interpret time signature', () => {
		expect.assertions(4);

		let callCount = 0;

		const ts3_4 = parseTimeSignature('3/4');
		const ts4_4 = parseTimeSignature('4/4');
		const ts6_8 = parseTimeSignature('6/8');

		const localParseChordLine = (chordLine, { timeSignature }) => {
			callCount++;

			if (callCount === 1) {
				expect(timeSignature).toEqual(ts6_8);
			} else if (callCount === 2) {
				expect(timeSignature).toEqual(ts4_4);
			} else {
				expect(timeSignature).toEqual(ts3_4);
			}
			return mockParseChordLine();
		};

		const input = [
			'6/8',
			'Em D. C.',
			'So close, no matter how far',
			'4/4',
			'C.. G..',
			'When I find myself in times of trouble',
			'3/4',
			'D D C A',
			'Never cared for what they know'
		];

		const expected = [
			{ type: 'time-signature', 	string: '6/8' },
			{ type: 'chord', 			string: 'Em D. C.', model: mockParseChordLine('Em D. C.') },
			{ type: 'text', 			string: 'So close, no matter how far' },
			{ type: 'time-signature', 	string: '4/4' },
			{ type: 'chord', 			string: 'C.. G..', model: mockParseChordLine('C.. G..') },
			{ type: 'text', 			string: 'When I find myself in times of trouble' },
			{ type: 'time-signature', 	string: '3/4' },
			{ type: 'chord', 			string: 'D D C A', model: mockParseChordLine('D D C A') },
			{ type: 'text', 			string: 'Never cared for what they know' },
		];

		const parsed = parseSong(input, {parseChordLine: localParseChordLine});
		expect(parsed.allLines).toEqual(expected);
	});
});

describe.each([

	[ undefined ],
	[ {} ],
	[ { parseChordLine: 'not a function'} ],

])('Throw if parseChordLine = %s', (input) => {
	test('throw if not given proper parser', () => {
		const throwingFn = () => parseSong('my song', input);

		expect(throwingFn).toThrow(TypeError);
	});
});

