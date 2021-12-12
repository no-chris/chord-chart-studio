import fs from 'fs';
import ChordSheetJS from 'chordsheetjs';

import chordSheetJs2ChordMark from '../../../../src/core/converters/chordSheetJs2ChordMark';
import chordProOutput1 from './chordProOutput1';
import ultimateGuitarOutput1 from './ultimateGuitarOutput1';
import ultimateGuitarOutput2 from './ultimateGuitarOutput2';

const chordProInput1 = fs.readFileSync(
	__dirname + '/chordProInput1.txt',
	'utf-8'
);

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

	describe('ChordSheetJs created from Ultimate Guitar source', () => {
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

	describe('ChordSheetJs created from ChordPro source', () => {
		test('should properly convert ChordSheetJS format', () => {
			const parser = new ChordSheetJS.ChordProParser();
			const parsed = parser.parse(chordProInput1);

			const result = chordSheetJs2ChordMark(parsed).split('\n');
			expect(result).toEqual(chordProOutput1);
		});
	});
});
