import { connect } from 'react-redux';

import { getOptionValue } from '../../db/options/selectors';

import SongRenderer from '../_components/SongRenderer';

export default connect((state) => ({
	// songPreferences
	chartType: getOptionValue(state, 'songFormatting', 'chartType'),
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
	transposeValue: getOptionValue(state, 'songPreferences', 'transposeValue'),

	// songFormatting
	alignBars: getOptionValue(state, 'songFormatting', 'alignBars'),
	autoRepeatChords: getOptionValue(
		state,
		'songFormatting',
		'autoRepeatChords'
	),
}))(SongRenderer);
