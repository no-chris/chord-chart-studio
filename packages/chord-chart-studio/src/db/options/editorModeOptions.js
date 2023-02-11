const editorModeOptions = {
	edit: ['theme', 'transposeValue', 'preferredAccidentals', 'symbolType'],
	play: [
		'theme',

		'transposeValue',
		'preferredAccidentals',
		'symbolType',

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
		'expandSectionCopy',

		'columnsCount',

		'fontSize',
	],
	print: [
		'transposeValue',
		'preferredAccidentals',
		'symbolType',

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
		'expandSectionCopy',

		'columnsCount',
		'columnBreakOnSection',
		'documentMargins',

		'fontSize',
	],
	export: [
		'chartFormat',

		'transposeValue',
		'preferredAccidentals',
		'symbolType',

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
		'expandSectionCopy',
	],
};

export default editorModeOptions;
