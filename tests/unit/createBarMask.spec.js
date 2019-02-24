import createBarMask from '../../src/createBarMask.js';
import parseChordLine from '../../src/parseChordLine.js';

describe('createBarMask', () => {
	test('Module', () => {
		expect(createBarMask).toBeInstanceOf(Function);
	});

});

describe.each([
	['1 bar / 1 chord  / 4 bpb', 			4, 'C', 			'{0}   ' ],
	['1 bar / 2 chords (1/3) / 4 bpb', 		4, 'C. F...', 		'{0} {1}     ' ],
	['1 bar / 2 chords (2/2) / 4 bpb', 		4, 'C.. F..', 		'{0}   {1}   ' ],
	['1 bar / 2 chords (3/1) / 4 bpb', 		4, 'C... F.', 		'{0}     {1} ' ],
	['1 bar / 3 chords (1/1/2) / 4 bpb', 	4, 'C. F. G..', 	'{0} {1}   {2}' ],
	['1 bar / 3 chords (2/1/1) / 4 bpb', 	4, 'C.. F. G.', 	'{0}   {1} {2}' ],
	['1 bar / 4 chords / 4 bpb', 			4, 'C. F. G. Em.',	'{0}  {1}  {2}  {3}' ],

	['1 bar / 1 chord  / 3 bpb', 			3, 'C',				'{0}   ' ],
	['1 bar / 2 chords (1/2) / 3 bpb', 		3, 'C. F..',		'{0}  {1}    ' ],
	['1 bar / 2 chords (2/1) / 3 bpb', 		3, 'C.. F.',		'{0}      {1}' ],
	['1 bar / 3 chords / 3 bpb', 			3, 'C. F. G.',		'{0}  {1}  {2}' ],

	// @todo ['other', 								6, 'C.. F.. G..',	'{0}  {1}  {2}' ],
])('Mask for %s',
	(title, beatsPerBar, input, output) => {
		test('Correct mask is created', () => {
			const options = { beatsPerBar };
			const parsed = parseChordLine(input, options);
			const mask = createBarMask(parsed.allBars[0].allChords);
			expect(mask).toBe(output);
		});
	});
