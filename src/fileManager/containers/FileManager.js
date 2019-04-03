import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { selectFile, createFile, deleteFile, renameFile, enableRename, loadAllFromStorage } from '../actions';
import { getAllFilesTitles, getDefaultTitle, getSelectedFileKey, getRenamedFileKey } from '../selectors';

import FileActions from '../components/FileActions';
import FileEntry from '../components/FileEntry';
import Icon from '../../ui/components/Icon';

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

)(function FileManager(props) {
	const {
		allFiles,
		selected,
		renamed,
		defaultTitle,
	} = props;

	useEffect(() => {
		if (!allFiles.length) {
			props.loadAllFromStorage();
		}
	});

	return (
		<div className="fm">
			<div className="sidebar-collapsed">
				<Icon iconName="file_copy" />
			</div>

			<div className="sidebar-expanded">
				<FileActions
					createFile={props.createFile}
					deleteFile={() => props.deleteFile(selected)}
					enableRename={() => props.enableRename(selected)}
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
								selectFile={props.selectFile}
								renameFile={props.renameFile}
								enableRename={props.enableRename}
								key={file.key}
							/>
						)
					}
				</ul>
			</div>
		</div>
	);
});
