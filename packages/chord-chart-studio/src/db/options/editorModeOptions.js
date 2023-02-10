const editorModeOptions = {
	edit: ['theme', 'transposeValue', 'preferredAccidentals'],
	play: [
		'theme',

		'transposeValue',
		'preferredAccidentals',

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

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
		'expandSectionCopy',
	],
};

export default editorModeOptions;
