import fs from 'fs';
import parseSong from '../../../src/parseSong';

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
			{ type: 'chord', 	string: 'C.. G..' },
			{ type: 'text', 	string: 'When I find myself in times of trouble' },
			{ type: 'chord', 	string: 'Am.. F..' },
			{ type: 'text', 	string: 'Mother mary comes to me' },
			{ type: 'chord', 	string: 'C.. G..' },
			{ type: 'text', 	string: 'Speaking words of wisdom' },
			{ type: 'chord', 	string: 'F. Em. Dm. C.' },
			{ type: 'text', 	string: 'Let it be' },
			{ type: 'text', 	string: '' },
			{ type: 'chord', 	string: 'Am.. G..' },
			{ type: 'text', 	string: 'Let it be, let it be' },
			{ type: 'chord', 	string: 'C.. F..' },
			{ type: 'text', 	string: 'Let it be, let it be' },
			{ type: 'chord', 	string: 'C.. G..' },
			{ type: 'text', 	string: 'Whispers words of wisdom' },
			{ type: 'chord', 	string: 'F. Em. Dm. C.' },
			{ type: 'text', 	string: 'Let it be' },
		];
		expected.forEach(line => { line.parsed = line.string; });

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
		expected.forEach(line => { line.parsed = line.string; });

		expect(parseSong(input, { parseChordLine })).toEqual(expected);
	});

	test('Set chordline as text if parsing fails', () => {
		const parseChordLine = chordLine => { throw new Error(chordLine); };
		const input = 'C. D.. E..';
		const expected = [
			{ type: 'text',	string: input, parsed: input }
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

