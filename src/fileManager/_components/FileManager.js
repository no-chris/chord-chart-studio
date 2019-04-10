import './FileManager.scss';

import React from 'react';

import Icon from '../../ui/_components/Icon';
import FileActions from './FileActions';
import FileEntry from './FileEntry';

export default function FileManager(props) {
	const {
		allTitles,
		selected,
		renamed,
		defaultTitle,

		selectFile,
		createFile,
		deleteFile,
		enableRename,
		updateFile,

	} = props;

	return (
		<div className="fileManager">
			<div className="fileManager-isCollapsed">
				<Icon iconName="file_copy" />
			</div>

			<div className="fileManager-isExpanded">
				<FileActions
					createFile={() => createFile(defaultTitle)}
					deleteFile={() => deleteFile(selected)}
					enableRename={() => enableRename(selected)}
				/>
				<ul className="fileManager-entriesList">
					{
						allTitles.map(file =>
							<FileEntry
								title={file.title}
								defaultTitle={defaultTitle}
								fileId={file.id}
								isSelected={selected === file.id}
								isRenamed={renamed === file.id}
								selectFile={selectFile}
								updateFile={updateFile}
								enableRename={enableRename}
								key={file.id}
							/>
						)
					}
				</ul>
			</div>
		</div>
	);
}
