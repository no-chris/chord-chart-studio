import { connect } from 'react-redux';

import { getOptionValue } from '../../../db/options/selectors';

import EditorPreview from '../_components/EditorPreview';

export default connect((state) => ({
	theme: getOptionValue(state, 'editorPreferences', 'theme'),
}))(EditorPreview);
