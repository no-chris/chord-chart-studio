const editorModeOptions = {
	edit: ['transposeValue', 'harmonizeAccidentals', 'preferredAccidentals'],
	play: [
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
		'expandSectionCopy',

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
		'expandSectionCopy',
	],
};

export default editorModeOptions;
