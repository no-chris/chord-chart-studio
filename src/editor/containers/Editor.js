import { connect } from 'react-redux';

import { getSelectedFile } from '../../fileManager/selectors';
import { updateFileContent } from '../../fileManager/actions';

import EditorLayout from '../components/EditorLayout';

export default connect(
	state => ({
		selectedFile: getSelectedFile(state)
	}),

	{
		updateFileContent
	}

)(EditorLayout);
