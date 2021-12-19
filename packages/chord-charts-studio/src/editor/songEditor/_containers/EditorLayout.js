import { connect } from 'react-redux';

import { getOptionValue } from '../../../db/options/selectors';

import EditorLayout from '../_components/EditorLayout';

export default connect((state) => ({
	theme: getOptionValue(state, 'editorPreferences', 'theme'),
}))(EditorLayout);
