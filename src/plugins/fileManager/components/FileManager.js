import React from 'react';
import { connect } from 'react-redux';

import {
	getAllFiles,
	getSelectedFile,
	getRenamedFile,
	getDefaultTitle,
	selectFile,
	createFile,
	deleteFile,
	renameFile,
	enableRename
} from '../state';

import FileActions from './FileActions';
import FileEntry from './FileEntry';
import Icon from '../../../ui/Icon';

export default connect(
	state => ({
		allFiles: getAllFiles(state),
		selected: getSelectedFile(state),
		renamed: getRenamedFile(state),
		defaultTitle: getDefaultTitle(state),
	}),

	dispatch => ({
		_selectFile: selectFile.bind(null, dispatch),
		_createFile: createFile.bind(null, dispatch),
		_deleteFile: deleteFile.bind(null, dispatch),
		_renameFile: renameFile.bind(null, dispatch),
		_enableRename: enableRename.bind(null, dispatch),
	})

)(class FileManager extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			allFiles,
			selected,
			renamed,
			defaultTitle,
			_selectFile,
			_createFile,
			_deleteFile,
			_renameFile,
			_enableRename
		} = this.props;

		return (
			<div className="fm">
				<div className="fm-collapsed">
					<Icon iconName="file_copy" />
				</div>
				<FileActions
					createFile={_createFile}
					deleteFile={() => _deleteFile(selected)}
					enableRename={() => _enableRename(selected)}
				/>
				<ul className="fm-entry-list">
					{
						allFiles.map(file =>
							<FileEntry
								title={file.title}
								defaultTitle={defaultTitle}
								fileKey={file.key}
								isSelected={selected === file.key}
								isRenamed={renamed === file.key}
								selectFile={_selectFile}
								renameFile={_renameFile}
								enableRename={_enableRename}
								key={file.key}
							/>
						)
					}

				</ul>
			</div>
		);
	}
});
