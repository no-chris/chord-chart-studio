export default {
	// editorPreferences are identical for all songs
	editorPreferences: {
		values: {
			theme: 'dark1',
		},
		defaults: {
			theme: 'dark1',
		},
		//userDefaults: {},
	},
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

			fontSize: 0,
			columnsCount: 1,
			columnBreakOnParagraph: true,
			documentMargins: 3,
		},
		defaults: {
			chartFormat: 'chordmark',
			chartType: 'all',
			alignChordsWithLyrics: true,
			alignBars: true,
			autoRepeatChords: true,
			expandSectionCopy: true,

			fontSize: 0,
			columnsCount: 1,
			columnBreakOnParagraph: true,
			documentMargins: 3,
		},
		//userDefaults: {},
	},
};
