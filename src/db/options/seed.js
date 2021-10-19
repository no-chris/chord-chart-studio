export default {
	rendering: {
		style: {
			value: 'chordmark',
			default: 'chordmark',
			resetOnSongChange: false,
		},
		chordsAndLyricsDisplay: {
			value: 'all',
			default: 'all',
			resetOnSongChange: false,
		},
		alignChordsWithLyrics: {
			value: true,
			default: true,
			resetOnSongChange: false,
		},
		alignBars: {
			value: true,
			default: true,
			resetOnSongChange: false,
		},
		autoRepeatChords: {
			value: true,
			default: true,
			resetOnSongChange: false,
		},
		expandSectionRepeats: {
			value: true,
			default: true,
			resetOnSongChange: false,
		},

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
			value: 'none',
			default: 'none',
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
		useShortNamings: {
			value: true,
			default: true,
			resetOnSongChange: false,
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
	},
};
