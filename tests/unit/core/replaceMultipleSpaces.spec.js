import replaceMultipleSpaces from '../../../src/core/string/replaceMultipleSpaces';

describe('replaceMultipleSpaces', () => {
	test('Module', () => {
		expect(replaceMultipleSpaces).toBeInstanceOf(Function);
	});
});

describe.each([
	[ 'Am     Bb E/G  F   ', ' ', 'Am Bb E/G F ' ],
	[ 'Am     Bb E/G  F   ', '_', 'Am_Bb E/G_F_' ],
	[ 'Am     Bb E/G  F   ', undefined, 'Am Bb E/G F ' ],
])('replace multiple spaces in %s with "%s"', (input, replaceWith, output) => {
	test('outputs: ' + output, () => {
		expect(replaceMultipleSpaces(input, replaceWith)).toEqual(output);
	});
});
