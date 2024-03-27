import { connect } from 'react-redux';

import { getSelectedId } from '../../fileManager/_state/selectors';
import { getEditorMode } from '../../ui/layout/app/reducers';

import { getOne } from '../../db/files/selectors';
import { updateFile } from '../../db/files/actions';

import Editor from '../_components/Editor';

export default connect(
	(state) => ({
		selectedFile: getOne(state, getSelectedId(state)) || {},
		editorMode: getEditorMode(state),
	}),

	{
		updateFile,
	}
)(Editor);
