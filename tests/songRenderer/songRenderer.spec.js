import songRendererFactory from '../../src/songRenderer/songRenderer.js';

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
