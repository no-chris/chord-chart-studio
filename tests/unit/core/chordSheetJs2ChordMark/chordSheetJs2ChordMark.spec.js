import fs from 'fs';
import ChordSheetJS from 'chordsheetjs';

import chordSheetJs2ChordMark from '../../../../src/core/converters/chordSheetJs2ChordMark';
import ultimateGuitarOutput1 from './ultimateGuitarOutput1';
import ultimateGuitarOutput2 from './ultimateGuitarOutput2';

const ultimateGuitarInput1 = fs.readFileSync(
	__dirname + '/ultimateGuitarInput1.txt',
	'utf-8'
);

const ultimateGuitarInput2 = fs.readFileSync(
	__dirname + '/ultimateGuitarInput2.txt',
	'utf-8'
);

describe('chordSheetJs2ChordMark', () => {
	test('Module', () => {
		expect(chordSheetJs2ChordMark).toBeInstanceOf(Function);
	});

	describe.skip.each([
		['undefined', undefined, []],
		['empty object', {}, []],
		['no "lines" property', { nolines: [] }, []],
		['"lines" property is an object', { lines: {} }, []],
		['"lines" property is a string', { lines: 'a string' }, []],
		['"lines" property is a number', { lines: 10 }, []],
		['"lines" property is an empty array', { lines: [] }, []],
	])('invalid input: %s', (title, input, expected) => {
		test('should yield an empty array', () => {
			const result = chordSheetJs2ChordMark(input);
			expect(result).toEqual(expected);
		});
	});

	test('should properly convert ChordSheetJS format', () => {
		const parser = new ChordSheetJS.UltimateGuitarParser();
		const parsed = parser.parse(ultimateGuitarInput1);

		const result = chordSheetJs2ChordMark(parsed).split('\n');
		expect(result).toEqual(ultimateGuitarOutput1);
	});

	test('should handle section labels', () => {
		const parser = new ChordSheetJS.UltimateGuitarParser();
		const parsed = parser.parse(ultimateGuitarInput2);

		const result = chordSheetJs2ChordMark(parsed).split('\n');
		expect(result).toEqual(ultimateGuitarOutput2);
	});
});
