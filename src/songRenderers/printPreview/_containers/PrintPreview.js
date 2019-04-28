import { connect } from 'react-redux';

import { getOptionValue } from '../../../db/options/selectors';

import PrintPreview from '../_components/PrintPreview';

export default connect(
	state => ({
		columnsCount: getOptionValue(state, 'rendering', 'columnsCount'),
		columnBreakOnParagraph: getOptionValue(state, 'rendering', 'columnBreakOnParagraph'),
		documentSize: getOptionValue(state, 'rendering', 'documentSize'),
		documentMargins: getOptionValue(state, 'rendering', 'documentMargins'),
		accidentalsType: getOptionValue(state, 'rendering', 'preferredAccidentals'),
		alignBars: getOptionValue(state, 'rendering', 'alignBars'),
		harmonizeAccidentals: getOptionValue(state, 'rendering', 'harmonizeAccidentals'),
		transposeValue: getOptionValue(state, 'rendering', 'transposeValue'),
		printFontSize: getOptionValue(state, 'rendering', 'printFontSize'),
	})
)(PrintPreview);
