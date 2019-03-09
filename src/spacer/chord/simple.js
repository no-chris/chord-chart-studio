import _ from 'lodash';

const allMasks = {
	0: {
		'': []
	},

	3: {
		'3': 	[3], 		// 'A   '
		'12':  	[2, 4], 	// 'A  B    '
		'21': 	[6, 0], 	// 'A      C'
		'111': 	[2, 2, 0], 	// 'A  B  C'
	},

	4: {
		'4': 	[3], 		// 'A   ',
		'13': 	[1, 4], 	// 'A B    ',
		'22': 	[3, 2], 	// 'A   B  ',
		'31':   [5, 0], 	// 'A     B',
		'112':  [1, 1, 3], 	// 'A B C   ',
		'121':  [1, 4, 0], 	// 'A B    C',
		'211': 	[4, 1, 0], 	// 'A    B C',
		'1111': [2, 2, 2], 	// 'A  B  C  D',
	},
};

export default function space(chordLineInput) {
	const chordLine = _.cloneDeep(chordLineInput);

	let beatsPerBar = 0;
	let chordPattern = '';
	let chordSpaces = [];

	chordLine.allBars.forEach(bar => {
		beatsPerBar = 0;
		chordPattern = '';

		bar.allChords.forEach(chord => {
			chordPattern += chord.duration.toString();
			beatsPerBar += chord.duration;
		});

		chordSpaces = allMasks[beatsPerBar][chordPattern];

		for (let i = 0; i < chordPattern.length; i++) {
			bar.allChords[i].spacesAfter = chordSpaces[i];
		}
	});

	return chordLine;
}