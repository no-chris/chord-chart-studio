import React, { useEffect } from 'react';

import Icon from '../../ui/components/Icon';
import FileActions from './FileActions';
import FileEntry from './FileEntry';

export default function FileManager(props) {
	const {
		allFiles,
		selected,
		renamed,
		defaultTitle,

		loadAllFromStorage,
		selectFile,
		createFile,
		deleteFile,
		enableRename,
		renameFile,

	} = props;

	useEffect(() => {
		if (!allFiles.length) {
			loadAllFromStorage();
		}
	});

	return (
		<div className="fm">
			<div className="sidebar-collapsed">
				<Icon iconName="file_copy" />
			</div>

			<div className="sidebar-expanded">
				<FileActions
					createFile={createFile}
					deleteFile={() => deleteFile(selected)}
					enableRename={() => enableRename(selected)}
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
								selectFile={selectFile}
								renameFile={renameFile}
								enableRename={enableRename}
								key={file.key}
							/>
						)
					}
				</ul>
			</div>
		</div>
	);
}
