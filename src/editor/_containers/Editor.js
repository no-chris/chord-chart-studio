import { connect } from 'react-redux';

import { getSelectedId } from '../../fileManager/_state/selectors';
import { getOne } from '../../db/files/selectors';
import { updateFile } from '../../db/files/actions';

import EditorLayout from '../_components/EditorLayout';

export default connect(
	state => ({
		selectedFile: getOne(state, getSelectedId(state))
	}),

	{
		updateFile
	}

)(EditorLayout);
