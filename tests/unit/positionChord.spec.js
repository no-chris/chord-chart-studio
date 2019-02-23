import positionChord from '../../src/positionChord';
import IncorrectBeatCountException from '../../src/exceptions/IncorrectBeatCountException';
import ChordsPositionMismatchException from '../../src/exceptions/ChordsPositionMismatchException';

describe('positionChord', () => {
	test('Module', () => {
		expect(positionChord).toBeInstanceOf(Function);
	});


});



/**
*/

describe.skip.each([
	['1 bar / 2 chords / 4 beats/bar', 'Cm.. F..', 4, [[
		{ string: 'Cm..', symbol: 'Cm', duration: 2 },
		{ string: 'F..', symbol: 'F', duration: 2 },
	]], 2],

	/**

	['1 chord,  1 bar',     'Cm',               '| Cm |' ],
	['2 chords, 1 bar',     'Cm.. Em..',        '| Cm    Em |' ],
	['3 chords, 1 bar',     'Cm.. Em. G.',      '| Cm Em G |' ],
	['3 chords, 1 bar',     'Cm. Em.. G.',      '| Cm Em G |' ],
	['3 chords, 1 bar',     'Cm.. Em. G.',      '| Cm Em G |' ],
	['4 chords, 1 bar',     'Cm. Em. G. D.',    '| Cm Em G D |' ],
	['2 chords, 2 bars',    'Cm Em',            '| Cm | Em |' ],
	['3 chords, 2 bars',    'Cm.. Em.. G',      '| Cm Em | G |' ],
	['4 chords, 2 bars',    'Cm.. Em.. G.. D..','| Cm Em | G D |' ],
	['3 chords, 3 bars',    'Cm Em G',          '| Cm | Em | G |' ],
	['4 chords, 3 bars',    'Cm Em.. G.. D',    '| Cm | Em G | D |' ],
	['4 chords, 4 bars',    'Cm Em G D',        '| Cm | Em | G | D |' ],
	 */
])('%s: %s => %s',
	(title, input, output) => {
		test('Renders correctly', () => {
			const renderer = positionChord(input);
			expect(renderer.toString()).toBe(output);
		});
	});

/**
describe.each([
	['1 chord, 1 beat, 4 beats/bar',	'Cm.',			'Cm.',		'Cm', 1, 1, 4 ]

])('%s: %s',
	(title, input, string, symbol, duration, beatCount, beatsPerBar) => {
		const options = { beatsPerBar };
		const throwingFunction = () => { positionChord(input, options); };

		test('Throw IncorrectBeatCountException', () => {
			expect(throwingFunction).toThrow(IncorrectBeatCountException);
		});

		test('Add correct properties to exception', () => {
			try {
				throwingFunction();
				expect(false).toBeTruthy();

			} catch (e) {
				expect(e.name).toBe('IncorrectBeatCountException');
				expect(e.string).toBe(string);
				expect(e.symbol).toBe(symbol);
				expect(e.duration).toBe(duration);
				expect(e.beatCount).toBe(beatCount);
				expect(e.beatsPerBar).toBe(beatsPerBar);
			}
		});
	});



describe.each([
	['Starts on chord',     	'F',               'Yesterday', '| F         |' ],
	['Explicit position, 1',    'F',               '_Yesterday', '| F         |' ],
])('%s: %s => %s',
	(title, input, textBase, output) => {
		test('Renders correctly', () => {
			const renderer = positionChord(input, { textBase });
			expect(renderer.toString()).toBe(output);
		});
	});


describe.each([
	['1 chord, 2 positions',	'F',			'_Yesterday _', 	1, 2 ],
	['2 chords, 1 position',	'F Am7', 		'_Yesterday', 		2, 1 ],

])('%s: %s',
	(title, input, textBase, chordCount, positionCount) => {
		const options = { textBase };
		const throwingFunction = () => { positionChord(input, options); };

		test('Throw ChordsPositionMismatchException', () => {
			expect(throwingFunction).toThrow(ChordsPositionMismatchException);
		});

		test('Add correct properties to exception', () => {
			try {
				throwingFunction();
				expect(false).toBeTruthy();
			} catch (e) {
				expect(e.name).toBe('ChordsPositionMismatchException');
				expect(e.chordCount).toBe(chordCount);
				expect(e.positionCount).toBe(positionCount);
			}
		});
	});
*/