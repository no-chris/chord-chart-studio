import chordLineRenderer from '../../../../src/renderer/chord/chordLine';

import parseChordLine from '../../../../src/parseChordLine';
import isRenderer from '../../../../src/renderer/isRenderer';
import stripTags from '../../../../src/core/dom/stripTags';

describe('chordLine renderer', () => {
	test('Module', () => {
		expect(chordLineRenderer).toBeInstanceOf(Object);
	});

	test('isRenderer', () => {
		expect(isRenderer(chordLineRenderer)).toEqual(true);
	});
});

describe.each([

	['no parameters', undefined],
	['no renderer', { barContentRenderer: undefined }],
	['invalid renderer', { barContentRenderer: { renderFake() {} }}],

])('should throw with %s', (title, input) => {
	test('Throw if not given valid barContentRenderer', () => {
		const parsed = parseChordLine('C');

		const throwingFn = () => chordLineRenderer.render(parsed, input);

		expect(throwingFn).toThrow(TypeError);
		expect(throwingFn).toThrow('barContentRenderer is not a valid renderer');
	});
});

describe.each([

	['A B C', 			'|A|B|C|'],
	['A.. B.. C.. D..',	'|A B|C D|'],

])('Render chordLine "%s" as "%s"', (input, output) => {
	test('expected rendering', () => {
		const barContentRenderer = {
			render: bar => bar.allChords
				.map(chord => chord.symbol)
				.join(' ')
		};
		const chordLine = parseChordLine(input);

		const rendered = chordLineRenderer.render(chordLine, { barContentRenderer });

		expect(stripTags(rendered)).toEqual(output);
	});
});