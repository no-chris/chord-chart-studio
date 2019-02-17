import chordsLine from '../../src/songRenderer/chordsLine.js';

describe('chordsLine renderer', () => {
	test('Module', () => {
		expect(chordsLine).toBeInstanceOf(Object);
	});

	test('API', () => {
		expect(chordsLine.render).toBeInstanceOf(Function);
	});

});

/*
describe.each([
	['Bar with 1 chord', '| Cm |', [{ name: 'Cm', duration: 4 }] ]
])('Renders %s',
	(title, input, output) => {
		test('Renders correctly', () => {
			const rendering = chordsLine.render({
				chords: input
			});
			expect(rendering).toBe(output);
		});
	});
*/