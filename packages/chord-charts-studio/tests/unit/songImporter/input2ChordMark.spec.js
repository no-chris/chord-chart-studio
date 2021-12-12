import input2ChordMark from '../../../src/songImporter/input2ChordMark';

describe('getFromUltimateGuitar()', () => {
	test('Module', () => {
		expect(input2ChordMark).toBeInstanceOf(Function);
	});

	test('should properly convert ultimate guitar input', () => {
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

		const actual = input2ChordMark(input, 'ultimateGuitar');
		expect(actual).toBe(output);
	});

	test('should properly convert chordpro input', () => {
		const input =
			'{start_of_chorus}\n' +
			'Swing [D]low, sweet [G]chari[D]ot,\n' +
			'Comin’ for to carry me [A7]home.\n' +
			'Swing [D7]low, sweet [G]chari[D]ot,\n' +
			'Comin’ for to [A7]carry me [D]home.\n' +
			'{end_of_chorus}';

		const output =
			'#c\n' +
			'D G D\n' +
			'Swing _low, sweet _chari_ot,\n' +
			'A7\n' +
			'Comin’ for to carry me _home.\n' +
			'D7 G D\n' +
			'Swing _low, sweet _chari_ot,\n' +
			'A7 D\n' +
			'Comin’ for to _carry me _home.\n';

		const actual = input2ChordMark(input, 'chordpro');
		expect(actual).toBe(output);
	});

	test('should properly convert basic input', () => {
		const input =
			'  A2\r\n' +
			'I got the world upon my shoulder\r\n' +
			'                          F#m11\r\n' +
			'All the mountains and the sea\r\n';

		const output =
			'A2\n' +
			'I _got the world upon my shoulder\n' +
			'F#m11\n' +
			'All the mountains and the _sea\n\n';

		const actual = input2ChordMark(input, 'basic');
		expect(actual).toBe(output);
	});
});
