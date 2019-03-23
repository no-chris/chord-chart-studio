import getMainAccidental from '../../../src/renderer/getMainAccidental';
import parseChord from '../../../src/parseChord';

describe('getMainAccidental', () => {
	test('Module', () => {
		expect(getMainAccidental).toBeInstanceOf(Function);
	});
});

describe.each([

	['no accidentals', 	['A', 'B', 'C'], 'sharp'],

	['all flats', 			['Ab', 'Bb', 'Db', 'Gb'], 'flat'],
	['3 flats, 1 sharp',	['Ab', 'Bb', 'Db', 'G#'], 'flat'],
	['2 flats, 2 sharps',	['Ab', 'Bb', 'D#', 'G#'], 'sharp'],
	['1 flat, 3 sharp',		['Ab', 'F#', 'D#', 'G#'], 'sharp'],
	['all sharps',			['A#', 'F#', 'D#', 'G#'], 'sharp'],

])('Detect accidentals for: ', (title, input, output) => {
	test(input.join(' ') + ' => ' + output, () => {
		const allChords = input.map(chord => parseChord(chord));

		expect(getMainAccidental(allChords)).toEqual(output);
	});
});
