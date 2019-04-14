import { connect } from 'react-redux';

import { getOptionValue } from '../../db/options/selectors';

import SongRenderer from '../_components/SongRenderer';

export default connect(
	state => ({
		accidentalsType: getOptionValue(state, 'rendering', 'preferredAccidentals'),
		alignBars: getOptionValue(state, 'rendering', 'alignBars'),
		harmonizeAccidentals: getOptionValue(state, 'rendering', 'harmonizeAccidentals'),
		transposeValue: getOptionValue(state, 'rendering', 'transposeValue'),
	})
)(SongRenderer);
