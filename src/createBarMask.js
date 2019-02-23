const allMasks = {
	0: {
		0: ''
	},

	3: {
		'3': 	'{0}   ',
		'12':  	'{0}  {1}    ',
		'21': 	'{0}      {1}',
		'111': 	'{0}  {1}  {2}',
	},

	4: {
		'4': 	'{0}   ',
		'22': 	'{0}   {1}',
		'112':  '{0} {1}   {2}',
		'211': 	'{0}   {1} {2}',
		'1111': '{0}  {1}  {2}  {3}',
	},
};

export default function createBarMask(bar) {
	let beatsPerBar = 0;
	let chordPattern = '';

	bar.forEach(chord => {
		chordPattern += chord.duration.toString();
		beatsPerBar += chord.duration;
	});

	return allMasks[beatsPerBar][chordPattern];
}