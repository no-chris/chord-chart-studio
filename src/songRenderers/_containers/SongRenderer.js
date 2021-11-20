import { connect } from 'react-redux';

import { getOptionValue } from '../../db/options/selectors';

import SongRenderer from '../_components/SongRenderer';

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
	transposeValue: getOptionValue(state, 'songPreferences', 'transposeValue'),
	useShortNamings: getOptionValue(
		state,
		'songPreferences',
		'useShortNamings'
	),
	simplifyChords: getOptionValue(state, 'songPreferences', 'simplifyChords'),

	// songFormatting
	alignBars: getOptionValue(state, 'songFormatting', 'alignBars'),
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
}))(SongRenderer);
