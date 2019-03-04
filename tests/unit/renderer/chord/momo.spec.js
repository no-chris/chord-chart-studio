import momoChordRenderer from '../../../../src/renderer/chord/momo';
import isRenderer from '../../../../src/renderer/isRenderer';

describe('momoChordRenderer', () => {
	test('Module', () => {
		expect(momoChordRenderer).toBeInstanceOf(Object);
	});

	test('isRenderer', () => {
		expect(isRenderer(momoChordRenderer)).toEqual(true);
	});
});

describe.each([

	['A', 		'A'],
	['AM7',		'Amaj7'],

])('Render chord %s as %s', (input, output) => {
	test('expected rendering', () => {
		expect(momoChordRenderer.render(input)).toEqual(output);
	});
});
