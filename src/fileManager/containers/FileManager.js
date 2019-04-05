import { connect } from 'react-redux';

import { selectFile, enableRename } from '../actions';
import { getDefaultTitle, getSelectedId, getRenamedId } from '../selectors';

import { createFile, updateFile, deleteFile } from '../../db/files/actions';
import { getAllTitles } from '../../db/files/selectors';

import FileManager from '../components/FileManager';

export default connect(
	state => ({
		selected: getSelectedId(state),
		renamed: getRenamedId(state),
		defaultTitle: getDefaultTitle(state),
		allTitles: getAllTitles(state),
	}),

	{
		selectFile,
		createFile,
		deleteFile,
		updateFile,
		enableRename,
	}

)(FileManager);
