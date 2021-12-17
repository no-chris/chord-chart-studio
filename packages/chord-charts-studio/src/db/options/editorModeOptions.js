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
		'columnBreakOnParagraph',
		'documentMargins',

		'fontSize',
	],
	export: [
		'transposeValue',
		'harmonizeAccidentals',
		'preferredAccidentals',

		'chartFormat',
		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',
		'expandSectionCopy',
	],
};

export default editorModeOptions;
