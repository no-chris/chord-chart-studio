import { connect } from 'react-redux';

import { getOptionValue } from '../../../db/options/selectors';

import PlayRenderer from '../_components/PlayRenderer';

export default connect((state) => ({
	theme: getOptionValue(state, 'editorPreferences', 'theme'),
	fontSize: getOptionValue(state, 'songFormatting', 'fontSize'),
	columnsCount: getOptionValue(state, 'songFormatting', 'columnsCount'),
}))(PlayRenderer);
