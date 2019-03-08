import chordSymbolRenderer from '../../../../src/renderer/chord/chordSymbol';
import isRenderer from '../../../../src/renderer/isRenderer';
import stripTags from '../../../../src/core/dom/stripTags';

describe('chordSymbol renderer', () => {
	test('Module', () => {
		expect(chordSymbolRenderer).toBeInstanceOf(Object);
	});

	test('isRenderer', () => {
		expect(isRenderer(chordSymbolRenderer)).toEqual(true);
	});
});

describe.each([

	['A', 		'A'],
	['AM7',		'Amaj7'],

])('Render chord %s as %s', (input, output) => {
	test('expected rendering', () => {
		const rendered = chordSymbolRenderer.render(input);
		expect(stripTags(rendered)).toEqual(output);
	});
});
