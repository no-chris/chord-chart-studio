import getChordSymbol from '../../src/getChordSymbol';
import parseChord from '../../src/parseChord';

describe('getChordSymbol', () => {
	test('Module', () => {
		expect(getChordSymbol).toBeInstanceOf(Function);
	});
});

describe.each([

	['AM7', 'Amaj7'],
	['A+',  'Aaug'],

])('getChordSymbol() for %s', (input, output) => {
	test('returns ' + output, () => {
		const parsed = parseChord(input);
		expect(getChordSymbol(parsed)).toEqual(output);
	});
});
