import { connect } from 'react-redux';

import { getOptionValue } from '../../../db/options/selectors';

import PrintPreview from '../_components/EditorPreview';

export default connect(
	state => ({
		chordsColor: getOptionValue(state, 'rendering', 'chordsColor'),
		highlightChords: getOptionValue(state, 'rendering', 'highlightChords'),
	})
)(PrintPreview);
