import { connect } from 'react-redux';

import { selectFile, createFile, deleteFile, renameFile, enableRename, loadAllFromStorage } from '../actions';
import { getAllFilesTitles, getDefaultTitle, getSelectedFileKey, getRenamedFileKey } from '../selectors';

import FileManager from '../components/FileManager';

export default connect(
	state => ({
		allFiles: getAllFilesTitles(state),
		selected: getSelectedFileKey(state),
		renamed: getRenamedFileKey(state),
		defaultTitle: getDefaultTitle(state),
	}),

	{
		selectFile,
		createFile,
		deleteFile,
		renameFile,
		enableRename,
		loadAllFromStorage,
	}

)(FileManager);
