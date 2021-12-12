import ultimateGuitar2ChordMark from '../../../src/core/converters/ultimateGuitar2ChordMark';

describe('getFromUltimateGuitar()', () => {
	test('Module', () => {
		expect(ultimateGuitar2ChordMark).toBeInstanceOf(Function);
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
		const actual = ultimateGuitar2ChordMark(input);
		expect(actual).toBe(output);
	});
});
