import getChordSymbol from '../../src/getChordSymbol';

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
		expect(getChordSymbol(input)).toEqual(output);
	});
});
