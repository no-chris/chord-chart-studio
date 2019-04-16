import { connect } from 'react-redux';

import { getOptionValue } from '../../../db/options/selectors';

import PrintPreview from '../_components/PrintPreview';

export default connect(
	state => ({
		accidentalsType: getOptionValue(state, 'rendering', 'preferredAccidentals'),
		alignBars: getOptionValue(state, 'rendering', 'alignBars'),
		harmonizeAccidentals: getOptionValue(state, 'rendering', 'harmonizeAccidentals'),
		transposeValue: getOptionValue(state, 'rendering', 'transposeValue'),
	})
)(PrintPreview);
