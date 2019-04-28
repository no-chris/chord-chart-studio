export default {
	rendering: {

		/** Layout */

		documentSize: {
			value: 'a4',
			default: 'a4',
			resetOnSongChange: false,
		},
		documentMargins: {
			value: 3,
			default: 3,
			resetOnSongChange: false,
		},
		columnsCount: {
			value: 1,
			default: 1,
			resetOnSongChange: false,
		},
		columnBreakOnParagraph: {
			value: true,
			default: true,
			resetOnSongChange: false,
		},


		/** Display */

		style: {
			value: 'chordmark',
			default: 'chordmark',
			resetOnSongChange: false,
		},
		alignBars: {
			value: true,
			default: true,
			resetOnSongChange: false,
		},
		showChords: {
			value: true,
			default: true,
			resetOnSongChange: false,
		},
		instrument: {
			value: 'guitar',
			default: 'guitar',
			resetOnSongChange: false,
		},
		showStrummingPattern: {
			value: true,
			default: true,
			resetOnSongChange: false,
		},



		/** Customize Chords */

		transposeValue: {
			value: 0,
			default: 0,
			resetOnSongChange: true,
		},
		simplifyChords: {
			value: false,
			default: false,
			resetOnSongChange: true,
		},
		capoPosition: {
			value: 0,
			default: 0,
			resetOnSongChange: true,
		},
		harmonizeAccidentals: {
			value: true,
			default: true,
			resetOnSongChange: true,
		},
		preferredAccidentals: {
			value: 'auto',
			default: 'auto',
			resetOnSongChange: true,
		},



		/** Format */

		fontSize: {
			value: 0,
			default: 0,
			resetOnSongChange: false,
		},
		printFontSize: {
			value: 0,
			default: 0,
			resetOnSongChange: false,
		},
		fontStyle: {
			value: 'roboto',
			default: 'roboto',
			resetOnSongChange: false,
		},
		chordsColor: {
			value: 'yellow',
			default: 'yellow',
			resetOnSongChange: false,
		},
		highlightChords: {
			value: true,
			default: true,
			resetOnSongChange: false,
		},
	}
};
