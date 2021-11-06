import getFromUltimateGuitar from '../../../../src/songImporters/importers/ultimateGuitar';

describe('getFromUltimateGuitar()', () => {
	test('Module', () => {
		expect(getFromUltimateGuitar).toBeInstanceOf(Function);
	});

	const input =
		'  [ch]A2[/ch]\r\n' +
		'I got the world upon my shoulder\r\n' +
		'                          [ch]F#m11[/ch]\r\n' +
		'All the mountains and the sea\r\n';

	const output =
		'A2\n' +
		'I _got the world upon my shoulder\n' +
		'F#m11\n' +
		'All the mountains and the _sea\n\n';

	test('should properly convert ultimate guitar input', () => {
		const actual = getFromUltimateGuitar(input);
		expect(actual).toBe(output);
	});
});
