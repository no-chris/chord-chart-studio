import simpleInterspacer from '../../../../src/interspacer/chord/simple';
import parseChordLine from '../../../../src/parseChordLine';

describe('simpleInterspacer', () => {
	test('Module', () => {
		expect(simpleInterspacer).toBeInstanceOf(Function);
	});
});

describe.each([

	['1 bar / 1 chord  / 3 bpb', 			3, 'C',			[3] ],
	['1 bar / 2 chords (1/2) / 3 bpb', 		3, 'C. F..',		[2, 4] ],
	['1 bar / 2 chords (2/1) / 3 bpb', 		3, 'C.. F.',		[6, 0] ],
	['1 bar / 3 chords / 3 bpb', 			3, 'C. F. G.',		[2, 2, 0] ],

	['1 bar / 1 chord / 4 bpb', 			4, 'C', 			[3] ],
	['1 bar / 2 chords (1/3) / 4 bpb', 		4, 'C. F...', 		[1, 4] ],
	['1 bar / 2 chords (2/2) / 4 bpb', 		4, 'C.. F..', 		[3, 2] ],
	['1 bar / 2 chords (3/1) / 4 bpb', 		4, 'C... F.', 		[5, 0] ],
	['1 bar / 3 chords (1/1/2) / 4 bpb', 	4, 'C. F. G..', 	[1, 3, 0] ],
	['1 bar / 3 chords (2/1/1) / 4 bpb', 	4, 'C.. F. G.', 	[3, 1, 0] ],
	['1 bar / 4 chords / 4 bpb', 			4, 'C. F. G. Em.',	[2, 2, 2] ],

])('%s', (title, beatsPerBar, input, spacesAfter) => {
	test('Correctly compute .spacesAfter', () => {
		const parsed = parseChordLine(input, { beatsPerBar });
		const interspaced = simpleInterspacer(parsed);

		let chordIndex = 0;

		interspaced.allBars.forEach(bar => {
			bar.allChords.forEach(chord => {
				expect(chord).toHaveProperty('spacesAfter');
				expect(chord.spacesAfter).toEqual(spacesAfter[chordIndex]);
				chordIndex++;
			});
		});
	});
});
