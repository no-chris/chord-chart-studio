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
		highlightChords: getOptionValue(state, 'rendering', 'highlightChords'),
		autoRepeatChords: getOptionValue(state, 'rendering', 'autoRepeatChords'),
		expandSectionRepeats: getOptionValue(state, 'rendering', 'expandSectionRepeats'),
		useShortNamings: getOptionValue(state, 'rendering', 'useShortNamings'),
		simplifyChords: getOptionValue(state, 'rendering', 'simplifyChords'),
	})
)(PrintPreview);
