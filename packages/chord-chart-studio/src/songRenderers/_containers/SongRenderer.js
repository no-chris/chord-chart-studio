import { connect } from 'react-redux';

import { getOptionValue } from '../../db/options/selectors';

import SongRenderer from '../_components/SongRenderer';

export default connect((state) => ({
	// songPreferences
	transposeValue: getOptionValue(state, 'songPreferences', 'transposeValue'),
	accidentalsType: getOptionValue(
		state,
		'songPreferences',
		'preferredAccidentals'
	),

	// songFormatting
	chartFormat: getOptionValue(state, 'editorPreferences', 'chartFormat'),
	chartType: getOptionValue(state, 'songFormatting', 'chartType'),
	alignChordsWithLyrics: getOptionValue(
		state,
		'songFormatting',
		'alignChordsWithLyrics'
	),
	alignBars: getOptionValue(state, 'songFormatting', 'alignBars'),
	autoRepeatChords: getOptionValue(
		state,
		'songFormatting',
		'autoRepeatChords'
	),
	expandSectionCopy: getOptionValue(
		state,
		'songFormatting',
		'expandSectionCopy'
	),
}))(SongRenderer);
