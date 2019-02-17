import songRendererFactory from '../../src/songRenderer/songRenderer';
import IncorrectBeatCountException from '../../src/songRenderer/exceptions/IncorrectBeatCountException';

describe('songRenderer', () => {
	test('Factory', () => {
		expect(songRendererFactory).toBeInstanceOf(Function);
	});

	test('Instance API', () => {
		const songRenderer = songRendererFactory('test');
		expect(songRenderer.render).toBeInstanceOf(Function);
		expect(songRenderer.toString).toBeInstanceOf(Function);
	});

});


describe.each([
	['1 chord,  1 bar',     'Cm',               '| Cm |' ],
	['2 chords, 1 bar',     'Cm.. Em..',        '| Cm Em |' ],
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
])('%s: %s => %s',
	(title, input, output) => {
		test('Renders correctly', () => {
			const renderer = songRendererFactory(input);
			expect(renderer.toString()).toBe(output);
		});
	});


describe.each([
	['1 chord, 1 beat',		'Cm.',			'Cm.',		'Cm', 1, 1, 4 ],
	['1 chord, 2 beats',    'Cm..',			'Cm..',		'Cm', 2, 2, 4 ],
	['1 chord, 3 beats',    'Cm...',		'Cm...',	'Cm', 3, 3, 4 ],
	['1 chord, 5 beats',    'Cm.....',		'Cm.....',	'Cm', 5, 5, 4 ],
	['1 chord, 6 beats',    'Cm......',		'Cm......',	'Cm', 6, 6, 4 ],
	['1 chord, 7 beats',    'Cm.......',	'Cm.......','Cm', 7, 7, 4 ],
	['2 chord, 3 beats',    'Cm. D..',		'D..',		'D',  2, 3, 4 ],
	['2 chord, 5 beats',    'Cm... D..',	'D..',		'D',  2, 5, 4 ],
	['2 chord, 6 beats',    'Cm... D...',	'D...',		'D',  3, 6, 4 ],
	['2 chord, 7 beats',    'Cm... D',		'D',		'D',  4, 7, 4 ],
	['3 chord, 3 beats',    'C. D. E.',		'E.',		'E',  1, 3, 4 ],
	['3 chord, 5 beats',    'C. D.. E..',	'E..',		'E',  2, 5, 4 ],
])('%s: %s',
	(title, input, string, symbol, duration, beatCount, beatsPerBar) => {
		const throwingFunction = () => { songRendererFactory(input); };

		test('Throw IncorrectBeatCountException', () => {
			expect(throwingFunction).toThrow(IncorrectBeatCountException);
		});

		test('Add correct properties to exception', () => {
			try {
				throwingFunction();
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
