import getTimeSignatureDefinition from '../../src/getTimeSignatureDefinition';

describe('getTimeSignatureDefinition', () => {
	test('Module', () => {
		expect(getTimeSignatureDefinition).toBeInstanceOf(Function);
	});
});

describe.each([

	['2/2',  2, 2, 4],
	['3/2',  3, 2, 6],

	['3/4',  3, 4, 3],
	['4/4',  4, 4, 4],
	['5/4',  5, 4, 5],

	['3/8',  3, 8, 1],
	['6/8',  6, 8, 2],
	['9/8',  9, 8, 3],
	['12/8', 12, 8, 4],

])('Time signature of %s', (tsString, tsCount, tsValue, beatsPerBar) => {
	test('Correctly gets definition', () => {
		expect(getTimeSignatureDefinition(tsString)).toEqual({ tsCount, tsValue, beatsPerBar });
	});
});

describe.each([

	['2/1'],
	['3/1'],
	['5/8'],
	['13/7'],

])('Invalid time signature of %s', (tsString) => {
	test('Throws TypeError', () => {
		const throwingFn = () => getTimeSignatureDefinition(tsString);
		expect(throwingFn).toThrow(TypeError);
	});
});
