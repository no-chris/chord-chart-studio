import { connect } from 'react-redux';

import { getOptionValue } from '../../../db/options/selectors';

import PlayRenderer from '../_components/PlayRenderer';

export default connect((state) => ({
	chordsColor: getOptionValue(state, 'rendering', 'chordsColor'),
	highlightChords: getOptionValue(state, 'rendering', 'highlightChords'),
	fontSize: getOptionValue(state, 'rendering', 'fontSize'),
	columnsCount: getOptionValue(state, 'rendering', 'columnsCount'),
}))(PlayRenderer);
