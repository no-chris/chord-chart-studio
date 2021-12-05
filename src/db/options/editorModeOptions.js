const editorModeOptions = {
	edit: [],
	play: [
		'transposeValue',
		'harmonizeAccidentals',
		'preferredAccidentals',

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',

		'columnsCount',

		'fontSize',
		'chordsColor',
		'highlightChords',
	],
	print: [
		'transposeValue',
		'harmonizeAccidentals',
		'preferredAccidentals',

		'chartType',
		'alignChordsWithLyrics',
		'alignBars',
		'autoRepeatChords',

		'columnsCount',
		'columnBreakOnParagraph',
		'documentMargins',

		'fontSize',
		'highlightChords',
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
	],
};

export default editorModeOptions;
