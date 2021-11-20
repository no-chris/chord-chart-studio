import { connect } from 'react-redux';

import { getOptionValue } from '../../../db/options/selectors';

import PrintPreview from '../_components/PrintPreview';

export default connect((state) => ({
	// songPreferences
	chordsAndLyricsDisplay: getOptionValue(
		state,
		'songPreferences',
		'chordsAndLyricsDisplay'
	),
	alignChordsWithLyrics: getOptionValue(
		state,
		'songPreferences',
		'alignChordsWithLyrics'
	),
	harmonizeAccidentals: getOptionValue(
		state,
		'songPreferences',
		'harmonizeAccidentals'
	),
	accidentalsType: getOptionValue(
		state,
		'songPreferences',
		'preferredAccidentals'
	),
	useShortNamings: getOptionValue(
		state,
		'songPreferences',
		'useShortNamings'
	),
	simplifyChords: getOptionValue(state, 'songPreferences', 'simplifyChords'),
	transposeValue: getOptionValue(state, 'songPreferences', 'transposeValue'),

	// songFormatting
	columnsCount: getOptionValue(state, 'songFormatting', 'columnsCount'),
	columnBreakOnParagraph: getOptionValue(
		state,
		'songFormatting',
		'columnBreakOnParagraph'
	),
	documentSize: getOptionValue(state, 'songFormatting', 'documentSize'),
	documentMargins: getOptionValue(state, 'songFormatting', 'documentMargins'),
	alignBars: getOptionValue(state, 'songFormatting', 'alignBars'),
	printFontSize: getOptionValue(state, 'songFormatting', 'printFontSize'),
	highlightChords: getOptionValue(state, 'songFormatting', 'highlightChords'),
	autoRepeatChords: getOptionValue(
		state,
		'songFormatting',
		'autoRepeatChords'
	),
	expandSectionMultiply: getOptionValue(
		state,
		'songFormatting',
		'expandSectionMultiply'
	),
}))(PrintPreview);
