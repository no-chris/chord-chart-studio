import textRenderer from '../../../../src/renderer/bar/text';
import parseChordLine from '../../../../src/parseChordLine';

const chordRenderer = {
	render(chordSymbol) {
		return chordSymbol;
	}
};

describe('textRenderer', () => {
	test('Module', () => {
		expect(textRenderer).toBeInstanceOf(Object);
	});
});

describe.each([

	['1 bar / 1 chord / 4 bpb', 			'C', 			4, 'C  '],
	['1 bar / 2 chords / 4 bpb (1/3)', 		'C. G...', 		4, 'C  G  '],
	['1 bar / 2 chords / 4 bpb (2/2)',  	'C.. G..', 		4, 'C  G  '],
	['1 bar / 2 chords / 4 bpb (3/1)',  	'C... G.', 		4, 'C  G  '],
	['1 bar / 3 chords / 4 bpb (1/1/2)',  	'C. G. F..',	4, 'C  G  F  '],
	['1 bar / 3 chords / 4 bpb (1/2/1)',  	'C. G.. F.',	4, 'C  G  F  '],
	['1 bar / 3 chords / 4 bpb (2/1/1)',  	'C.. G. F.',	4, 'C  G  F  '],
	['1 bar / 4 chords / 4 bpb (1/1/1/1)', 	'C. G. F. Am.',	4, 'C  G  F  Am  '],

])('%s: %s', (title, input, beatsPerBar, output) => {
	test('Renders with default spacing: ' + output, () => {
		const parsed = parseChordLine(input, { beatsPerBar });
		const rendered = textRenderer.render(
			parsed.allBars[0],
			{ chordRenderer }
		);
		expect(rendered).toEqual(output);
	});
});

describe.each([

	['spacesAfter = 0',  	'C. G. F..',	0, 4, 'CGF'],
	['spacesAfter = 1',  	'C. G. F..',	1, 4, 'C G F '],
	['spacesAfter = 2',  	'C. G. F..',	2, 4, 'C  G  F  '],
	['spacesAfter = 3',  	'C. G. F..',	3, 4, 'C   G   F   '],
	['spacesAfter = 4',  	'C. G. F..',	4, 4, 'C    G    F    '],
	['spacesAfter = 5',  	'C. G. F..',	5, 4, 'C     G     F     '],
	['spacesAfter = 6',  	'C. G. F..',	6, 4, 'C      G      F      '],

])('%s: %s', (title, input, spacesAfter, beatsPerBar, output) => {
	test('Respect spacesAfter value: ' + output, () => {
		const parsed = parseChordLine(input, { beatsPerBar });

		parsed.allBars[0].allChords.forEach(chord => {
			chord.spacesAfter = spacesAfter;
		});

		const rendered = textRenderer.render(
			parsed.allBars[0],
			{ chordRenderer }
		);

		expect(rendered).toEqual(output);
	});
});
