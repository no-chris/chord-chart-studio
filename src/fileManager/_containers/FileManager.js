import { connect } from 'react-redux';

import { selectFile, enableRename } from '../_state/actions';
import { getDefaultTitle, getSelectedId, getRenamedId } from '../_state/selectors';

import { createFile, updateFile, deleteFile } from '../../db/files/actions';
import { openModal } from '../../ui/layout/app/_state/actions';

import { getAllTitles } from '../../db/files/selectors';

import FileManager from '../_components/FileManager';

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
		openModal,
	}

)(FileManager);
