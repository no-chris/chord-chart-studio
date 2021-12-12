import './FileManager.scss';

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import exportSelectedFileAsText from '../exportSelectedFileAsText';

import DeleteConfirmModal from './DeleteConfirmModal';
import Icon from '../../ui/_components/Icon';
import FileActions from './FileActions';
import FileEntry from './FileEntry';

function FileManager(props) {
	const [isDeleting, setIsDeleting] = useState(false);

	const {
		allTitles,
		selected,
		renamed,
		defaultTitle,

		createFile,
		deleteFile,
		enableRename,
		startImport,
		selectFile,
		updateFile,
		setEditorMode,
	} = props;

	return (
		<div className={'fileManager'}>
			<DeleteConfirmModal
				deleteFile={deleteFile}
				isDeleting={isDeleting}
				selected={selected}
				setIsDeleting={setIsDeleting}
			/>
			<div className={'fileManager-isCollapsed'}>
				<span className={'fileManager-icon'}>
					<Icon iconName={'file_copy'} />
				</span>
			</div>

			<div className={'fileManager-isExpanded'}>
				<FileActions
					selected={selected}
					createFile={() => createFile(defaultTitle)}
					deleteFile={() => setIsDeleting(true)}
					enableRename={() => enableRename(selected)}
					startImport={() => startImport()}
					exportAsText={() => {
						setEditorMode('export');
						setTimeout(() => exportSelectedFileAsText(), 0);
					}}
					printFile={() => {
						setEditorMode('print');
						setTimeout(() => window.print(), 0);
					}}
				/>
				<ul className={'fileManager-entriesList'}>
					{allTitles.map((file) => (
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
					))}
				</ul>
			</div>
		</div>
	);
}

FileManager.propTypes = {
	allTitles: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
		})
	).isRequired,
	selected: PropTypes.string.isRequired,
	renamed: PropTypes.string.isRequired,
	defaultTitle: PropTypes.string.isRequired,

	selectFile: PropTypes.func.isRequired,
	createFile: PropTypes.func.isRequired,
	deleteFile: PropTypes.func.isRequired,
	enableRename: PropTypes.func.isRequired,
	startImport: PropTypes.func.isRequired,
	updateFile: PropTypes.func.isRequired,
	setEditorMode: PropTypes.func.isRequired,
};

export default FileManager;
