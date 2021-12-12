export default {
	// songPreferences are identical for all song rendering modes
	// therefore, they are only saved once for each song
	songPreferences: {
		values: {
			transposeValue: 0,
			harmonizeAccidentals: true,
			preferredAccidentals: 'auto',
		},
		defaults: {
			transposeValue: 0,
			harmonizeAccidentals: true,
			preferredAccidentals: 'auto',
		},
		//userDefaults: {},
	},
	// songFormatting options are specific to a given mode (print, export...)
	// they are saved separately for each song
	songFormatting: {
		values: {
			chartFormat: 'chordmark',
			chartType: 'all',
			alignChordsWithLyrics: true,
			alignBars: true,
			autoRepeatChords: true,
			expandSectionCopy: true,

			columnsCount: 1,
			columnBreakOnParagraph: true,
			documentMargins: 3,

			fontSize: 0,
			chordsColor: 'yellow',
			highlightChords: false,
		},
		defaults: {
			chartFormat: 'chordmark',
			chartType: 'all',
			alignChordsWithLyrics: true,
			alignBars: true,
			autoRepeatChords: true,
			expandSectionCopy: true,

			columnsCount: 1,
			columnBreakOnParagraph: true,
			documentMargins: 3,

			fontSize: 0,
			chordsColor: 'yellow',
			highlightChords: false,
		},
		//userDefaults: {},
	},
};
