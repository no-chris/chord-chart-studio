const editorModeOptions = {
	edit: [
		'theme',

		'transposeValue',
		'harmonizeAccidentals',
		'preferredAccidentals',
	],
	play: [
		'theme',

		'transposeValue',
		'harmonizeAccidentals',
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
		'harmonizeAccidentals',
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
		'harmonizeAccidentals',
		'preferredAccidentals',

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
		'expandSectionCopy',
	],
};

export default editorModeOptions;
