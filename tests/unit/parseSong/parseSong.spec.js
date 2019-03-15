import fs from 'fs';
import parseSong from '../../../src/parseSong';
import getTimeSignature from '../../../src/getTimeSignature';

const testData = __dirname + '/data';

describe('parseSong', () => {
	test('Module', () => {
		expect(parseSong).toBeInstanceOf(Function);
	});
});

describe('parseSong', () => {
	test('Correctly parses song', () => {
		const parseChordLine = chordLine => chordLine;

		const input = fs.readFileSync(testData + '/input.txt', 'utf8');

		const expected = [
			{ type: 'chord', 			string: 'C.. G..' },
			{ type: 'text', 			string: 'When I find myself in times of trouble' },
			{ type: 'chord', 			string: 'Am.. F..' },
			{ type: 'text', 			string: 'Mother mary comes to me' },
			{ type: 'chord', 			string: 'C.. G..' },
			{ type: 'text', 			string: 'Speaking words of wisdom' },
			{ type: 'chord', 			string: 'F. Em. Dm. C.' },
			{ type: 'text', 			string: 'Let it be' },
			{ type: 'text', 			string: '' },
			{ type: 'chord', 			string: 'Am.. G..' },
			{ type: 'text', 			string: 'Let it be, let it be' },
			{ type: 'chord', 			string: 'C.. F..' },
			{ type: 'text', 			string: 'Let it be, let it be' },
			{ type: 'chord', 			string: 'C.. G..' },
			{ type: 'text', 			string: 'Whispers words of wisdom' },
			{ type: 'chord', 			string: 'F. Em. Dm. C.' },
			{ type: 'text', 			string: 'Let it be' },
		];
		expected.forEach(line => {
			if (line.type === 'chord') {
				line.model = parseChordLine(line.string);
			}
		});

		expect(parseSong(input, { parseChordLine })).toEqual(expected);
	});

	test('Correctly interpret time signature', () => {
		expect.assertions(4);

		let callCount = 0;

		const ts3_4 = getTimeSignature('3/4');
		const ts4_4 = getTimeSignature('4/4');
		const ts6_8 = getTimeSignature('6/8');

		const parseChordLine = (chordLine, { timeSignature }) => {
			callCount++;

			if (callCount === 1) {
				expect(timeSignature).toEqual(ts6_8);
			} else if (callCount === 2) {
				expect(timeSignature).toEqual(ts4_4);
			} else {
				expect(timeSignature).toEqual(ts3_4);
			}
			return chordLine;
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
			{ type: 'chord', 			string: 'Em D. C.' },
			{ type: 'text', 			string: 'So close, no matter how far' },
			{ type: 'time-signature', 	string: '4/4' },
			{ type: 'chord', 			string: 'C.. G..' },
			{ type: 'text', 			string: 'When I find myself in times of trouble' },
			{ type: 'time-signature', 	string: '3/4' },
			{ type: 'chord', 			string: 'D D C A' },
			{ type: 'text', 			string: 'Never cared for what they know' },
		];
		expected.forEach(line => {
			if (line.type === 'chord') {
				line.model = line.string;
			}
		});

		expect(parseSong(input, { parseChordLine })).toEqual(expected);
	});

	test('Also accept an array as an input', () => {
		const parseChordLine = chordLine => chordLine;
		const input = [
			'C.. G..',
			'When I find myself in times of trouble',
			'Am.. F..',
			'Mother mary comes to me'
		];
		const expected = [
			{ type: 'chord', 	string: 'C.. G..' },
			{ type: 'text', 	string: 'When I find myself in times of trouble' },
			{ type: 'chord', 	string: 'Am.. F..' },
			{ type: 'text', 	string: 'Mother mary comes to me' },
		];
		expected.forEach(line => {
			if (line.type === 'chord') {
				line.model = parseChordLine(line.string);
			}
		});

		expect(parseSong(input, { parseChordLine })).toEqual(expected);
	});

	test('Set chordline as text if parsing fails', () => {
		const parseChordLine = chordLine => { throw new Error(chordLine); };
		const input = 'C. D.. E..';
		const expected = [
			{ type: 'text',	string: input }
		];

		expect(parseSong(input, { parseChordLine })).toEqual(expected);
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

