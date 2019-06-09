import { connect } from 'react-redux';

import { getOptionValue } from '../../db/options/selectors';

import SongRenderer from '../_components/SongRenderer';

export default connect(
	state => ({
		accidentalsType: getOptionValue(state, 'rendering', 'preferredAccidentals'),
		alignBars: getOptionValue(state, 'rendering', 'alignBars'),
		harmonizeAccidentals: getOptionValue(state, 'rendering', 'harmonizeAccidentals'),
		transposeValue: getOptionValue(state, 'rendering', 'transposeValue'),
		autoRepeatChords: getOptionValue(state, 'rendering', 'autoRepeatChords'),
		expandSectionRepeats: getOptionValue(state, 'rendering', 'expandSectionRepeats'),
		useShortNamings: getOptionValue(state, 'rendering', 'useShortNamings'),
		simplifyChords: getOptionValue(state, 'rendering', 'simplifyChords'),
	})
)(SongRenderer);
