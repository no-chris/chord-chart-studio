import parseChordLine from '../../src/parseChordLine.js';
import IncorrectBeatCountException from '../../src/exceptions/IncorrectBeatCountException';

describe('parseChordLine', () => {
	test('Module', () => {
		expect(parseChordLine).toBeInstanceOf(Function);
	});
});


describe.each([
	['1 bar / 1 chord / 4 beats/bar', 'Cm', 4, [
		{
			allChords: [
				{ string: 'Cm', symbol: 'Cm', duration: 4 },
			]
		}
	], 1],

	['1 bar / 2 chords / 4 beats/bar', 'Cm.. F..', 4, [
		{
			allChords: [
				{ string: 'Cm..', symbol: 'Cm', duration: 2 },
				{ string: 'F..', symbol: 'F', duration: 2 },
			]
		}
	], 2],

	['1 bar / 3 chords / 4 beats/bar', 'Cm.. F. G.', 4, [
		{
			allChords: [
				{ string: 'Cm..', symbol: 'Cm', duration: 2 },
				{ string: 'F.', symbol: 'F', duration: 1 },
				{ string: 'G.', symbol: 'G', duration: 1 },
			]
		}
	], 3],

	['1 bar / 4 chords / 4 beats/bar', 'Cm. Em7. F. G.', 4, [
		{
			allChords: [
				{ string: 'Cm.', symbol: 'Cm', duration: 1 },
				{ string: 'Em7.', symbol: 'Em7', duration: 1 },
				{ string: 'F.', symbol: 'F', duration: 1 },
				{ string: 'G.', symbol: 'G', duration: 1 },
			]
		}
	], 4],

	['2 bars / 2 chords / 4 beats/bar', 'C F', 4, [
		{
			allChords: [
				{ string: 'C', symbol: 'C', duration: 4 },
			]
		}, {
			allChords: [
				{ string: 'F', symbol: 'F', duration: 4 },
			]
		}
	], 2],

	['2 bars / 3 chords / 4 beats/bar', 'C F.. G..', 4, [
		{
			allChords: [
				{ string: 'C', symbol: 'C', duration: 4 },
			]
		}, {
			allChords: [
				{ string: 'F..', symbol: 'F', duration: 2 },
				{ string: 'G..', symbol: 'G', duration: 2 },
			]
		}
	], 3],

	['2 bars / 4 chords / 4 beats/bar', 'C... Em7. F. G...', 4, [
		{
			allChords: [
				{ string: 'C...', symbol: 'C', duration: 3 },
				{ string: 'Em7.', symbol: 'Em7', duration: 1 },
			]
		}, {
			allChords: [
				{ string: 'F.', symbol: 'F', duration: 1 },
				{ string: 'G...', symbol: 'G', duration: 3 },
			]
		}
	], 4],

	['3 bars / 4 chords / 4 beats/bar', 'C Em7. F... G', 4, [
		{
			allChords: [
				{ string: 'C', symbol: 'C', duration: 4 },
			]
		}, {
			allChords: [
				{ string: 'Em7.', symbol: 'Em7', duration: 1 },
				{ string: 'F...', symbol: 'F', duration: 3 },
			]
		}, {
			allChords: [
				{ string: 'G', symbol: 'G', duration: 4 },
			]
		}
	], 4],


	['1 bar / 1 chord / 3 beats/bar', 'C', 3, [
		{
			allChords: [
				{ string: 'C', symbol: 'C', duration: 3 },
			]
		}
	], 1],

	['1 bar / 2 chords / 3 beats/bar', 'Cm. F..', 3, [
		{
			allChords: [
				{ string: 'Cm.', symbol: 'Cm', duration: 1 },
				{ string: 'F..', symbol: 'F', duration: 2 },
			]
		}
	], 2],

	['1 bar / 2 chords / 3 beats/bar', 'Cm.. F.', 3, [
		{
			allChords: [
				{ string: 'Cm..', symbol: 'Cm', duration: 2 },
				{ string: 'F.', symbol: 'F', duration: 1 },
			]
		}
	], 2],

	['1 bar / 3 chords / 3 beats/bar', 'Cm. F. G.', 3, [
		{
			allChords: [
				{ string: 'Cm.', symbol: 'Cm', duration: 1 },
				{ string: 'F.', symbol: 'F', duration: 1 },
				{ string: 'G.', symbol: 'G', duration: 1 },
			]
		}
	], 3],

])('Parse correctly %s: %s',
	(title, input, beatsPerBar, allBars, chordCount) => {
		test('Parses correctly', () => {
			const options = { beatsPerBar };
			const parsed = parseChordLine(input, options);

			expect(parsed).toEqual({ allBars, chordCount });
		});
	});


describe.each([
	['1 chord / 1 beat / 4 beats/bar',	  'Cm.',			'Cm.',		'Cm', 1, 1, 4 ],
	['1 chord / 2 beats / 4 beats/bar',   'Cm..',			'Cm..',		'Cm', 2, 2, 4 ],
	['1 chord / 3 beats / 4 beats/bar',   'Cm...',			'Cm...',	'Cm', 3, 3, 4 ],
	['1 chord / 5 beats / 4 beats/bar',   'Cm.....',		'Cm.....',	'Cm', 5, 5, 4 ],
	['1 chord / 6 beats / 4 beats/bar',   'Cm......',		'Cm......',	'Cm', 6, 6, 4 ],
	['1 chord / 7 beats / 4 beats/bar',   'Cm.......',		'Cm.......','Cm', 7, 7, 4 ],
	['2 chords / 3 beats / 4 beats/bar',  'Cm. D..',		'D..',		'D',  2, 3, 4 ],
	['2 chords / 5 beats / 4 beats/bar',  'Cm... D..',		'D..',		'D',  2, 5, 4 ],
	['2 chords / 6 beats / 4 beats/bar',  'Cm... D...',		'D...',		'D',  3, 6, 4 ],
	['2 chords / 7 beats / 4 beats/bar',  'Cm... D',		'D',		'D',  4, 7, 4 ],
	['3 chords / 3 beats / 4 beats/bar',  'C. D. E.',		'E.',		'E',  1, 3, 4 ],
	['3 chords / 5 beats / 4 beats/bar',  'C. D.. E..',		'E..',		'E',  2, 5, 4 ],

	['1 chords / 4 beats / 5 beats/bar',  'C....',			'C....',	'C',  4, 4, 5 ],
	['2 chords / 4 beats / 5 beats/bar',  'C.. D..',		'D..',		'D',  2, 4, 5 ],
	['3 chords / 6 beats / 5 beats/bar',  'C.. D.. E..',	'E..',		'E',  2, 6, 5 ],
	['3 chords / 7 beats / 5 beats/bar',  'C.. D... E..',	'E..',		'E',  2, 2, 5 ],
	['3 chords / 8 beats / 5 beats/bar',  'C... D... E..',	'D...',		'D',  3, 6, 5 ],
	['3 chords / 9 beats / 5 beats/bar',  'C... D E.',		'D',		'D',  5, 8, 5 ],

])('Throw on %s: %s',
	(title, input, string, symbol, duration, beatCount, beatsPerBar) => {
		const options = { beatsPerBar };
		const throwingFunction = () => { parseChordLine(input, options); };

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
