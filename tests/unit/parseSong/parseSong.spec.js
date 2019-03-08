import fs from 'fs';
import parseSong from '../../../src/parseSong';

const testData = __dirname + '/data';

describe('parseSong', () => {
	test('Module', () => {
		expect(parseSong).toBeInstanceOf(Function);
	});
});

const parseChordLine = chordLine => chordLine;

describe('parseSong', () => {
	test('Correctly parses song', () => {
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
});

